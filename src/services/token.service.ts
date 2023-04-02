import * as jwt from 'jsonwebtoken';

import { Injectable } from '@nestjs/common';
import { trace } from 'console';

export class TokenService {
  public token?: string;

  constructor(token?: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }

  decodeToken(token: string) {
    // decode jwt token
    return jwt.decode(token, { complete: false });
  }

  verifyToken(token: string) {
    // verify jwt token
    return jwt.verify(token, process.env.SECRET_KEY);
  }

  validateToken(token: string): boolean {
    try {
      const verifyToken = this.verifyToken(token);
      return verifyToken ? true : false;
    } catch (error) {
      return false;
    }
  }

  createToken(payload: any) {
    // create jwt token
    return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
  }
}
