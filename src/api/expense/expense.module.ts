import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { BearerTokenMiddleware } from './../../middleware/bearer.middleware';
import { ExpenseController } from './expense.controller';
import { ExpenseItemRepository } from '../expense-item/expense-item.repository';
import { ExpenseRepository } from './expense.repository';
import { ExpenseService } from './expense.service';
import { PrismaService } from './../../services/prisma.service';
import { TokenService } from './../../services/token.service';

@Module({
  controllers: [ExpenseController],
  providers: [
    ExpenseService,
    PrismaService,
    TokenService,
    ExpenseRepository,
    ExpenseItemRepository,
  ],
})
export class ExpenseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BearerTokenMiddleware).forRoutes(ExpenseController);
  }
}
