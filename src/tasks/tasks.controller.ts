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
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
	private logger = new Logger('TasksController');
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
		this.logger.verbose(
			`User "${
				user.username
			}" retrieving all tasks using filters ${JSON.stringify(filterDto)}`,
		);
		return this.tasksService.getTasks(filterDto, user);
	}

	@Post()
	createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
		this.logger.verbose(
			`User "${user.username}" creating new task ${JSON.stringify(
				createTaskDto,
			)}`,
		);
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
