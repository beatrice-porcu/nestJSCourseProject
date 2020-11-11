import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from './task.entity';
import { TaskRepository } from "./task.repository";

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) { }

  async getTasks(filter: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filter);
    }

  async getTaskById(id: number): Promise<Task> {
    let task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException()
    }
    return task
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
    return this.taskRepository.createTask(createTaskDto)
  }

  async deleteTask(id: number): Promise<any> {
    const deletion = await this.taskRepository.delete(id)
    if (deletion.affected === 0) {
      throw new NotFoundException('The task does not exist')
    }
  }

  async updateTaskDescription(id: number, description: string): Promise<Task> {
    let task = await this.getTaskById(id);
    task.description = description;
    await task.save()
    return task
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    let task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
