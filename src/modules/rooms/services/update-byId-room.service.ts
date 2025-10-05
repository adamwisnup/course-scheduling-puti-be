import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { RoomCommandRepository } from 'src/repositories/rooms/room.command';

@Injectable()
export class UpdateByIdRoomService {
  private readonly logger = new AppLogger(UpdateByIdRoomService.name);

  constructor(
    private readonly roomCommandRepo: RoomCommandRepository,
  ) {}

  async execute(id: string, dto: UpdateRoomDto) {
    this.logger.log(`START: Attempting to update room with id: ${id}`, { dto });

    const updated = await this.roomCommandRepo.update(id, dto);

    if (!updated) {
      this.logger.warn(`NOT_FOUND: Room with id ${id} was not found`);
      throw new NotFoundException(`Room with id ${id} was not found`);
    }

    this.logger.log(`SUCCESS: Room with id ${id} successfully updated`, { updated });
    return updated;
  }
}