import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/creat-task.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
	async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		const { title, description } = createTaskDto;

		const task = this.create({
			title,
			description,
			status: TaskStatus.OPEN,
		});

		await this.save(task);
		return task;
	}
}
