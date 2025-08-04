import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ClassRegistration } from './class-registration.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  subject: string;

  @Column()
  day_of_week: string; // Monday, Tuesday, etc.

  @Column()
  time_slot: string; // e.g., "08:00-09:30"

  @Column()
  teacher_name: string;

  @Column()
  max_students: number;

  @OneToMany(() => ClassRegistration, (registration) => registration.class)
  registrations: ClassRegistration[];
}