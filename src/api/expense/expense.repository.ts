import { ExpenseItemRepository } from '../expense-item/expense-item.repository';
import { ExpenseProps } from './expense.interface';
import { Injectable } from '@nestjs/common';
import { Pagination } from './../../utils/pagination';
import { PrismaService } from './../../services/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class ExpenseRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly expenseItems: ExpenseItemRepository,
  ) {}

  async getExpenseByUserId({
    user_id,
    page,
  }: {
    user_id: string;
    page?: number;
  }) {
    const pagination = new Pagination(page);
    return await this.prisma.expense.findMany({
      where: {
        user_id,
        deleted_at: null,
      },
      include: { expense_items: true },
      skip: pagination.skip,
      take: pagination.limit,
    });
  }

  async getById(id: string) {
    return await this.prisma.expense.findUnique({
      where: {
        id,
      },
      include: {
        expense_items: true,
      },
    });
  }

  async store(expense: ExpenseProps) {
    const transaction = await this.prisma.$transaction(async (db) => {
      const expenseData = await db.expense.create({
        data: {
          id: nanoid(25),
          user_id: expense.user_id,
          description: expense.description,
        },
      });
      const expenseItems = await db.expenseItems.createMany({
        data: expense.expense_items.map((item) => ({
          id: nanoid(25),
          expense_id: expenseData.id,
          amount: item.amount,
          description: item.description,
        })),
      });

      return { expense: expenseData };
    });
    const expense_items = await this.expenseItems.getExpenseItemByExpenseId(
      transaction.expense.id,
    );
    return { ...transaction.expense, expense_items };
  }

  async update(expense: ExpenseProps) {
    return await this.prisma.expense.update({
      where: { id: expense.id },
      data: {
        description: expense.description,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.expense.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
        expense_items: {
          updateMany: {
            where: { expense_id: id },
            data: { deleted_at: new Date() },
          },
        },
      },
    });
  }
}
