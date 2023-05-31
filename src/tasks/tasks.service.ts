import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks = [
    {
      id: uuid(),
      title: 'Task 1',
      description: 'This is task 1',
      status: TaskStatus['OPEN'], // OPEN | IN_PROGRESS | DONE
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }
}
