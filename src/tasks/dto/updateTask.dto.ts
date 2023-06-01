import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
