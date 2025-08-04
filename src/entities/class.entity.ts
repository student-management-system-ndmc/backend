import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { ClassRegistration } from './class-registration.entity'

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  subject: string

  @Column()
  day_of_week: string

  @Column()
  time_slot: string

  @Column()
  teacher_name: string

  @Column()
  max_students: number

  @OneToMany(() => ClassRegistration, (registration) => registration.class)
  registrations: ClassRegistration[]
}
