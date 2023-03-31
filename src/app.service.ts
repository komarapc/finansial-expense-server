import { Injectable } from '@nestjs/common';
import { ResponseJSON } from './utils/response';

@Injectable()
export class AppService {
  async getHello() {
    return new ResponseJSON({
      statusCode: 200,
      statusMessage: 'OK',
      data: {
        api_version: '1.0.0',
        description: 'This is a simple API for managing expenses',
      },
    });
  }
}
