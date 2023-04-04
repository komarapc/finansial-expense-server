import { ExpenseItemProps } from './expense-item.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../services/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class ExpenseItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    return await this.prisma.expenseItems.findUnique({
      where: {
        id,
      },
    });
  }

  async getExpenseItemByExpenseId(expense_id: string) {
    return await this.prisma.expenseItems.findMany({
      where: {
        expense_id,
      },
    });
  }

  async store(data: ExpenseItemProps) {
    return await this.prisma.expenseItems.create({
      data: {
        id: nanoid(25),
        expense_id: data.expense_id,
        amount: data.amount,
        description: data.description,
      },
    });
  }

  async update(data: ExpenseItemProps) {
    return await this.prisma.expenseItems.update({
      where: {
        id: data.id,
      },
      data: {
        amount: data.amount,
        description: data.description,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.expenseItems.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
