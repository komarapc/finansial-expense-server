import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ExpenseModule } from './api/expense/expense.module';
import { IncomeModule } from './api/income/income.module';
import { Module } from '@nestjs/common';
import { UserModule } from './api/user/user.module';
import { ExpenseItemModule } from './api/expense-item/expense-item.module';
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, IncomeModule, ExpenseModule, ExpenseItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
