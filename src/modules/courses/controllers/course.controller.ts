import { Body, Controller, Post, Get, Query, Patch, Delete, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateCourseDto } from "../dto/create-course.dto";
import { CreateCourseService } from "../services/create-course.service";
import { GetAllCourseService } from "../services/get-all-course.service";
import { GetByIdCourseService } from "../services/get-byId-course.service";
import { GetByCourseCodeCourseService } from "../services/get-byCourseCode-course.service";
import { UpdateByIdCourseService } from "../services/update-byId-course.service";
import { UpdateCourseDto } from "../dto/update-course.dto";
import { DeleteByIdCourseService } from "../services/delete-byId-course.service";

@ApiTags('courses')
@Controller('courses')
export class CourseController {
  constructor(
    private readonly createCourseService: CreateCourseService,
    private readonly getAllCourseService: GetAllCourseService,
    private readonly getByIdCourseService: GetByIdCourseService,
    private readonly getByCourseCodeCourseService: GetByCourseCodeCourseService,
    private readonly updateByIdCourseService: UpdateByIdCourseService,
    private readonly deleteByIdCourseService: DeleteByIdCourseService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new lecturer' })
  @ApiResponse({ status: 201, description: 'Lecturer created successfully.' })
  async create(@Body() dto: CreateCourseDto) {
    return this.createCourseService.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lecturers (with pagination)' })
  @ApiResponse({ status: 200, description: 'List of lecturers.' })
  async getAll(@Query() query: any) {
    return this.getAllCourseService.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lecturer by ID' })
  @ApiResponse({ status: 200, description: 'Lecturer data.' })
  @ApiResponse({ status: 404, description: 'Lecturer not found.' })
  async getById(@Param('id') id: string) {
    return this.getByIdCourseService.execute(id);
  }

  @Get('code/:course_code')
  @ApiOperation({ summary: 'Get course by Course Code' })
  @ApiResponse({ status: 200, description: 'Course data.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async getByCourseCode(@Param('course_code') course_code: string) {
    return this.getByCourseCodeCourseService.execute(course_code);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update course by ID' })
  @ApiResponse({ status: 200, description: 'Course updated successfully.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async updateById(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.updateByIdCourseService.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete course by ID' })
  @ApiResponse({ status: 200, description: 'Course deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async remove(@Param('id') id: string) {
    return this.deleteByIdCourseService.execute(id);
  }
}