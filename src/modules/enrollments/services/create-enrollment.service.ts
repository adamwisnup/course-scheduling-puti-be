import { Enrollment } from './../../../schemas/enrollments.schema';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EnrollmentCommandRepository } from 'src/repositories/enrollments/enrollment.command';
import { AppLogger } from 'src/utils/logger';
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';

@Injectable()
export class CreateEnrollmentService {
  private readonly logger = new AppLogger(CreateEnrollmentService.name);

  constructor(
    private readonly enrollmentCommandRepo: EnrollmentCommandRepository,
  ) {}

  async execute(dto: CreateEnrollmentDto): Promise<Enrollment> {
    this.logger.log(`START: Creating enrollment for student_id: ${dto.student_id}`);

    try {
      const enrollment = await this.enrollmentCommandRepo.create(dto);
      this.logger.log(`SUCCESS: Enrollment created successfully. ID: ${enrollment.id}, Student ID: ${enrollment.student?.id ?? dto.student_id}`);

      return enrollment;
    } catch (error) {
      this.logger.error(
        `ERROR: Failed to create enrollment for student_id: ${dto.student_id}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to create enrollment');
    }
  }
}