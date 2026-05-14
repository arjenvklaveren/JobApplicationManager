import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TaskService } from './task.service';
import type { TaskDTO } from '@jobapplicationmanager/shared';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get('get-all')
    public async getTasks(@User() user: any) {
        return await this.taskService.getAllTasksFromUser(user.sub);
    }

    @Post('add-task')
    public async addTask(
        @Body() taskDTO: TaskDTO,
        @User() user: any,
    ) {
        await this.taskService.addTask(taskDTO, user.sub);
    }

    @Put('update-task')
    public async updateTask(@Body() taskDTO: TaskDTO) {
        await this.taskService.updateTask(taskDTO);
    }

    @Delete('delete-task/:id')
    public async deleteTask(
        @Param('id', ParseIntPipe) taskId,
        @User() user: any,
    ) {
        await this.taskService.deleteTask(taskId, user.sub);
    }
}
