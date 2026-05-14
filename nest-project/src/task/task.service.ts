import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { mapTaskToDTO } from 'helpers/dtoConverterHelper';
import { TaskDTO } from '@jobapplicationmanager/shared';
import { Prisma } from 'generated/prisma/browser';

@Injectable()
export class TaskService {
    constructor(private taskRepository: TaskRepository) { }

    public async getAllTasksFromUser(accountId: number) {
        var tasks = await this.taskRepository.getAllAsync(accountId);

        var taskDTOs = tasks.map(mapTaskToDTO);
        return taskDTOs;
    }

    public async addTask(taskDTO: TaskDTO, accountId: number) {

        let createTaskObject: Prisma.TaskCreateInput = {
            name: taskDTO.name,
            description: taskDTO.description,
            stage: taskDTO.stage,
            deadline: taskDTO.deadline || null,
            index: taskDTO.index,
            account: {
                connect: { id: accountId }
            }
        } 

        await this.taskRepository.createAsync(createTaskObject);
    }

    public async updateTask(taskDTO: TaskDTO) {
        
        let updateTaskObject: Prisma.TaskUpdateInput = {
            name: taskDTO.name,
            description: taskDTO.description,
            stage: taskDTO.stage,
            deadline: taskDTO.deadline || undefined,
            index: taskDTO.index,
        }

        await this.taskRepository.updateAsync(updateTaskObject, taskDTO.id!);
    }

    public async deleteTask(taskId: number, accountId: number) {
        await this.taskRepository.deleteAsync(taskId, accountId);
    }
}
