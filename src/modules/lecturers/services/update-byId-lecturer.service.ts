import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { UpdateLecturerDto } from '../dto/update-lecturer.dto';
import { LecturerCommandRepository } from 'src/repositories/lecturers/lecturer.command';

@Injectable()
export class UpdateByIdLecturerService {
  private readonly logger = new AppLogger(UpdateByIdLecturerService.name);

  constructor(
    private readonly lecturerCommandRepo: LecturerCommandRepository,
  ) {}

  async execute(id: string, dto: UpdateLecturerDto) {
    this.logger.log(`Attempting to update lecturer with id: ${id}`, { dto });

    const updated = await this.lecturerCommandRepo.update(id, dto);

    if (!updated) {
      this.logger.warn(`Lecturer with id ${id} was not found`);
      throw new NotFoundException(`Lecturer with id ${id} was not found`);
    }

    this.logger.log(`Successfully updated lecturer with id: ${id}`, { updated });
    return updated;
  }
}
