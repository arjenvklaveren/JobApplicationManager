import { Injectable } from '@nestjs/common';
import { TaskCreateInput, TaskUpdateInput } from 'generated/prisma/models';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class TaskRepository {
    constructor(private prisma: PrismaService) {}

    public async getAllAsync(accountId: number) {
        return await this.prisma.task.findMany({
            where: { accountId: accountId },
        });
    }

    public async createAsync(task: TaskCreateInput) {
        await this.prisma.task.create({
            data: task,
        });
    }

    public async deleteAsync(id: number, accountId: number) {
        await this.prisma.task.delete({
            where: { id: id, accountId: accountId },
        });
    }

    public async updateAsync(task: TaskUpdateInput, taskId: number) {
        await this.prisma.task.update({
            where: {
                id: taskId,
            },
            data: task,
        });
    }
}
