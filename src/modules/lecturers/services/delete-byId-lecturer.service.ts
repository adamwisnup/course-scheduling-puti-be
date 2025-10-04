import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { LecturerCommandRepository } from 'src/repositories/lecturers/lecturer.command';

@Injectable()
export class DeleteByIdLecturerService {
  private readonly logger = new AppLogger(DeleteByIdLecturerService.name);

  constructor(
    private readonly lecturerCommandRepo: LecturerCommandRepository,
  ) {}

  async execute(id: string) {
    this.logger.log(`Attempting to delete lecturer with id: ${id}`);

    const deleted = await this.lecturerCommandRepo.delete(id);

    this.logger.log(`Successfully deleted lecturer with id: ${id}`);
    return { message: `Lecturer with id ${id} was successfully deleted` };
  }
}
