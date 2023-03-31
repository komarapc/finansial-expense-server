import { Controller, Get, Res } from '@nestjs/common';

import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Res() response: Response) {
    const hello = await this.appService.getHello();
    response.status(hello.statusCode).send(hello);
  }
}
