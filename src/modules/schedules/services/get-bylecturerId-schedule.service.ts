import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { ScheduleQueryRepository } from 'src/repositories/schedules/schedule.query';

@Injectable()
export class GetByLecturerIdScheduleService {
  private readonly logger = new AppLogger(GetByLecturerIdScheduleService.name);

  constructor(
    private readonly scheduleQueryRepo: ScheduleQueryRepository,
  ) {}

  async execute(lecturer_id: string) {
    this.logger.log(`START: Fetching schedules for lecturer_id: ${lecturer_id}`);

    const schedules = await this.scheduleQueryRepo.findByLecturerId(lecturer_id);

    if (!schedules || schedules.length === 0) {
      this.logger.warn(`NOT_FOUND: No schedules found for lecturer_id ${lecturer_id}`);
      throw new NotFoundException(`No schedules found for lecturer_id ${lecturer_id}`);
    }

    this.logger.log(`SUCCESS: Retrieved ${schedules.length} schedule(s) for lecturer_id: ${lecturer_id}`);
    return schedules;
  }
}