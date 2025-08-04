import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@entities';
import { CreateStudentDto } from '@dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create({
      ...createStudentDto,
      dob: new Date(createStudentDto.dob),
    });
    return this.studentRepository.save(student);
  }

  async findOne(id: number): Promise<Student> {
    return this.studentRepository.findOne({
      where: { id },
      relations: ['parent', 'classRegistrations', 'subscriptions'],
    });
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find({
      relations: ['parent', 'classRegistrations', 'subscriptions'],
    });
  }
}