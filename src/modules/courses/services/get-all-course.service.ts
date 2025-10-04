import { Injectable } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { defaultPaginator, generatePaginator } from 'src/utils/paginator';
import { CourseQueryRepository } from 'src/repositories/courses/course.query';

@Injectable()
export class GetAllCourseService {
  private readonly logger = new AppLogger(GetAllCourseService.name);

  constructor(
    private readonly courseQueryRepo: CourseQueryRepository,
  ) {}

  async execute(params: any) {
    this.logger.log('Executing GetAllCourseService.execute()');

    const { page, limit, offset } = defaultPaginator(params);
    this.logger.debug(`Pagination -> page=${page}, limit=${limit}, offset=${offset}`);

    try {
      const [data, total] = await this.courseQueryRepo.findWithPagination(limit, offset);
      this.logger.log(`Successfully fetched ${data.length} courses out of total ${total}`);

      return {
        data,
        meta: generatePaginator(page, limit, total),
      };
    } catch (error) {
      this.logger.error('Failed to fetch courses', error.stack);
      throw error;
    }
  }
}