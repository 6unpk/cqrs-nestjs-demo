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
import { Category } from '../dto/category.dto';
import { CategoryRequest } from '../dto/category.request';
import { CategoryEntity } from '../entity/category.entity';
import { CategoryService } from '../service/category.service';
import { SortType } from '../../common/sort-type.enum';
import { Paganable } from '../../common/paganable';
import { PaganableResponse } from '../../common/pagenable.response';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('categories')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private static entityToDto(entity: CategoryEntity): Category {
    return {
      id: entity.categoryId,
      name: entity.name,
    };
  }

  /**
   *
   */
  @Get()
  async getTemplateList(
    @Query() paganable: Paganable,
  ): Promise<PaganableResponse<Category>> {
    const result = await this.categoryService.listCategory(
      paganable.count ?? 0,
      paganable.page,
      paganable.sort ?? SortType.ASC,
    );

    return new PaganableResponse(
      result.map((e) => CategoryController.entityToDto(e)),
      result.length,
      paganable.page,
      paganable.count,
    );
  }

  /**
   *
   */
  @Get(':categoryId')
  async getTemplate(
    @I18n() i18n: I18nContext,
    @Param('categoryId') id: string,
  ): Promise<Category> {
    return CategoryController.entityToDto(
      await this.categoryService.getCategory(id, i18n),
    );
  }

  /**
   *
   * @param i18n
   * @param id
   * @param request
   */
  @Put(':categoryId')
  async updateCategory(
    @I18n() i18n: I18nContext,
    @Param('categoryId') id: string,
    @Body() request: CategoryRequest,
  ): Promise<Category> {
    return CategoryController.entityToDto(
      await this.categoryService.updateCategory(id, request.name, i18n),
    );
  }

  /**
   *
   * @param request
   */
  @Post()
  async addCategoryList(@Body() request: CategoryRequest): Promise<Category> {
    return CategoryController.entityToDto(
      await this.categoryService.createCategory(request.name),
    );
  }

  @Delete(':categoryId')
  async deleteCategory(
    @I18n() i18n: I18nContext,
    @Param('categoryId') id: string,
  ): Promise<string> {
    await this.categoryService.softDeleteCategory(id, i18n);
    return id;
  }
}
