import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class InputExpenseItemDto {
  @IsString()
  @IsNotEmpty()
  expense_id: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateExpenseItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
  description: string;
}
