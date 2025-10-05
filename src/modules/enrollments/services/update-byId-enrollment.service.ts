import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { EnrollmentCommandRepository } from 'src/repositories/enrollments/enrollment.command';
import { Enrollment } from 'src/schemas/enrollments.schema';
import { UpdateEnrollmentDto } from '../dto/update-enrollment.dto';

@Injectable()
export class UpdateByIdEnrollmentService {
  private readonly logger = new AppLogger(UpdateByIdEnrollmentService.name);

  constructor(
    private readonly enrollmentCommandRepo: EnrollmentCommandRepository,
  ) {}

  async execute(id: string, dto: UpdateEnrollmentDto): Promise<Enrollment> {
    this.logger.log(`START: Updating enrollment with ID: ${id}`, { payload: dto });

    try {
      const updatedEnrollment = await this.enrollmentCommandRepo.update(id, dto);

      if (!updatedEnrollment) {
        this.logger.warn(`NOT_FOUND: Enrollment with ID ${id} was not found`);
        throw new NotFoundException(`Enrollment with ID ${id} was not found`);
      }

      this.logger.log(`SUCCESS: Enrollment with ID ${id} has been updated successfully`, {
        updated: updatedEnrollment,
      });

      return updatedEnrollment;
    } catch (error) {
      this.logger.error(
        `ERROR: Failed to update enrollment with ID: ${id}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to update enrollment');
    }
  }
}