import { ExpenseItemProps } from './expense-item.interface';
import { ExpenseItemRepository } from './expense-item.repository';
import { Injectable } from '@nestjs/common';
import { ResponseJSON } from './../../utils/response';

@Injectable()
export class ExpenseItemService {
  constructor(private readonly expenseItem: ExpenseItemRepository) {}

  async getById(id: string) {
    try {
      const expenseItem = await this.expenseItem.getById(id);
      if (!expenseItem)
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
        });
      return new ResponseJSON({
        success: true,
        statusCode: 200,
        statusMessage: 'OK',
        data: { expense_item: expenseItem },
      });
    } catch (error) {
      return new ResponseJSON({
        success: false,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  }

  async getByExpenseId(id: string) {
    try {
      const expenseItems = await this.expenseItem.getExpenseItemByExpenseId(id);
      if (!Boolean(Object.keys(expenseItems).length))
        return new ResponseJSON({
          statusCode: 200,
          statusMessage: 'No Content',
          success: true,
        });

      return new ResponseJSON({
        success: true,
        statusCode: 200,
        statusMessage: 'OK',
        data: { expense_items: expenseItems },
      });
    } catch (error) {
      return new ResponseJSON({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        success: false,
      });
    }
  }

  async store(data: ExpenseItemProps) {
    try {
      const expenseItem = await this.expenseItem.store(data);
      return new ResponseJSON({
        success: true,
        statusCode: 201,
        statusMessage: 'Created',
        message: 'Expense Item Created',
        data: { expense_item: expenseItem },
      });
    } catch (error) {
      return new ResponseJSON({
        success: false,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  }

  async update(data: ExpenseItemProps) {
    try {
      const expenseItem = await this.expenseItem.getById(data.id);
      if (!expenseItem)
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
        });
      const update = await this.expenseItem.update(data);
      return new ResponseJSON({
        success: true,
        statusCode: 201,
        statusMessage: 'Created',
        message: 'Expense Item Updated',
        data: { expense_item: update },
      });
    } catch (error) {
      return new ResponseJSON({
        success: false,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  }

  async delete(id: string) {
    try {
      const expenseItem = await this.expenseItem.getById(id);
      if (!expenseItem)
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
        });
      const deleteExpenseItem = await this.expenseItem.delete(id);
      return new ResponseJSON({
        success: true,
        statusCode: 201,
        statusMessage: 'Created',
        message: 'Expense Item Deleted',
        data: { expense_item: deleteExpenseItem },
      });
    } catch (error) {
      return new ResponseJSON({
        success: false,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  }
}
