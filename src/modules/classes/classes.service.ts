import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../../entities/class.entity';
import { ClassRegistration } from '../../entities/class-registration.entity';
import { CreateClassDto } from '../../dto/create-class.dto';
import { RegisterClassDto } from '../../dto/register-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(ClassRegistration)
    private registrationRepository: Repository<ClassRegistration>,
  ) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const classEntity = this.classRepository.create(createClassDto);
    return this.classRepository.save(classEntity);
  }

  async findByDay(day: string): Promise<Class[]> {
    return this.classRepository.find({
      where: { day_of_week: day },
      relations: ['registrations', 'registrations.student'],
    });
  }

  async findOne(id: number): Promise<Class> {
    return this.classRepository.findOne({
      where: { id },
      relations: ['registrations', 'registrations.student'],
    });
  }

  async findAll(): Promise<Class[]> {
    return this.classRepository.find({
      relations: ['registrations', 'registrations.student'],
    });
  }

  async registerStudent(classId: number, registerDto: RegisterClassDto): Promise<ClassRegistration> {
    const classEntity = await this.findOne(classId);
    if (!classEntity) {
      throw new BadRequestException('Class not found');
    }

    // Check if class is full
    if (classEntity.registrations.length >= classEntity.max_students) {
      throw new BadRequestException('Class is full');
    }

    // Check if student is already registered for this class
    const existingRegistration = classEntity.registrations.find(
      reg => reg.student_id === registerDto.student_id
    );
    if (existingRegistration) {
      throw new BadRequestException('Student is already registered for this class');
    }

    // Check for time conflicts - student can't be in two classes at the same time
    const studentRegistrations = await this.registrationRepository.find({
      where: { student_id: registerDto.student_id },
      relations: ['class'],
    });

    const conflictingClass = studentRegistrations.find(
      reg => reg.class.day_of_week === classEntity.day_of_week && 
             reg.class.time_slot === classEntity.time_slot
    );

    if (conflictingClass) {
      throw new BadRequestException(
        `Student already has a class at ${classEntity.time_slot} on ${classEntity.day_of_week}`
      );
    }

    const registration = this.registrationRepository.create({
      class_id: classId,
      student_id: registerDto.student_id,
    });

    return this.registrationRepository.save(registration);
  }
}