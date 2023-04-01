import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { BearerTokenMiddleware } from './../../middleware/bearer.middleware';
import { PrismaService } from './../../services/prisma.service';
import { TokenService } from './../../services/token.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    UserRepository,
    BearerTokenMiddleware,
    TokenService,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BearerTokenMiddleware).forRoutes(UserController);
  }
}
