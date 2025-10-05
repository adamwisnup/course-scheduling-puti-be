import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { ScheduleQueryRepository } from 'src/repositories/schedules/schedule.query';
import { SearchScheduleDto } from '../dto/search-schedule.dto';

@Injectable()
export class SearchScheduleService {
  private readonly logger = new AppLogger(SearchScheduleService.name);

  constructor(
    private readonly scheduleQueryRepo: ScheduleQueryRepository,
  ) {}

  async execute(params: SearchScheduleDto) {
    this.logger.log(`START: Searching schedules with params: ${JSON.stringify(params)}`);

    const [schedules, total] = await this.scheduleQueryRepo.search(params);

    if (!schedules || schedules.length === 0) {
      this.logger.warn(`NOT_FOUND: No schedules found for params: ${JSON.stringify(params)}`);
      throw new NotFoundException(`No schedules found for the given search criteria.`);
    }

    this.logger.log(`SUCCESS: Retrieved ${schedules.length} schedule(s) (total: ${total})`);

    return {
      total,
      data: schedules,
    };
  }
}