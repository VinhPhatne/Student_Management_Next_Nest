import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}


