import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../services/prisma.service';

@Injectable()
export class ExpenseItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getExpenseItemByExpenseId(expense_id: string) {
    return await this.prisma.expenseItems.findMany({
      where: {
        expense_id,
      },
    });
  }
}
