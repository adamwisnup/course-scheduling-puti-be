import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { ScheduleQueryRepository } from 'src/repositories/schedules/schedule.query';

@Injectable()
export class GetByCourseIdScheduleService {
  private readonly logger = new AppLogger(GetByCourseIdScheduleService.name);

  constructor(
    private readonly scheduleQueryRepo: ScheduleQueryRepository,
  ) {}

  async execute(course_id: string) {
    this.logger.log(`START: Fetching schedules for course_id: ${course_id}`);

    const schedules = await this.scheduleQueryRepo.findByCourseId(course_id);

    if (!schedules || schedules.length === 0) {
      this.logger.warn(`NOT_FOUND: No schedules found for course_id ${course_id}`);
      throw new NotFoundException(`No schedules found for course_id ${course_id}`);
    }

    this.logger.log(`SUCCESS: Retrieved ${schedules.length} schedule(s) for course_id: ${course_id}`);
    return schedules;
  }
}