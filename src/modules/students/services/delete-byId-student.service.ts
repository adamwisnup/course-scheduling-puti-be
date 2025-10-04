import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { StudentCommandRepository } from 'src/repositories/students/student.command';

@Injectable()
export class DeleteByIdStudentsService {
  private readonly logger = new AppLogger(DeleteByIdStudentsService.name);

  constructor(
    private readonly studentCommandRepo: StudentCommandRepository,
  ) {}

  async execute(id: string) {
    this.logger.log(`Attempting to delete student with id: ${id}`);

    const deleted = await this.studentCommandRepo.delete(id);
    
    this.logger.log(`Successfully deleted student with id: ${id}`);
    return { message: `Student with id ${id} was successfully deleted` };
  }
}
