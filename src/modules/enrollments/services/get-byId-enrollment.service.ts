import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { ScheduleQueryRepository } from 'src/repositories/schedules/schedule.query';
import { EnrollmentQueryRepository } from 'src/repositories/enrollments/enrollment.query';

@Injectable()
export class GetByIdEnrollmentService {
  private readonly logger = new AppLogger(GetByIdEnrollmentService.name);

  constructor(
    private readonly enrollmentQueryRepo: EnrollmentQueryRepository,
  ) {}

  async execute(id: string) {
    this.logger.log(`START: Fetching enrollment with id: ${id}`);

    const enrollment = await this.enrollmentQueryRepo.findById(id);

    if (!enrollment) {
      this.logger.warn(`NOT_FOUND: Enrollment with id ${id} not found`);
      throw new NotFoundException(`Enrollment with id ${id} was not found`);
    }

    this.logger.log(`SUCCESS: Retrieved enrollment with id: ${id}`);
    return enrollment;
  }
}