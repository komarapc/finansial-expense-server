import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { BearerTokenMiddleware } from './../../middleware/bearer.middleware';
import { ExpenseItemController } from './expense-item.controller';
import { ExpenseItemRepository } from './expense-item.repository';
import { ExpenseItemService } from './expense-item.service';
import { PrismaService } from './../../services/prisma.service';
import { TokenService } from './../../services/token.service';

@Module({
  controllers: [ExpenseItemController],
  providers: [
    ExpenseItemService,
    TokenService,
    PrismaService,
    ExpenseItemRepository,
  ],
})
export class ExpenseItemModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BearerTokenMiddleware).forRoutes(ExpenseItemController);
  }
}
