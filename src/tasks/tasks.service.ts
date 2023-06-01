import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/createTask.dto';
import { FilterTaskDto } from './dto/filterTask.dto';
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

  getTask(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new Error('Task not found');
    }
    return found;
  }

  getTasksWithFilters(filterTaskDto: FilterTaskDto): Task[] {
    const { status, search } = filterTaskDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search),
      );
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus['OPEN'],
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTask(id);
    if (found) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    }
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTask(id);
    task.status = status;
    return task;
  }
}
