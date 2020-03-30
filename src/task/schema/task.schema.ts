import * as mongoose from 'mongoose';
import { TaskStatus } from '../task-status.enum';

export const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  responsible: {
    type: String,
    required: true,
  },
  status: {
    type: TaskStatus,
  },
});
