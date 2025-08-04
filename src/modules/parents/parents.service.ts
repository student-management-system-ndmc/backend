import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parent } from '../../entities/parent.entity';
import { CreateParentDto } from '../../dto/create-parent.dto';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,
  ) {}

  async create(createParentDto: CreateParentDto): Promise<Parent> {
    const parent = this.parentRepository.create(createParentDto);
    return this.parentRepository.save(parent);
  }

  async findOne(id: number): Promise<Parent> {
    return this.parentRepository.findOne({
      where: { id },
      relations: ['students'],
    });
  }

  async findAll(): Promise<Parent[]> {
    return this.parentRepository.find({
      relations: ['students'],
    });
  }
}