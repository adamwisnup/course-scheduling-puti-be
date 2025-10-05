import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { ScheduleQueryRepository } from 'src/repositories/schedules/schedule.query';
import { EnrollmentQueryRepository } from 'src/repositories/enrollments/enrollment.query';

@Injectable()
export class GetByScheduleIdEnrollmentService {
  private readonly logger = new AppLogger(GetByScheduleIdEnrollmentService.name);

  constructor(
    private readonly enrollmentQueryRepo: EnrollmentQueryRepository,
  ) {}

  async execute(schedule_id: string) {
    this.logger.log(`START: Fetching enrollments for schedule_id: ${schedule_id}`);

    const enrollments = await this.enrollmentQueryRepo.findByScheduleId(schedule_id);

    if (!enrollments || enrollments.length === 0) {
      this.logger.warn(`NOT_FOUND: No enrollments found for schedule_id ${schedule_id}`);
      throw new NotFoundException(`No enrollments found for schedule_id ${schedule_id}`);
    }

    this.logger.log(`SUCCESS: Retrieved ${enrollments.length} enrollment(s) for schedule_id: ${schedule_id}`);
    return enrollments;
  }
}