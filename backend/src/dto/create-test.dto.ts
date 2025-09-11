import { IsString, IsNotEmpty, MaxLength, IsNumber, IsPositive, IsDateString, Min, Max } from 'class-validator';

export class CreateTestDto {
  @IsNumber()
  @IsPositive()
  student_id: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  score: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  test_name: string;

  @IsDateString()
  test_date: string;
}


