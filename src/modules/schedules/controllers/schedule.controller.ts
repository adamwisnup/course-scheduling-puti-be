import { Body, Controller, Post, Get, Query, Patch, Delete, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateScheduleService } from "../services/create-schedule.service";
import { CreateScheduleDto } from "../dto/create-schedule.dto";
import { GetAllScheduleService } from "../services/get-all-schedule.service";
import { GetByCourseIdScheduleService } from "../services/get-byCourseId-schedule.service";
import { GetByIdScheduleService } from "../services/get-byId-schedule.service";
import { GetByLecturerIdScheduleService } from "../services/get-bylecturerId-schedule.service";
import { GetByRoomIdScheduleService } from "../services/get-byRoomId-schedule.service";
import { SearchScheduleService } from "../services/search-schedule.service";
import { UpdateByIdScheduleService } from "../services/update-byId-schedule.service";
import { DeleteByIdScheduleService } from "../services/delete-byId-schedule.service";
import { SearchScheduleDto } from "../dto/search-schedule.dto";

@ApiTags('schedules')
@Controller('schedules')
export class ScheduleController {
  constructor(
    private readonly createScheduleService: CreateScheduleService,
    private readonly getAllScheduleService: GetAllScheduleService,
    private readonly getByIdScheduleService: GetByIdScheduleService,
    private readonly getByCourseIdScheduleService: GetByCourseIdScheduleService,
    private readonly getByLecturerIdScheduleService: GetByLecturerIdScheduleService,
    private readonly getByRoomIdScheduleService: GetByRoomIdScheduleService,
    private readonly searchScheduleService: SearchScheduleService,
    private readonly updateByIdScheduleService: UpdateByIdScheduleService,
    private readonly deleteByIdScheduleService: DeleteByIdScheduleService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new room' })
  @ApiResponse({ status: 201, description: 'Room created successfully.' })
  async create(@Body() dto: CreateScheduleDto) {
    return this.createScheduleService.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms (with pagination)' })
  @ApiResponse({ status: 200, description: 'List of rooms.' })
  async getAll(@Query() query: any) {
    return this.getAllScheduleService.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get room by ID' })
  @ApiResponse({ status: 200, description: 'Room data.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  async getById(@Param('id') id: string) {
    return this.getByIdScheduleService.execute(id);
  }

  @Get('course/:course_id')
  @ApiOperation({ summary: 'Get schedules by Course ID' })
  @ApiResponse({ status: 200, description: 'List of schedules for the course.' })
  @ApiResponse({ status: 404, description: 'No schedules found for the course.' })
  async getByCourseId(@Param('course_id') course_id: string) {
    return this.getByCourseIdScheduleService.execute(course_id);
  }

  @Get('lecturer/:lecturer_id')
  @ApiOperation({ summary: 'Get schedules by Lecturer ID' })
  @ApiResponse({ status: 200, description: 'List of schedules for the lecturer.' })
  @ApiResponse({ status: 404, description: 'No schedules found for the lecturer.' })
  async getByLecturerId(@Param('lecturer_id') lecturer_id: string) {
    return this.getByLecturerIdScheduleService.execute(lecturer_id);
  }

  @Get('room/:room_id')
  @ApiOperation({ summary: 'Get schedules by Room ID' })
  @ApiResponse({ status: 200, description: 'List of schedules for the room.' })
  @ApiResponse({ status: 404, description: 'No schedules found for the room.' })
  async getByRoomId(@Param('room_id') room_id: string) {
    return this.getByRoomIdScheduleService.execute(room_id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update room by ID' })
  @ApiResponse({ status: 200, description: 'Room updated successfully.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  async updateById(@Param('id') id: string, @Body() dto: CreateScheduleDto) {
    return this.updateByIdScheduleService.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete room by ID' })
  @ApiResponse({ status: 200, description: 'Room deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  async deleteById(@Param('id') id: string) {
    return this.deleteByIdScheduleService.execute(id);
  }
}