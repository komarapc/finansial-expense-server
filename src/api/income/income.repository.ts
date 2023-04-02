import { IncomeProps } from './income.interface';
import { Injectable } from '@nestjs/common';
import { Pagination } from './../../utils/pagination';
import { PrismaService } from './../../services/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class IncomeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getIncomeByUserId({
    user_id,
    page,
  }: {
    user_id: string;
    page?: number;
  }) {
    const pagination = new Pagination(page);
    return await this.prisma.income.findMany({
      where: {
        user_id,
      },
      skip: pagination.skip,
      take: pagination.limit,
    });
  }

  async getIncomeById(id: string) {
    return await this.prisma.income.findUnique({
      where: {
        id,
      },
    });
  }

  async store(income: IncomeProps) {
    return await this.prisma.income.create({
      data: {
        id: nanoid(25),
        user_id: income.user_id,
        amount: income.amount,
        description: income.description,
      },
    });
  }

  async update(income: IncomeProps) {
    return await this.prisma.income.update({
      where: {
        id: income.id,
      },
      data: {
        amount: income.amount,
        description: income.description,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.income.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
