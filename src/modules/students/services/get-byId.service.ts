import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { StudentQueryRepository } from 'src/repositories/students/student.query';

@Injectable()
export class GetByIdStudentsService {
  private readonly logger = new AppLogger(GetByIdStudentsService.name);

  constructor(
    private readonly studentQueryRepo: StudentQueryRepository,
  ) {}

  async execute(id: string) {
    this.logger.log(`Fetching student with id: ${id}`);

    const student = await this.studentQueryRepo.findById(id);

    if (!student) {
      this.logger.warn(`Student with id ${id} not found`);
      throw new NotFoundException(`Student with id ${id} was not found`);
    }

    this.logger.log(`Successfully retrieved student with id: ${id}`);
    return student;
  }
}
