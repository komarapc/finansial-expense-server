import { IncomeProps } from './income.interface';
import { IncomeRepository } from './income.repository';
import { Injectable } from '@nestjs/common';
import { ResponseJSON } from './../../utils/response';
import { TokenService } from './../../services/token.service';

@Injectable()
export class IncomeService {
  constructor(
    private readonly income: IncomeRepository,
    private readonly token: TokenService,
  ) {}

  async getIncomeByUserId(page: number) {
    const token: any = this.token.decodeToken(this.token.getToken());
    const income = await this.income.getIncomeByUserId({
      user_id: token.user_id,
      page,
    });

    return new ResponseJSON({
      success: true,
      statusCode: 200,
      statusMessage: 'OK',
      data: { income },
    });
  }

  async getIncomeById(id: string) {
    try {
      const income = await this.income.getIncomeById(id);
      if (!income)
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
          message: 'Income not found',
        });
      return new ResponseJSON({
        success: true,
        statusCode: 200,
        statusMessage: 'OK',
        data: { income },
      });
    } catch (error) {
      return new ResponseJSON({
        success: false,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  }

  async store(income: IncomeProps) {
    try {
      const token: any = this.token.decodeToken(this.token.getToken());
      // check if user_id is equal to token user_id
      if (token.user_id !== income.user_id)
        return new ResponseJSON({
          success: false,
          statusCode: 401,
          statusMessage: 'Unauthorized',
          message: 'Unauthorized',
        });

      const store = await this.income.store(income);
      return new ResponseJSON({
        success: true,
        statusCode: 201,
        statusMessage: 'Created',
        data: { income: store },
      });
    } catch (error) {
      return new ResponseJSON({
        success: false,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  }

  async update(income: IncomeProps) {
    try {
      const token: any = this.token.decodeToken(this.token.getToken());
      // check if user_id is equal to token user_id
      if (token.user_id !== income.user_id)
        return new ResponseJSON({
          success: false,
          statusCode: 401,
          statusMessage: 'Unauthorized',
          message: 'Unauthorized',
        });

      // check if income exist
      const getIncome = await this.income.getIncomeById(income.id);
      if (!getIncome)
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
          message: 'Income not found',
        });

      const update = await this.income.update(income);
      return new ResponseJSON({
        success: true,
        statusCode: 200,
        statusMessage: 'OK',
        data: { income: update },
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
      const income = await this.income.getIncomeById(id);
      if (!income)
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
          message: 'Income not found',
        });
      if (income.user_id !== token.user_id)
        return new ResponseJSON({
          success: false,
          statusCode: 401,
          statusMessage: 'Unauthorized',
          message: 'Unauthorized',
        });
      // delete income
      const deleteIncome = await this.income.delete(id);
      return new ResponseJSON({
        success: true,
        statusCode: 201,
        statusMessage: 'Created',
        message: 'Income deleted',
        data: { income: deleteIncome },
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
