import { IsString, IsNotEmpty, MaxLength, IsNumber, IsPositive } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  student_code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNumber()
  @IsPositive()
  class_id: number;
}


