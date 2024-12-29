import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Query,
    HttpStatus,
    HttpCode,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
  import { TasksService } from './tasks.service';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskDto } from './dto/update-task.dto';
  
  @ApiTags('tasks')
  @Controller('api/tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 200, description: 'The task has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    create(@Body() createTaskDto: CreateTaskDto) {
      return this.tasksService.create(createTaskDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiQuery({ name: 'completed', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'Return all tasks.' })
    findAll(@Query('completed') completed?: boolean) {
      return this.tasksService.findAll(completed);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a task by id' })
    @ApiResponse({ status: 200, description: 'Return the task.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    findOne(@Param('id') id: string) {
      return this.tasksService.findOne(id);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update a task' })
    @ApiResponse({ status: 200, description: 'The task has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
      return this.tasksService.update(id, updateTaskDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a task' })
    @ApiResponse({ status: 204, description: 'The task has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    remove(@Param('id') id: string) {
      return this.tasksService.remove(id);
    }
  }