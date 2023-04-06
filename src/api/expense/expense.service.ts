import { ExpenseProps } from './expense.interface';
import { ExpenseRepository } from './expense.repository';
import { Injectable } from '@nestjs/common';
import { ResponseJSON } from './../../utils/response';
import { TokenService } from './../../services/token.service';

@Injectable()
export class ExpenseService {
  constructor(
    private readonly expense: ExpenseRepository,
    private readonly token: TokenService,
  ) {}

  async getExpenseByUserId(page: number) {
    const token: any = this.token.decodeToken(this.token.getToken());
    try {
      const expense = await this.expense.getExpenseByUserId({
        page,
        user_id: token.user_id,
      });
      if (!Boolean(Object.keys(expense).length))
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
          message: 'Expense not found',
        });
      return new ResponseJSON({
        success: true,
        statusCode: 200,
        statusMessage: 'OK',
        data: { expense },
      });
    } catch (error) {
      return new ResponseJSON({
        success: false,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  }

  async getById(id: string) {
    try {
      const expense = await this.expense.getById(id);
      if (!expense)
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
          message: 'Expense not found',
        });
      return new ResponseJSON({
        success: true,
        statusCode: 200,
        statusMessage: 'OK',
        data: { expense },
      });
    } catch (error) {
      return new ResponseJSON({
        success: false,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  }

  async store(data: ExpenseProps) {
    try {
      const token: any = this.token.decodeToken(this.token.getToken());
      const expense = await this.expense.store(data);
      return new ResponseJSON({
        success: true,
        statusCode: 201,
        statusMessage: 'Created',
        data: { expense },
      });
    } catch (error) {
      
      return new ResponseJSON({
        success: false,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  }

  async update(data: ExpenseProps) {
    try {
      const token: any = this.token.decodeToken(this.token.getToken());
      const findExpense = await this.expense.getById(data.id);
      if (!findExpense)
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
          message: 'Expense not found',
        });
      const expense = await this.expense.update(data);
      return new ResponseJSON({
        success: true,
        statusCode: 201,
        statusMessage: 'Created',
        data: { expense },
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
      const token: any = this.token.decodeToken(this.token.getToken());
      const findExpense = await this.expense.getById(id);
      if (!findExpense)
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
          message: 'Expense not found',
        });
      if (findExpense.user_id !== token.user_id)
        return new ResponseJSON({
          success: false,
          statusCode: 401,
          statusMessage: 'Unauthorized',
          message: 'You are not authorized to delete this expense',
        });

      const expense = await this.expense.delete(id);
      return new ResponseJSON({
        success: true,
        statusCode: 201,
        statusMessage: 'Created',
        message: 'Expense deleted',
        data: { expense },
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
