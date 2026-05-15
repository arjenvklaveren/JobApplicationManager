import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TaskService } from './task.service';
import type { TaskDTO } from '@jobapplicationmanager/shared';
import { BaseController } from 'src/base/base.controller';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController extends BaseController<TaskDTO> {
    constructor(private taskService: TaskService) {
        super(taskService);
    }
}
