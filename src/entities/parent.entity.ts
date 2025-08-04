import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Student } from './student.entity';

@Entity('parents')
export class Parent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToMany(() => Student, (student) => student.parent)
  students: Student[];
}