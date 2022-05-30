import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpError } from '../../common/http-error';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entity/category.entity';
import { SortType } from '../../common/sort-type.enum';
import { v4 as uuidv4 } from 'uuid';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getCategory(
    categoryId: string,
    i18n: I18nContext,
  ): Promise<CategoryEntity> {
    const findOne = await this.categoryRepository.findOne({
      categoryId,
    });

    if (findOne === undefined) {
      throw new HttpError(404, i18n.t('events.NOT_FOUND_CATEGORY'));
    }

    return findOne;
  }

  /**
   * @param offset
   * @param limit
   * @param sort
   */
  async listCategory(
    offset?: number,
    limit?: number,
    sort: SortType = SortType.ASC,
  ): Promise<CategoryEntity[]> {
    const result: [CategoryEntity[], number] =
      await this.categoryRepository.findAndCount({
        order: {
          createdAt: sort == SortType.ASC ? 'ASC' : 'DESC',
        },
        skip: offset,
        take: limit,
      });

    return result[0];
  }

  async createCategory(name: string): Promise<CategoryEntity> {
    return this.categoryRepository.save({
      categoryId: uuidv4(),
      name,
      createdAt: new Date(),
      modifiedAt: null,
    });
  }

  async updateCategory(
    categoryId: string,
    name: string,
    i18n: I18nContext,
  ): Promise<CategoryEntity> {
    await this.getCategory(categoryId, i18n);

    return this.categoryRepository.save({
      categoryId,
      name,
      modifiedAt: new Date(),
    });
  }

  async softDeleteCategory(
    categoryId: string,
    i18n: I18nContext,
  ): Promise<string> {
    const findOne = await this.getCategory(categoryId, i18n);
    await this.categoryRepository.softRemove(findOne);
    return findOne.categoryId;
  }
}
