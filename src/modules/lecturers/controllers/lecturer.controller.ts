import { Body, Controller, Post, Get, Query, Patch, Delete } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateLecturerService } from "../services/create-lecturer.service";
import { CreateLecturerDto } from "../dto/create-lecturer.dto";
import { GetAllLecturerService } from "../services/get-all-lecturer.service";
import { GetByIdLecturerService } from "../services/get-byId-lecturer.service";
import { UpdateByIdLecturerService } from "../services/update-byId-lecturer.service";
import { UpdateLecturerDto } from "../dto/update-lecturer.dto";
import { DeleteByIdLecturerService } from "../services/delete-byId-lecturer.service";

@ApiTags('lecturers')
@Controller('lecturers')
export class LecturerController {
  constructor(
    private readonly createLecturerService: CreateLecturerService,
    private readonly getAllLecturerService: GetAllLecturerService,
    private readonly getByIdLecturerService: GetByIdLecturerService,
    private readonly updateByIdLecturerService: UpdateByIdLecturerService,
    private readonly deleterByIdLecturerService: DeleteByIdLecturerService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new lecturer' })
  @ApiResponse({ status: 201, description: 'Lecturer created successfully.' })
  async create(@Body() dto: CreateLecturerDto) {
    return this.createLecturerService.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lecturers (with pagination)' })
  @ApiResponse({ status: 200, description: 'List of lecturers.' })
  async getAll(@Query() query: any) {
    return this.getAllLecturerService.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lecturer by ID' })
  @ApiResponse({ status: 200, description: 'Lecturer data.' })
  @ApiResponse({ status: 404, description: 'Lecturer not found.' })
  async getById(@Body('id') id: string) {
    return this.getByIdLecturerService.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update lecturer by ID' })
  @ApiResponse({ status: 200, description: 'Lecturer updated successfully.' })
  @ApiResponse({ status: 404, description: 'Lecturer not found.' })
  async updateById(@Body('id') id: string, @Body() dto: UpdateLecturerDto) {
    return this.updateByIdLecturerService.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete lecturer by ID' })
  @ApiResponse({ status: 200, description: 'Lecturer deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Lecturer not found.' })
  async remove(@Body('id') id: string) {
    return this.deleterByIdLecturerService.execute(id);
  }
}