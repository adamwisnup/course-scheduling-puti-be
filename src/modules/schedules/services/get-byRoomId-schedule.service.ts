import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { ScheduleQueryRepository } from 'src/repositories/schedules/schedule.query';

@Injectable()
export class GetByRoomIdScheduleService {
  private readonly logger = new AppLogger(GetByRoomIdScheduleService.name);

  constructor(
    private readonly scheduleQueryRepo: ScheduleQueryRepository,
  ) {}

  async execute(room_id: string) {
    this.logger.log(`START: Fetching schedules for room_id: ${room_id}`);

    const schedules = await this.scheduleQueryRepo.findByRoomId(room_id);

    if (!schedules || schedules.length === 0) {
      this.logger.warn(`NOT_FOUND: No schedules found for room_id ${room_id}`);
      throw new NotFoundException(`No schedules found for room_id ${room_id}`);
    }

    this.logger.log(`SUCCESS: Retrieved ${schedules.length} schedule(s) for room_id: ${room_id}`);
    return schedules;
  }
}