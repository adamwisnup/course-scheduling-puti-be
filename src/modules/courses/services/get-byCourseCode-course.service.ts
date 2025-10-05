import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { CourseQueryRepository } from 'src/repositories/courses/course.query';

@Injectable()
export class GetByCourseCodeCourseService {
  private readonly logger = new AppLogger(GetByCourseCodeCourseService.name);

  constructor(
    private readonly courseQueryRepo: CourseQueryRepository,
  ) {}

  async execute(course_code: string) {
    this.logger.log(`START: Fetching course with course_code: ${course_code}`);

    const course = await this.courseQueryRepo.findByCourseCode(course_code);

    if (!course) {
      this.logger.warn(`NOT_FOUND: Course with course_code ${course_code} not found`);
      throw new NotFoundException(`Course with course_code ${course_code} was not found`);
    }

    this.logger.log(`SUCCESS: Successfully retrieved course with course_code: ${course_code}`);
    return course;
  }
}
