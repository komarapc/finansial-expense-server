import { ResponseJSON } from './../../utils/response';
import {
  Body,
  Controller,
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
import { IncomeService } from './income.service';
import { InputIncomeDto, UpdateIncomeDto } from './income.dto';

@Controller('income')
export class IncomeController {
  constructor(private readonly income: IncomeService) {}

  @Get('/')
  async index(
    @Query() query: { page?: number | string },
    @Res() response: Response,
  ) {
    try {
      const page = Number(query.page) || 1;
      const getIncome = await this.income.getIncomeByUserId(page);
      response.status(getIncome.statusCode).send(getIncome);
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
  async getIncomeById(@Param('id') id: string, @Res() response: Response) {
    if (!id)
      response.status(400).send(
        new ResponseJSON({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'ID is required',
        }),
      );
    try {
      const income: ResponseJSON = await this.income.getIncomeById(id);
      response.status(income.statusCode).send(income);
    } catch (error) {
      response.status(500).send(
        new ResponseJSON({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        }),
      );
    }
  }

  @Post('/')
  async createIncome(
    @Body() inputIncome: InputIncomeDto,
    @Res() response: Response,
  ) {
    try {
      const createIncome: ResponseJSON = await this.income.store(inputIncome);
      response.status(createIncome.statusCode).send(createIncome);
    } catch (error) {
      response.status(500).send(
        new ResponseJSON({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        }),
      );
    }
  }

  @Patch('/:id')
  async updateIncome(
    @Param('id') id: string,
    @Body() inputIncome: UpdateIncomeDto,
    @Res() response: Response,
  ) {
    if (!id)
      response.status(400).send(
        new ResponseJSON({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'ID is required',
        }),
      );

    if (!inputIncome || !Boolean(Object.keys(inputIncome).length))
      response.status(400).send({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Input is required',
      });
    const updateIncome: ResponseJSON = await this.income.update({
      id,
      ...inputIncome,
    });
    response.status(updateIncome.statusCode).send(updateIncome);
    try {
    } catch (error) {
      response.status(500).send(
        new ResponseJSON({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        }),
      );
    }
  }

  @Delete('/:id')
  async deleteIncome(@Param('id') id: string, @Res() response: Response) {
    if (!id)
      response.status(400).send(
        new ResponseJSON({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'ID is required',
        }),
      );
    try {
      const deleteIncome: ResponseJSON = await this.income.delete(id);
      response.status(deleteIncome.statusCode).send(deleteIncome);
    } catch (error) {
      response.status(500).send(
        new ResponseJSON({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        }),
      );
    }
  }
}
