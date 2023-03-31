import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class InputUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  last_name: string;
}
