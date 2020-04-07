import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDTO, TaskDTOUpdate } from './dto/task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskDTO>,
  ) {}

  async getTask(): Promise<TaskDTO[]> {
    const found = await this.taskModel.find();
    return found;
  }

  async getTaskById(_id: string): Promise<TaskDTO> {
    const found = await this.taskModel.findOne({ _id });

    if (!found) {
      throw new NotFoundException(`O ID: "${_id}" não foi encontrado!`);
    }

    return found;
  }

  async updateTask(_id: string, task: TaskDTOUpdate): Promise<TaskDTO> {
    const found = await this.taskModel.findById(_id);

    if (!found) {
      throw new NotFoundException(`O ID: "${_id}" não foi encontrado!`);
    } else {
      await this.taskModel.findByIdAndUpdate({ _id }, { $set: task });
    }

    return await this.taskModel.findById(_id);
  }

  async createTask(taskDTO: TaskDTO): Promise<TaskDTO> {
    const { title, description, responsible, date } = taskDTO;

    const Task = new this.taskModel({
      title,
      description,
      responsible,
      date,
      status: TaskStatus.ABERTO,
    });
    return await Task.save();
  }

  async deleteTask(_id: string): Promise<string> {
    const found = await this.taskModel.findById(_id);

    if (!found) {
      throw new NotFoundException(`O ID: "${_id}" não foi encontrado!`);
    }

    return await this.taskModel
      .findOneAndDelete({ _id })
      .then(res => {
        console.log(res);
        return `A tarefa ${found.title} foi deletada`;
      })
      .catch(err => {
        console.log(err);
        throw new BadRequestException(`Não foi possível deletar a tarefa`);
      });
  }
}
