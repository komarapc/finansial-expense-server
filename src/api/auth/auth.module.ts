import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { BearerTokenMiddleware } from './../../middleware/bearer.middleware';
import { PrismaService } from './../../services/prisma.service';
import { TokenService } from './../../services/token.service';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    PrismaService,
    UserRepository,
    AuthRepository,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BearerTokenMiddleware)
      .exclude('auth/login')
      .forRoutes(AuthController);
  }
}
