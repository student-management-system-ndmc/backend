import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentsController } from './parents.controller';
import { ParentsService } from './parents.service';
import { Parent } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([Parent])],
  controllers: [ParentsController],
  providers: [ParentsService],
})
export class ParentsModule {}