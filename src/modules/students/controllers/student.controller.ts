import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { CreateStudentsService } from '../services/create-student.service';
import { GetAllStudentsService } from '../services/get-all-student.service';
import { GetByIdStudentsService } from '../services/get-byId.service';
import { UpdateByIdStudentsService } from '../services/update-byId-student.service';
import { DeleteByIdStudentsService } from '../services/delete-byId-student.service';

@ApiTags('students')
@Controller('students')
export class StudentController {
  constructor(
    private readonly createStudentsService: CreateStudentsService,
    private readonly getAllStudentsService: GetAllStudentsService,
    private readonly getByIdStudentsService: GetByIdStudentsService,
    private readonly updateByIdStudentsService: UpdateByIdStudentsService,
    private readonly deleteByIdStudentsService: DeleteByIdStudentsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new student' })
  @ApiResponse({ status: 201, description: 'Student created successfully.' })
  async create(@Body() dto: CreateStudentDto) {
    return this.createStudentsService.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students (with pagination)' })
  @ApiResponse({ status: 200, description: 'List of students.' })
  async getAll(@Query() query: any) {
    return this.getAllStudentsService.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by ID' })
  @ApiResponse({ status: 200, description: 'Student data.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async getById(@Param('id') id: string) {
    return this.getByIdStudentsService.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update student by ID' })
  @ApiResponse({ status: 200, description: 'Student updated successfully.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async updateById(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.updateByIdStudentsService.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete student by ID' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async remove(@Param('id') id: string) {
    return this.deleteByIdStudentsService.execute(id);
  }
}
