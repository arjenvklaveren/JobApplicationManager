import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TaskService } from './task.service';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get('get-all')
    public async getTasks(@User() user: any) {
        
        return await this.taskService.getAllTasksFromUser(user.sub);
    }
}
