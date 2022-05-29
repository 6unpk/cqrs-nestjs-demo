import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from './entity/template.entity';
import { TemplateController } from './controller/template.controller';
import { TemplateService } from './service/template.service';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateEntity])],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
