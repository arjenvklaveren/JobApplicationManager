import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { mapTaskToDTO } from 'helpers/dtoConverterHelper';
import { TaskDTO } from '@jobapplicationmanager/shared';
import { Prisma } from 'generated/prisma/browser';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class TaskService extends BaseService<
    TaskDTO,
    Prisma.TaskCreateInput,
    Prisma.TaskUpdateInput,
    Prisma.TaskGetPayload<{
        include: {}
    }>
> {
    constructor(private taskRepository: TaskRepository) { 
        super(taskRepository, ((task) => mapTaskToDTO(task)));
     }
    
    protected mapCreate(dto: TaskDTO, accountId: number): Prisma.TaskCreateInput {
        return {
            name: dto.name,
            description: dto.description,
            stage: dto.stage,
            deadline: dto.deadline || null,
            index: dto.index,
            account: {
                connect: {
                    id: accountId
                }
            }
        }
    }
    protected mapUpdate(dto: TaskDTO): Prisma.TaskUpdateInput {
        return {
            name: dto.name,
            description: dto.description,
            stage: dto.stage,
            deadline: dto.deadline || undefined,
            index: dto.index,
        }
    }
}
