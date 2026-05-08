import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { mapTaskToDTO } from 'helpers/dtoConverterHelper';

@Injectable()
export class TaskService {
    constructor(private taskRepository: TaskRepository) { }

    public async getAllTasksFromUser(accountId: number) {
        var tasks = await this.taskRepository.getAllAsync(accountId);

        var taskDTOs = tasks.map(mapTaskToDTO);
        return taskDTOs;
    }
}
