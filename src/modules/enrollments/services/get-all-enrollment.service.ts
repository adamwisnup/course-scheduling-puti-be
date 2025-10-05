import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { defaultPaginator, generatePaginator } from 'src/utils/paginator';
import { EnrollmentQueryRepository } from 'src/repositories/enrollments/enrollment.query';

@Injectable()
export class GetAllEnrollmentService {
  private readonly logger = new AppLogger(GetAllEnrollmentService.name);

  constructor(
    private readonly enrollmentQueryRepo: EnrollmentQueryRepository,
  ) {}

  async execute(params: any) {
    this.logger.log('Executing GetAllEnrollmentService.execute()');

    const { page, limit, offset } = defaultPaginator(params);
    this.logger.debug(`Pagination -> page=${page}, limit=${limit}, offset=${offset}`);

    try {
      const [data, total] = await this.enrollmentQueryRepo.findWithPagination(limit, offset);

      this.logger.log(`Successfully fetched ${data.length} enrollments out of total ${total}`);

      return {
        data,
        meta: generatePaginator(page, limit, total),
      };
    } catch (error) {
      this.logger.error('Failed to fetch enrollments', error.stack);
      throw new InternalServerErrorException('Failed to fetch enrollments');
    }
  }
}