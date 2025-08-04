import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { Class } from '../../entities/class.entity';
import { ClassRegistration } from '../../entities/class-registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, ClassRegistration])],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}