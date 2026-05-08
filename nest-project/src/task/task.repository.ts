import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

    public async getAllAsync(accountId: number) {
        return await this.prisma.task.findMany({
            where: { accountId: accountId },
    });
  }
}
