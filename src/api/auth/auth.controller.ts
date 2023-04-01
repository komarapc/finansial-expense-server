import { ResponseJSON } from './../../utils/response';
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  async login(
    @Body() body: AuthDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const login = await this.auth.login(body.email, body.password);
      // set cookie if login success
      if (login.success) {
        response.cookie('token', login.data._token, {
          secure: true,
          expires: new Date(Date.now() + 3600000),
        });
      }
      response.status(login.statusCode).send(login);
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

  @Post('/logout')
  async logout(@Req() request: Request, @Res() response: Response) {
    try {
      const logout = await this.auth.logout();
      if (logout.success) response.clearCookie('token');
      response.status(logout.statusCode).send(logout);
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
