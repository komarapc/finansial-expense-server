import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

class InputExpenseItemDto {
  @IsNumber()
  amount?: number;

  @IsString()
  description?: string;
}

export class InputExpenseDto {
  @IsString()
  user_id?: string;

  @IsString()
  description?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => InputExpenseItemDto)
  expense_items?: InputExpenseItemDto[];
}

export class UpdateExpenseDto {
  @IsString()
  id?: string;

  @IsString()
  description?: string;
}
