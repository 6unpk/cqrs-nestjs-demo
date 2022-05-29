import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TemplateEntity } from '../entity/template.entity';
import { TemplateRequest } from '../dto/template.request';
import { TemplateService } from '../service/template.service';
import { Template } from '../dto/template.dto';
import { SortType } from '../../common/sort-type.enum';
import { Paganable } from '../../common/paganable';
import { PaganableResponse } from '../../common/pagenable.response';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('templates')
@ApiTags('Templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  private static entityToDto(entity: TemplateEntity): Template {
    return {
      id: entity.templateId,
      name: entity.name,
      tags:
        entity.categories === undefined
          ? []
          : entity.categories.map((e) => e.categoryId),
    };
  }

  /**
   *
   */
  @Get()
  async getTemplateList(
    @Query() paganable: Paganable,
  ): Promise<PaganableResponse<Template>> {
    const result = await this.templateService.listTemplate(
      paganable.count ?? 0,
      paganable.page,
      paganable.sort ?? SortType.ASC,
    );

    return new PaganableResponse(
      result.map((e) => TemplateController.entityToDto(e)),
      result.length,
      paganable.page,
      paganable.count,
    );
  }

  /**
   *
   */
  @Get(':templateId')
  async getTemplate(
    @I18n() i18n: I18nContext,
    @Param('templateId') id: string,
  ): Promise<Template> {
    return TemplateController.entityToDto(
      await this.templateService.getTemplate(id, i18n),
    );
  }

  /**
   *
   * @param i18n
   * @param id
   * @param request
   */
  @Put(':templateId')
  async updateTemplate(
    @I18n() i18n: I18nContext,
    @Param('templateId') id: string,
    @Body() request: TemplateRequest,
  ): Promise<Template> {
    return TemplateController.entityToDto(
      await this.templateService.updateTemplate(
        id,
        request.name,
        request.categories,
        i18n,
      ),
    );
  }

  /**
   *
   * @param request
   */
  @Post()
  async addTemplateList(@Body() request: TemplateRequest): Promise<Template> {
    return TemplateController.entityToDto(
      await this.templateService.createTemplate(request.name),
    );
  }

  @Delete(':templateId')
  async deleteTemplate(
    @I18n() i18n: I18nContext,
    @Param('templateId') id: string,
  ): Promise<string> {
    await this.templateService.softDeleteTemplate(id, i18n);
    return id;
  }
}
