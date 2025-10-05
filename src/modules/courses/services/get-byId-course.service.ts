import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { CourseQueryRepository } from 'src/repositories/courses/course.query';

@Injectable()
export class GetByIdCourseService {
  private readonly logger = new AppLogger(GetByIdCourseService.name);

  constructor(
    private readonly courseQueryRepo: CourseQueryRepository,
  ) {}

  async execute(id: string) {
    this.logger.log(`Fetching course with id: ${id}`);

    const course = await this.courseQueryRepo.findById(id);

    if (!course) {
      this.logger.warn(`Course with id ${id} not found`);
      throw new NotFoundException(`Course with id ${id} was not found`);
    }

    this.logger.log(`Successfully retrieved course with id: ${id}`);
    return course;
  }
}