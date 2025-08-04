import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNumber()
  student_id: number;

  @IsString()
  @IsNotEmpty()
  package_name: string;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsNumber()
  total_sessions: number;
}