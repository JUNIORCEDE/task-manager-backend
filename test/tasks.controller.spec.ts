// tasks/tasks.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../tasks/tasks.controller';
import { TasksService } from '../tasks/tasks.service';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { Task } from '../tasks/schemas/task.schema';
import { Document } from 'mongoose';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTask = {
    _id: '1',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdAt: new Date(),
    // Agregar propiedades requeridas por Document de Mongoose
    ...Document.prototype,
  } as Task;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockTask),
            findAll: jest.fn().mockResolvedValue([mockTask]),
            findOne: jest.fn().mockResolvedValue(mockTask),
            update: jest.fn().mockResolvedValue(mockTask),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const result = await controller.create(createTaskDto);
      expect(result).toBe(mockTask);
      expect(service.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockTask]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return filtered tasks when completed query param is provided', async () => {
      const completedTask = {
        ...mockTask,
        completed: true,
      };
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([completedTask] as Task[]);

      const result = await controller.findAll(true);
      expect(result).toEqual([completedTask]);
      expect(service.findAll).toHaveBeenCalledWith(true);
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const result = await controller.findOne('1');
      expect(result).toBe(mockTask);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateDto = {
        title: 'Updated Task',
        completed: true,
      };

      const updatedMockTask = {
        ...mockTask,
        ...updateDto,
      } as Task;

      jest.spyOn(service, 'update').mockResolvedValueOnce(updatedMockTask);

      const result = await controller.update('1', updateDto);
      expect(result).toBe(updatedMockTask);
      expect(service.update).toHaveBeenCalledWith('1', updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});