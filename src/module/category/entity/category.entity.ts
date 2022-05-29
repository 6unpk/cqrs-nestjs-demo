import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { TemplateEntity } from '../../template/entity/template.entity';

@Entity()
export class CategoryEntity {
  @PrimaryColumn()
  categoryId: string;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => TemplateEntity, (template) => template.categories)
  templates: TemplateEntity;

  @Column({ nullable: true })
  modifiedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
