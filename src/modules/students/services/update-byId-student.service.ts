import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { StudentCommandRepository } from 'src/repositories/students/student.command';
import { UpdateStudentDto } from '../dto/update-student.dto';

@Injectable()
export class UpdateByIdStudentsService {
  private readonly logger = new AppLogger(UpdateByIdStudentsService.name);

  constructor(
    private readonly studentCommandRepo: StudentCommandRepository,
  ) {}

  async execute(id: string, dto: UpdateStudentDto) {
    this.logger.log(`Attempting to update student with id: ${id}`, { dto });

    const updated = await this.studentCommandRepo.update(id, dto);

    if (!updated) {
      this.logger.warn(`Student with id ${id} was not found`);
      throw new NotFoundException(`Student with id ${id} was not found`);
    }

    this.logger.log(`Successfully updated student with id: ${id}`, { updated });
    return updated;
  }
}
