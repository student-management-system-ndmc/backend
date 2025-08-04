import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  dob: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  current_grade: string;

  @IsNumber()
  parent_id: number;
}