import { AuthLogProps } from './auth.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../services/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async store(authLog: AuthLogProps) {
    return await this.prisma.authLog.create({
      data: {
        id: nanoid(25),
        user_id: authLog.user_id,
        token: authLog.token,
        type: authLog.type,
      },
    });
  }
}
