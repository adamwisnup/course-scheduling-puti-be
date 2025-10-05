import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { ScheduleQueryRepository } from 'src/repositories/schedules/schedule.query';

@Injectable()
export class GetByIdScheduleService {
  private readonly logger = new AppLogger(GetByIdScheduleService.name);

  constructor(
    private readonly scheduleQueryRepo: ScheduleQueryRepository,
  ) {}

  async execute(id: string) {
    this.logger.log(`START: Fetching schedule with id: ${id}`);

    const schedule = await this.scheduleQueryRepo.findById(id);

    if (!schedule) {
      this.logger.warn(`NOT_FOUND: Schedule with id ${id} not found`);
      throw new NotFoundException(`Schedule with id ${id} was not found`);
    }

    this.logger.log(`SUCCESS: Retrieved schedule with id: ${id}`);
    return schedule;
  }
}