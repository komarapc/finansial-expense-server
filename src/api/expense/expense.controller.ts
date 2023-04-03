import { ResponseJSON } from './../../utils/response';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { Controller } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { InputExpenseDto, UpdateExpenseDto } from './expense.dto';
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expense: ExpenseService) {}

  @Get('/')
  async index(
    @Query() query: { page?: number | string },
    @Res() response: Response,
  ) {
    try {
      const page = Number(query.page) || 1;
      const getExpense = await this.expense.getExpenseByUserId(page);
      response.status(getExpense.statusCode).send(getExpense);
    } catch (error) {
      response.status(500).send(
        new ResponseJSON({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        }),
      );
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: string, @Res() response: Response) {
    try {
      if (!id)
        response.status(400).send(
          new ResponseJSON({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'ID is required',
          }),
        );
      const expense = await this.expense.getById(id);
      response.status(expense.statusCode).send(expense);
    } catch (error) {
      response.status(500).send({
        success: false,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  }

  @Post('/')
  async store(@Body() body: InputExpenseDto, @Res() response: Response) {
    try {
      const store = await this.expense.store(body);
      response.status(store.statusCode).send(store);
    } catch (error) {
      console.log(error);
      response.status(500).send(
        new ResponseJSON({
          success: false,
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        }),
      );
    }
  }

  @Patch('/:id')
  async update(
    @Body() body: UpdateExpenseDto,
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    if (!id)
      response.status(400).send(
        new ResponseJSON({
          success: false,
          statusCode: 400,
          statusMessage: 'Bad Request',
        }),
      );
    try {
      const update = await this.expense.update({
        id,
        ...body,
      });
      response.status(update.statusCode).send(update);
    } catch (error) {
      response.status(500).send(
        new ResponseJSON({
          success: false,
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        }),
      );
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response: Response) {
    if (!id)
      response.status(400).send(
        new ResponseJSON({
          success: false,
          statusCode: 400,
          statusMessage: 'Bad Request',
        }),
      );
    try {
      const deleteExpense = await this.expense.delete(id);
      response.status(deleteExpense.statusCode).send(deleteExpense);
    } catch (error) {
      response.status(500).send(
        new ResponseJSON({
          success: false,
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        }),
      );
    }
  }
}
