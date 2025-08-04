import { Controller, Get, Post, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from '../../dto/create-class.dto';
import { RegisterClassDto } from '../../dto/register-class.dto';

@Controller('api/classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  findAll(@Query('day') day?: string) {
    if (day) {
      return this.classesService.findByDay(day);
    }
    return this.classesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.findOne(id);
  }

  @Post(':id/register')
  registerStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() registerDto: RegisterClassDto,
  ) {
    return this.classesService.registerStudent(id, registerDto);
  }
}