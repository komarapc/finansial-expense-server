import * as bcrypt from 'bcrypt';

import { ProfileProps, UserProps } from './user.interface';

import { Injectable } from '@nestjs/common';
import { ResponseJSON } from './../../utils/response';
import { TokenService } from './../../services/token.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly user: UserRepository,
    private readonly token: TokenService,
  ) {}

  async getUser(query?: { page?: number }) {
    try {
      const getUser = await this.user.getUser(query);
      if (!Boolean(Object.keys(getUser).length))
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
          message: 'User not found',
        });
      return new ResponseJSON({
        success: true,
        statusCode: 200,
        statusMessage: 'OK',
        data: { users: getUser },
      });
    } catch (error) {
      return new ResponseJSON({
        success: false,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  }

  async getUserById(id: string) {
    try {
      const getUser = await this.user.getUserById(id);
      if (!getUser)
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
          message: 'User not found',
        });
      // exclude password
      return new ResponseJSON({
        success: true,
        statusCode: 200,
        statusMessage: 'OK',
        data: {
          user: {
            id: getUser.id,
            email: getUser.email,
            first_name: getUser.profile.first_name,
            last_name: getUser.profile.last_name,
            created_at: getUser.created_at,
            updated_at: getUser.updated_at,
            deleted_at: getUser.deleted_at,
          },
        },
      });
    } catch (error) {
      return new ResponseJSON({
        success: false,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  }

  /**
   * @description store new user
   * @param data
   * @returns
   */
  async store(data: { user: UserProps; profile: ProfileProps }) {
    try {
      // check if email already exists
      const user = await this.user.getUserByEmail(data.user.email);
      if (user)
        return new ResponseJSON({
          success: false,
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'Email already exists',
        });

      // hash password
      const hashPassword = bcrypt.hashSync(data.user.password, 10);
      const store = await this.user.store({
        user: { ...data.user, password: hashPassword },
        profile: data.profile,
      });
      // return response
      return new ResponseJSON({
        success: true,
        statusCode: 201,
        statusMessage: 'Created',
        message: 'User created successfully',
        data: { user: store },
      });
    } catch (error) {
      return new ResponseJSON({
        success: false,
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  }

  async update(data: { user: UserProps; profile: ProfileProps }) {
    try {
      // check if user id is exists
      const user = await this.user.getUserById(data.user.id);
      if (!user)
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
          message: 'User not found',
        });

      // check if email already exists or same with current email
      const email = await this.user.getUserByEmail(data.user.email);
      if (email && email.email !== user.email)
        return new ResponseJSON({
          success: false,
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'Email already exists',
        });

      // hash password if password is not empty
      const hashPassword = data.user.password
        ? bcrypt.hashSync(data.user.password, process.env.SALT_ROUND)
        : user.password;

      // update user
      const update = await this.user.update({
        user: { ...data.user, password: hashPassword },
        profile: data.profile,
      });

      // return response
      return new ResponseJSON({
        success: true,
        statusCode: 201,
        statusMessage: 'Created',
        message: 'User updated successfully',
        data: { user: update },
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
      const user = await this.user.getUserById(id);
      if (!user)
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
          message: 'User not found',
        });
      await this.user.delete(id);
      return new ResponseJSON({
        success: true,
        statusCode: 201,
        statusMessage: 'Created',
        message: 'User deleted successfully',
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
