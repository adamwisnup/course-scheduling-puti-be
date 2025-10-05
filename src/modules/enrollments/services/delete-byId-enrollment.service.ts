import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { EnrollmentCommandRepository } from 'src/repositories/enrollments/enrollment.command';

@Injectable()
export class DeleteByIdEnrollmentService {
  private readonly logger = new AppLogger(DeleteByIdEnrollmentService.name);

  constructor(
    private readonly enrollmentCommandRepo: EnrollmentCommandRepository,
  ) {}

  async execute(id: string): Promise<{ message: string }> {
    this.logger.log(`START: Attempting to delete enrollment with id: ${id}`);

    try {
      await this.enrollmentCommandRepo.delete(id);

      this.logger.log(`SUCCESS: Enrollment with id ${id} successfully deleted`);
      return { message: `Enrollment with id ${id} was successfully deleted` };
    } catch (error) {
      this.logger.error(`ERROR: Failed to delete enrollment with id: ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to delete enrollment');
    }
  }
}