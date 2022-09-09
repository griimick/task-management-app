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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get('/:id')
	getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
		return this.tasksService.getTaskById(id, user);
	}

	@Get()
	getTasks(
		@Query() filterDto: GetTasksFilterDto,
		@GetUser() user: User,
	): Promise<Task[]> {
		return this.tasksService.getTasks(filterDto, user);
	}

	@Post()
	createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
		return this.tasksService.createTask(createTaskDto, user);
	}

	@Delete('/:id')
	deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
		return this.tasksService.deleteTaskById(id, user);
	}

	@Patch('/:id/status')
	updateTaskStatus(
		@Param('id') id: string,
		@Body() udpateTaskStatusDto: UpdateTaskStatusDto,
		@GetUser() user: User,
	): Promise<Task> {
		const { status } = udpateTaskStatusDto;
		return this.tasksService.updateTaskStatus(id, user, status);
	}
}
