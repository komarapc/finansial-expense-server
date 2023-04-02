import { Module, NestModule } from '@nestjs/common';

import { BearerTokenMiddleware } from './../../middleware/bearer.middleware';
import { IncomeController } from './income.controller';
import { IncomeRepository } from './income.repository';
import { IncomeService } from './income.service';
import { PrismaService } from './../../services/prisma.service';
import { TokenService } from './../../services/token.service';

@Module({
  controllers: [IncomeController],
  providers: [IncomeService, TokenService, PrismaService, IncomeRepository],
})
export class IncomeModule implements NestModule {
  configure(consumer: any) {
    consumer.apply(BearerTokenMiddleware).forRoutes(IncomeController);
  }
}
