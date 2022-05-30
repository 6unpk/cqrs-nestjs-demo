import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpError } from '../../common/http-error';
import { Repository } from 'typeorm';
import { TemplateEntity } from '../entity/template.entity';
import { SortType } from '../../common/sort-type.enum';
import { v4 as uuidv4 } from 'uuid';
import { I18nContext } from 'nestjs-i18n';
import { CategoryEntity } from '../../category/entity/category.entity';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
  ) {}

  async getTemplate(
    templateId: string,
    i18n: I18nContext,
  ): Promise<TemplateEntity> {
    const findOne = await this.templateRepository.findOne({
      relations: ['categories'],
      where: {
        templateId,
      },
    });

    if (findOne === undefined) {
      throw new HttpError(404, i18n.t('events.NOT_FOUND_TEMPLATE'));
    }

    return findOne;
  }

  /**
   * @param offset
   * @param limit
   * @param sort
   */
  async listTemplate(
    offset?: number,
    limit?: number,
    sort: SortType = SortType.ASC,
  ): Promise<TemplateEntity[]> {
    const result: [TemplateEntity[], number] =
      await this.templateRepository.findAndCount({
        relations: ['categories'],
        order: {
          createdAt: sort == SortType.ASC ? 'ASC' : 'DESC',
        },
        skip: offset,
        take: limit,
      });

    return result[0];
  }

  async createTemplate(
    name: string,
    categories: string[],
  ): Promise<TemplateEntity> {
    return this.templateRepository.save({
      templateId: uuidv4(),
      name,
      categories: categories.map((e) => {
        const entity = new CategoryEntity();
        entity.categoryId = e;
        return entity;
      }),
      createdAt: new Date(),
    });
  }

  async updateTemplate(
    templateId: string,
    name: string,
    categories: string[],
    i18n: I18nContext,
  ): Promise<TemplateEntity> {
    await this.getTemplate(templateId, i18n);

    return this.templateRepository.save({
      templateId,
      name,
      categories: categories.map((e) => {
        const entity = new CategoryEntity();
        entity.categoryId = e;
        return entity;
      }),
      modifiedAt: new Date(),
    });
  }

  async softDeleteTemplate(
    templateId: string,
    i18n: I18nContext,
  ): Promise<string> {
    const findOne = await this.getTemplate(templateId, i18n);
    await this.templateRepository.softRemove(findOne);
    return findOne.templateId;
  }
}
