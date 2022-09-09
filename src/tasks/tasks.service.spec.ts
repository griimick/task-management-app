import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
	findOne: jest.fn(),
});
const mockTask = {
	id: 'mockTaskId',
};
const mockUser = {
	username: 'Ariel',
	id: 'someId',
	password: 'somepassword',
	tasks: [],
};

describe('TaskService', () => {
	let tasksService: TasksService;
	let tasksRepository;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				TasksService,
				{ provide: getRepositoryToken(Task), useFactory: mockTasksRepository },
			],
		}).compile();

		tasksService = module.get<TasksService>(TasksService);
		tasksRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
	});

	describe('getTaskById', () => {
		it('calls TasksRepository.findOne and returns the result', async () => {
			tasksRepository.findOne.mockResolvedValue(mockTask);
			const result = await tasksService.getTaskById(mockTask.id, mockUser);
			expect(result).toEqual(mockTask);
		});
		it('calls TasksRepository.findOne and throws exception', async () => {
			tasksRepository.findOne.mockResolvedValue(mockTask);
			expect(tasksService.getTaskById('someid', mockUser)).rejects.toThrow(
				NotFoundException,
			);
		});
	});
});
