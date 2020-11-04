import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { TaskStatusValidationPipe } from './pipes/status-validation.pipe';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto)
        } else {
            return this.taskService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id)
    }

    @Post() 
    @UsePipes(ValidationPipe)
    createTask(
       @Body() createTaskDto: CreateTaskDto
    ): Task {
        return this.taskService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/description')
    updateTaskDescription(
        @Param('id') id: string,
        @Body('description') description: string) : Task {
        return this.taskService.updateTaskDescription(id, description);
    } 

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus) : Task {
        return this.taskService.updateTaskStatus(id, status);
    }
    
}
