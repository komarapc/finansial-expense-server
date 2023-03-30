import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { AuthLogModule } from './api/auth-log/auth-log.module';
import { UserModule } from './api/user/user.module';
import { IncomeModule } from './api/income/income.module';
import { ExpenseModule } from './api/expense/expense.module';
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, AuthLogModule, UserModule, IncomeModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
