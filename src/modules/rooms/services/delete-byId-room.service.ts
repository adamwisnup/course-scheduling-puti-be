import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { RoomCommandRepository } from 'src/repositories/rooms/room.command';

@Injectable()
export class DeleteByIdRoomService {
  private readonly logger = new AppLogger(DeleteByIdRoomService.name);

  constructor(
    private readonly roomCommandRepo: RoomCommandRepository,
  ) {}

  async execute(id: string) {
    this.logger.log(`START: Attempting to delete room with id: ${id}`);

    try {
      const deleted = await this.roomCommandRepo.delete(id);

      this.logger.log(`SUCCESS: Room with id ${id} successfully deleted`);
      return { message: `Room with id ${id} was successfully deleted` };
    } catch (error) {
      this.logger.error(`ERROR: Failed to delete room with id: ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to delete room');
    }
  }
}