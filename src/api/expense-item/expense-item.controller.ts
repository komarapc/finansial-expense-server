import { ResponseJSON } from './../../utils/response';
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Req,
  Res,
  Param,
} from '@nestjs/common';

import { ExpenseItemService } from './expense-item.service';
import { Response } from 'express';
import { InputExpenseItemDto, UpdateExpenseItemDto } from './expense-item.dto';

@Controller('expense-item')
export class ExpenseItemController {
  constructor(private readonly expenseItems: ExpenseItemService) {}

  @Get('/:id')
  async getById(@Param('id') id: string, @Res() response: Response) {
    if (!id)
      response.status(400).send(
        new ResponseJSON({
          success: false,
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'ID is required',
        }),
      );

    try {
      const expenseItem = await this.expenseItems.getById(id);
    } catch (error) {
      response.status(400).send(
        new ResponseJSON({
          success: false,
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'ID is required',
        }),
      );
    }
  }

  @Post('/')
  async store(@Body() body: InputExpenseItemDto, @Res() response: Response) {
    try {
      const store = await this.expenseItems.store(body);
      response.status(store.statusCode).send(store);
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

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateExpenseItemDto,
    @Res() response: Response,
  ) {
    if (!id)
      response.status(400).send(
        new ResponseJSON({
          success: false,
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'ID is required',
        }),
      );
    try {
      const update = await this.expenseItems.update({ id, ...body });
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
          message: 'ID is required',
        }),
      );
    try {
      const deleted = await this.expenseItems.delete(id);
      response.status(deleted.statusCode).send(deleted);
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
