import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { LecturerQueryRepository } from 'src/repositories/lecturers/lecturer.query';

@Injectable()
export class GetByIdLecturerService {
  private readonly logger = new AppLogger(GetByIdLecturerService.name);

  constructor(
    private readonly lecturerQueryRepo: LecturerQueryRepository,
  ) {}

  async execute(id: string) {
    this.logger.log(`Fetching lecturer with id: ${id}`);

    const lecturer = await this.lecturerQueryRepo.findById(id);

    if (!lecturer) {
      this.logger.warn(`Lecturer with id ${id} not found`);
      throw new NotFoundException(`Lecturer with id ${id} was not found`);
    }

    this.logger.log(`Successfully retrieved lecturer with id: ${id}`);
    return lecturer;
  }
}
