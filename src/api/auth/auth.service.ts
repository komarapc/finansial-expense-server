import * as bcrypt from 'bcrypt';

import { AuthLogType } from './auth.interface';
import { AuthRepository } from './auth.repository';
import { Injectable } from '@nestjs/common';
import { ResponseJSON } from './../../utils/response';
import { TokenService } from './../../services/token.service';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly token: TokenService,
    private readonly user: UserRepository,
    private readonly auth: AuthRepository,
  ) {}

  async login(email: string, password: string) {
    // find user by email
    try {
      const user = await this.user.getUserByEmail(email);
      // check if user is not found
      if (!user)
        return new ResponseJSON({
          success: false,
          statusCode: 404,
          statusMessage: 'Not Found',
          message: 'User not found',
        });

      // compare password
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword)
        return new ResponseJSON({
          success: false,
          statusCode: 401,
          statusMessage: 'Unauthorized',
          message: 'Wrong password',
        });

      // generate token
      const token = this.token.createToken({ user_id: user.id });
      // create auth log
      const authLog = await this.auth.store({
        user_id: user.id,
        token,
        type: AuthLogType.LOGIN,
      });

      return new ResponseJSON({
        success: true,
        statusCode: 201,
        statusMessage: 'Created',
        data: {
          auth: authLog,
          user: {
            id: user.id,
            email: user.email,
            first_name: user.profile.first_name,
            last_name: user.profile.last_name,
            created_at: user.created_at,
          },
          _token: token,
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

  async logout() {
    try {
      const token = this.token.getToken();
      const decodeToken: any = this.token.decodeToken(token);
      const authLog = await this.auth.store({
        user_id: decodeToken.user_id,
        token,
        type: AuthLogType.LOGOUT,
      });
      return new ResponseJSON({
        success: true,
        statusCode: 200,
        statusMessage: 'OK',
        data: {
          auth: authLog,
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
}
