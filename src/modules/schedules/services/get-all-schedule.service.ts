import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { defaultPaginator, generatePaginator } from 'src/utils/paginator';
import { ScheduleQueryRepository } from 'src/repositories/schedules/schedule.query';

@Injectable()
export class GetAllScheduleService {
  private readonly logger = new AppLogger(GetAllScheduleService.name);

  constructor(
    private readonly scheduleQueryRepo: ScheduleQueryRepository,
  ) {}

  async execute(params: any) {
    this.logger.log('Executing GetAllScheduleService.execute()');

    const { page, limit, offset } = defaultPaginator(params);
    this.logger.debug(`Pagination -> page=${page}, limit=${limit}, offset=${offset}`);

    try {
      const [data, total] = await this.scheduleQueryRepo.findWithPagination(limit, offset);

      this.logger.log(`Successfully fetched ${data.length} schedules out of total ${total}`);

      return {
        data,
        meta: generatePaginator(page, limit, total),
      };
    } catch (error) {
      this.logger.error('Failed to fetch schedules', error.stack);
      throw new InternalServerErrorException('Failed to fetch schedules');
    }
  }
}