import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { RoomQueryRepository } from 'src/repositories/rooms/room.query';

@Injectable()
export class GetByIdRoomService {
  private readonly logger = new AppLogger(GetByIdRoomService.name);

  constructor(
    private readonly roomQueryRepo: RoomQueryRepository,
  ) {}

  async execute(id: string) {
    this.logger.log(`Fetching room with id: ${id}`);

    const room = await this.roomQueryRepo.findById(id);

    if (!room) {
      this.logger.warn(`Room with id ${id} not found`);
      throw new NotFoundException(`Room with id ${id} was not found`);
    }

    this.logger.log(`Successfully retrieved room with id: ${id}`);
    return room;
  }
}