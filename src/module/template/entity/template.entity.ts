import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CategoryEntity } from '../../category/entity/category.entity';

@Entity()
export class TemplateEntity {
  @PrimaryColumn()
  templateId: string;

  @Column()
  name: string;

  @OneToMany(() => CategoryEntity, (category) => category.templates)
  categories: CategoryEntity[];

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  modifiedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
