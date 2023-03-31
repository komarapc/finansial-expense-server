import { ResponseJSON } from './../../utils/response';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  Query,
} from '@nestjs/common';

import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, query } from 'express';
import { InputUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get('/')
  async index(
    @Query() query: { page?: number | string },
    @Res() response: Response,
  ) {
    try {
      const page = Number(query.page) || 1;
      const getUsers = await this.user.getUser({ page });
      response.status(getUsers.statusCode).send(getUsers);
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
  async getUserById(@Param('id') id: string, @Res() response: Response) {
    if (!id)
      response.status(400).send(
        new ResponseJSON({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'ID is required',
        }),
      );
    try {
      const user: ResponseJSON = await this.user.getUserById(id);
      response.status(user.statusCode).send(user);
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
  async store(@Body() data: InputUserDto, @Res() response: Response) {
    try {
      const store = await this.user.store({
        user: { email: data.email, password: data.password },
        profile: { first_name: data.first_name, last_name: data.last_name },
      });
      response.status(store.statusCode).send(store);
    } catch (error) {
      response.status(500).send(
        new ResponseJSON({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        }),
      );
    }
  }

  @Patch('/')
  async update(@Body() data: UpdateUserDto, @Res() response: Response) {
    try {
      const update = await this.user.update({
        user: { id: data.id, email: data.email, password: data.password },
        profile: { first_name: data.first_name, last_name: data.last_name },
      });
      response.status(update.statusCode).send(update);
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
  async delete(@Param('id') id: string, @Res() response: Response) {
    if (!id)
      response.status(400).send(
        new ResponseJSON({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'ID is required',
        }),
      );

    try {
      const deleteUser = await this.user.delete(id);
      response.status(deleteUser.statusCode).send(deleteUser);
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
