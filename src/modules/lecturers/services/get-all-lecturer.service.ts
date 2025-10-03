import { Injectable } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { defaultPaginator, generatePaginator } from 'src/utils/paginator';
import { LecturerQueryRepository } from 'src/repositories/lecturers/lecturer.query';

@Injectable()
export class GetAllLecturerService {
  private readonly logger = new AppLogger(GetAllLecturerService.name);

  constructor(
    private readonly lecturerQueryRepo: LecturerQueryRepository,
  ) {}

  async execute(params: any) {
    this.logger.log('Executing GetAllLecturerService.execute()');

    const { page, limit, offset } = defaultPaginator(params);
    this.logger.debug(`Paginator values -> page=${page}, limit=${limit}, offset=${offset}`);

    try {
      const [data, total] = await this.lecturerQueryRepo.findWithPagination(limit, offset);
      this.logger.log(`Successfully fetched ${data.length} lecturers out of total ${total}`);

      return {
        data,
        meta: generatePaginator(page, limit, total),
      };
    } catch (error) {
      this.logger.error('Failed to fetch lecturers', error.stack);
      throw error;
    }
  }
}