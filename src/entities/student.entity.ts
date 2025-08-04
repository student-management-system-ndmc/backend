import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Parent } from './parent.entity';
import { ClassRegistration } from './class-registration.entity';
import { Subscription } from './subscription.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column()
  gender: string;

  @Column()
  current_grade: string;

  @Column()
  parent_id: number;

  @ManyToOne(() => Parent, (parent) => parent.students)
  @JoinColumn({ name: 'parent_id' })
  parent: Parent;

  @OneToMany(() => ClassRegistration, (registration) => registration.student)
  classRegistrations: ClassRegistration[];

  @OneToMany(() => Subscription, (subscription) => subscription.student)
  subscriptions: Subscription[];
}