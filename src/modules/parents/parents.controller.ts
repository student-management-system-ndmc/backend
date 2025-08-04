import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { CreateParentDto } from '@dto';

@Controller('api/parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @Post()
  create(@Body() createParentDto: CreateParentDto) {
    return this.parentsService.create(createParentDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.parentsService.findOne(id);
  }

  @Get()
  findAll() {
    return this.parentsService.findAll();
  }
}