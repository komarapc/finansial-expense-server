import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class InputIncomeDto {
  @IsString()
  @IsNotEmpty()
  user_id?: string;

  @IsNumber()
  @IsNotEmpty()
  amount?: number;

  @IsString()
  @IsNotEmpty()
  description?: string;
}

export class UpdateIncomeDto {
  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  description?: string;
}
