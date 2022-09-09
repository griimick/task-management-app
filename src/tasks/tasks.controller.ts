import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Patch,
	Query,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { CreateTaskDto } from './dto/creat-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filer.dto';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get('/:id')
	getTaskById(@Param('id') id: string): Promise<Task> {
		return this.tasksService.getTaskById(id);
	}

	@Get()
	getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
		return this.tasksService.getTasks(filterDto);
	}

	@Post()
	createTask(@Body() createTaskDto: CreateTaskDto) {
		return this.tasksService.createTask(createTaskDto);
	}

	@Delete('/:id')
	deleteTask(@Param('id') id: string): Promise<void> {
		return this.tasksService.deleteTaskById(id);
	}

	@Patch('/:id/status')
	updateTaskStatus(
		@Param('id') id: string,
		@Body() udpateTaskStatusDto: UpdateTaskStatusDto,
	): Promise<Task> {
		const { status } = udpateTaskStatusDto;
		return this.tasksService.updateTaskStatus(id, status);
	}
}
