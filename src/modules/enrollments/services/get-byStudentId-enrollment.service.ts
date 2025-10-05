import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { EnrollmentQueryRepository } from 'src/repositories/enrollments/enrollment.query';

@Injectable()
export class GetByStudentIdEnrollmentService {
  private readonly logger = new AppLogger(GetByStudentIdEnrollmentService.name);

  constructor(
    private readonly enrollmentQueryRepo: EnrollmentQueryRepository,
  ) {}

  async execute(student_id: string) {
    this.logger.log(`START: Fetching enrollments for student_id: ${student_id}`);

    const enrollment = await this.enrollmentQueryRepo.findByStudenIdtId(student_id);

    if (!enrollment || enrollment.length === 0) {
      this.logger.warn(`NOT_FOUND: No enrollments found for student_id ${student_id}`);
      throw new NotFoundException(`No enrollments found for student_id ${student_id}`);
    }

    this.logger.log(`SUCCESS: Retrieved ${enrollment.length} enrollment(s) for student_id: ${student_id}`);
    return enrollment;
  }
}