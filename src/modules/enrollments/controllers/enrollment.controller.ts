import { Body, Controller, Post, Get, Query, Patch, Delete, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateEnrollmentDto } from "../dto/create-enrollment.dto";
import { CreateEnrollmentService } from "../services/create-enrollment.service";
import { GetAllEnrollmentService } from "../services/get-all-enrollment.service";
import { GetByIdEnrollmentService } from "../services/get-byId-enrollment.service";
import { GetByStudentIdEnrollmentService } from "../services/get-byStudentId-enrollment.service";
import { GetByScheduleIdEnrollmentService } from "../services/get-byScheduleId-enrollment.service";
import { UpdateByIdEnrollmentService } from "../services/update-byId-enrollment.service";
import { UpdateEnrollmentDto } from "../dto/update-enrollment.dto";
import { DeleteByIdEnrollmentService } from "../services/delete-byId-enrollment.service";

@ApiTags('enrollments')
@Controller('enrollments')
export class EnrollmentController {
  constructor(
    private readonly createEnrollmentService: CreateEnrollmentService,
    private readonly getAllEnrollmentService: GetAllEnrollmentService,
    private readonly getByIdEnrollmentService: GetByIdEnrollmentService,
    private readonly getByStudentIdEnrollmentService: GetByStudentIdEnrollmentService,
    private readonly getByScheduleIdEnrollmentService: GetByScheduleIdEnrollmentService,
    private readonly updateByIdEnrollmentService: UpdateByIdEnrollmentService,
    private readonly deleteByIdEnrollmentService: DeleteByIdEnrollmentService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new room' })
  @ApiResponse({ status: 201, description: 'Room created successfully.' })
  async create(@Body() dto: CreateEnrollmentDto) {
    return this.createEnrollmentService.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms (with pagination)' })
  @ApiResponse({ status: 200, description: 'List of rooms.' })
  async getAll(@Query() query: any) {
    return this.getAllEnrollmentService.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get room by ID' })
  @ApiResponse({ status: 200, description: 'Room data.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  async getById(@Param('id') id: string) {
    return this.getByIdEnrollmentService.execute(id);
  }

  @Get('student/:student_id')
  @ApiOperation({ summary: 'Get enrollments by Student ID' })
  @ApiResponse({ status: 200, description: 'List of enrollments for the student.' })
  @ApiResponse({ status: 404, description: 'No enrollments found for the student.' })
  async getByStudentId(@Param('student_id') student_id: string) {
    return this.getByStudentIdEnrollmentService.execute(student_id);
  }

  @Get('schedule/:schedule_id')
  @ApiOperation({ summary: 'Get enrollments by Schedule ID' })
  @ApiResponse({ status: 200, description: 'List of enrollments for the schedule.' })
  @ApiResponse({ status: 404, description: 'No enrollments found for the schedule.' })
  async getByScheduleId(@Param('schedule_id') schedule_id: string) {
    return this.getByScheduleIdEnrollmentService.execute(schedule_id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update enrollment by ID' })
  @ApiResponse({ status: 200, description: 'Enrollment updated successfully.' })
  @ApiResponse({ status: 404, description: 'Enrollment not found.' })
  async updateById(@Param('id') id: string, @Body() dto: UpdateEnrollmentDto) {
    return this.updateByIdEnrollmentService.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete enrollment by ID' })
  @ApiResponse({ status: 200, description: 'Enrollment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Enrollment not found.' })
  async deleteById(@Param('id') id: string) {
    return this.deleteByIdEnrollmentService.execute(id);
  }  
}