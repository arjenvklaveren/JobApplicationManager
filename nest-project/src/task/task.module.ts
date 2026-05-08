import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { PrismaService } from 'src/misc/prisma.service';

@Module({
  providers: [TaskService, TaskRepository, PrismaService],
  controllers: [TaskController]
})
export class TaskModule {}
