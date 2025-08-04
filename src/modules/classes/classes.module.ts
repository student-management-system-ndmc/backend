import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClassesController } from './classes.controller'
import { ClassesService } from './classes.service'
import { Class, ClassRegistration } from '@entities'

@Module({
  imports: [TypeOrmModule.forFeature([Class, ClassRegistration])],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
