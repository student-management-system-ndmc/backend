import { IsNumber } from 'class-validator';

export class RegisterClassDto {
  @IsNumber()
  student_id: number;
}