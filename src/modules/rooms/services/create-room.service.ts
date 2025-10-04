import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { RoomCommandRepository } from "src/repositories/rooms/room.command";
import { AppLogger } from "src/utils/logger";
import { CreateRoomDto } from "../dto/create-room.dto";

@Injectable()
export class CreateRoomService {
  private readonly logger = new AppLogger(CreateRoomService.name);

  constructor(
    private readonly roomCommandRepo: RoomCommandRepository,
  ) {}

  async execute(dto: CreateRoomDto) {
    this.logger.log(`Starting room creation with code: ${dto.room_code}`);

    try {
      const room = await this.roomCommandRepo.create(dto);
      this.logger.log(
        `Room created successfully. ID: ${room.id}, Name: ${room.room_name}`
      );
      return room;
    } catch (error) {
      this.logger.error(
        `Failed to create room with code: ${dto.room_code}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to create room');
    }
  }
}
