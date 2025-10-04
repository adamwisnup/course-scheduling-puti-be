import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { CourseCommandRepository } from 'src/repositories/courses/course.command';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class UpdateByIdCourseService {
  private readonly logger = new AppLogger(UpdateByIdCourseService.name);

  constructor(
    private readonly courseCommandRepo: CourseCommandRepository,
  ) {}

  async execute(id: string, dto: UpdateCourseDto) {
    this.logger.log(`START: Attempting to update course with id: ${id}`, { dto });

    const updated = await this.courseCommandRepo.update(id, dto);

    if (!updated) {
      this.logger.warn(`NOT_FOUND: Course with id ${id} was not found`);
      throw new NotFoundException(`Course with id ${id} was not found`);
    }

    this.logger.log(`SUCCESS: Course with id ${id} successfully updated`, { updated });
    return updated;
  }
}
