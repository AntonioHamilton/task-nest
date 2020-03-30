import {
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDTO, TaskDTOUpdate } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAll(): Promise<TaskDTO[]> {
    return this.taskService.getTask();
  }

  @Get(':id')
  getByID(@Param('id') id: string): Promise<TaskDTO> {
    return this.taskService.getTaskById(id);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body() task: TaskDTOUpdate,
  ): Promise<TaskDTO> {
    return this.taskService.updateTask(id, task);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNewTask(@Body() task: TaskDTO): Promise<TaskDTO> {
    return this.taskService.createTask(task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<string> {
    return this.taskService.deleteTask(id);
  }
}
