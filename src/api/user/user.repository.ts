import { ProfileProps, UserProps } from './user.interface';

import { Injectable } from '@nestjs/common';
import { Pagination } from './../../utils/pagination';
import { PrismaService } from './../../services/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(query?: { page?: number }) {
    const pagination = new Pagination(query.page);
    return await this.prisma.user.findMany({
      where: {
        deleted_at: null,
      },
      skip: pagination.skip,
      take: pagination.limit,
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  // create new user
  async store(data: { user: UserProps; profile: ProfileProps }) {
    return await this.prisma.user.create({
      data: {
        id: nanoid(),
        email: data.user.email,
        password: data.user.password,
        profile: {
          create: {
            id: nanoid(),
            first_name: data.profile.first_name,
            last_name: data.profile.last_name,
          },
        },
      },
    });
  }

  /**
   * @description get user by email
   * @param email
   * @returns UserProps
   */
  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  /**
   * @description get user by id
   * @param id
   * @returns UserProps
   */
  async getUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * @description update user
   * @param data
   * @returns
   */
  async update(data: { user: UserProps; profile: ProfileProps }) {
    return await this.prisma.user.update({
      where: {
        id: data.user.id,
      },
      data: {
        email: data.user.email,
        password: data.user.password,
        profile: {
          update: {
            first_name: data.profile.first_name,
            last_name: data.profile.last_name,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
