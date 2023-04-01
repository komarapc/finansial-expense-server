import { TokenService } from './../services/token.service';
import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Req, Res } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ResponseJSON } from './../utils/response';
import { ServerResponse } from 'http';

@Injectable()
export class BearerTokenMiddleware implements NestMiddleware {
  private readonly logger = new Logger(BearerTokenMiddleware.name);
  constructor(private readonly token: TokenService) {}
  use(@Req() req: Request, res: ServerResponse, next: NextFunction) {
    this.logger.log(BearerTokenMiddleware.name);
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify(
          new ResponseJSON({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Token is required',
          }),
        ),
      );
      res.end();
    }
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    if (bearer[0] !== 'Bearer') {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify(
          new ResponseJSON({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Token is required',
          }),
        ),
      );
      res.end();
    }

    const verifyToken = this.token.validateToken(bearerToken);
    if (!verifyToken) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify(
          new ResponseJSON({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Token is invalid',
          }),
        ),
      );
      res.end();
    }

    this.token.setToken(bearerToken);
    next();
  }
}
