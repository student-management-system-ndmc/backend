import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Class } from './class.entity';
import { Student } from './student.entity';

@Entity('class_registrations')
export class ClassRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  class_id: number;

  @Column()
  student_id: number;

  @ManyToOne(() => Class, (classEntity) => classEntity.registrations)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @ManyToOne(() => Student, (student) => student.classRegistrations)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}