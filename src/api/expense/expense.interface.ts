import { ExpenseItemProps } from '../expense-item/expense-item.interface';

export interface ExpenseProps {
  id?: string;
  user_id?: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  expense_items?: ExpenseItemProps[];
}
