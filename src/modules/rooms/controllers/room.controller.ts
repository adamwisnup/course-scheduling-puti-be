import { Body, Controller, Post, Get, Query, Patch, Delete, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateRoomService } from "../services/create-room.service";
import { CreateRoomDto } from "../dto/create-room.dto";
import { GetAllRoomService } from "../services/get-all-room.service";
import { GetByIdRoomService } from "../services/get-byId-room.service";
import { GetByRoomCodeRoomService } from "../services/get-byRoomCode-room.service";
import { UpdateByIdRoomService } from "../services/update-byId-room.service";
import { UpdateRoomDto } from "../dto/update-room.dto";
import { DeleteByIdRoomService } from "../services/delete-byId-room.service";

@ApiTags('rooms')
@Controller('rooms')
export class RoomController {
  constructor(
    private readonly createRoomService: CreateRoomService,
    private readonly getAllRoomService: GetAllRoomService,
    private readonly getByIdRoomService: GetByIdRoomService,
    private readonly getByRoomCodeRoomService: GetByRoomCodeRoomService,
    private readonly updateByIdRoomService: UpdateByIdRoomService,
    private readonly deleteByIdRoomService: DeleteByIdRoomService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new room' })
  @ApiResponse({ status: 201, description: 'Room created successfully.' })
  async create(@Body() dto: CreateRoomDto) {
    return this.createRoomService.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms (with pagination)' })
  @ApiResponse({ status: 200, description: 'List of rooms.' })
  async getAll(@Query() query: any) {
    return this.getAllRoomService.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get room by ID' })
  @ApiResponse({ status: 200, description: 'Room data.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  async getById(@Param('id') id: string) {
    return this.getByIdRoomService.execute(id);
  }

  @Get('code/:room_code')
  @ApiOperation({ summary: 'Get room by Room Code' })
  @ApiResponse({ status: 200, description: 'Room data.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  async getByRoomCode(@Param('room_code') room_code: string) {
    return this.getByRoomCodeRoomService.execute(room_code);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update room by ID' })
  @ApiResponse({ status: 200, description: 'Room updated successfully.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  async updateById(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
    return this.updateByIdRoomService.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete room by ID' })
  @ApiResponse({ status: 200, description: 'Room deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  async deleteById(@Param('id') id: string) {
    return this.deleteByIdRoomService.execute(id);
  }
}