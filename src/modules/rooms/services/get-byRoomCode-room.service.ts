import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { RoomQueryRepository } from 'src/repositories/rooms/room.query';

@Injectable()
export class GetByRoomCodeRoomService {
  private readonly logger = new AppLogger(GetByRoomCodeRoomService.name);

  constructor(
    private readonly roomQueryRepo: RoomQueryRepository,
  ) {}

  async execute(room_code: string) {
    this.logger.log(`START: Fetching course with room_code: ${room_code}`);

    const course = await this.roomQueryRepo.findByRoomCode(room_code);

    if (!course) {
      this.logger.warn(`NOT_FOUND: Course with room code ${room_code} not found`);
      throw new NotFoundException(`Course with room code ${room_code} was not found`);
    }

    this.logger.log(`SUCCESS: Successfully retrieved course with room code: ${room_code}`);
    return course;
  }
}