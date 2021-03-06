import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksService } from './tasks.service';
import { TaskStatusValidationPipe } from './pipes/status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id)
    }

    @Post() 
    @UsePipes(ValidationPipe)
    createTask(
       @Body() createTaskDto: CreateTaskDto
    ): Promise<Task> {
        return this.taskService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/description')
    updateTaskDescription(
        @Param('id', ParseIntPipe) id: number,
        @Body('description') description: string) : Promise<Task> {
        return this.taskService.updateTaskDescription(id, description);
    } 

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus) : Promise<Task>  {
        return this.taskService.updateTaskStatus(id, status);
    }
    
}
