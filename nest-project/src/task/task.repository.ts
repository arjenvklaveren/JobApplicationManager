import { Injectable } from '@nestjs/common';
import { Prisma, Task } from 'generated/prisma/browser';
import { TaskCreateInput, TaskUpdateInput } from 'generated/prisma/models';
import { BaseRepository } from 'src/base/base.repository';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class TaskRepository extends BaseRepository<
    Prisma.TaskCreateInput,
    Prisma.TaskUpdateInput,
    Prisma.TaskWhereUniqueInput,
    Task
>{
    constructor(private prisma: PrismaService) {
        super(prisma.task, {});
    }
}
