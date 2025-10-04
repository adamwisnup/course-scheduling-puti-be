import { Injectable } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { CourseCommandRepository } from 'src/repositories/courses/course.command';

@Injectable()
export class DeleteByIdCourseService {
  private readonly logger = new AppLogger(DeleteByIdCourseService.name);

  constructor(
    private readonly courseCommandRepo: CourseCommandRepository,
  ) {}

  async execute(id: string) {
    this.logger.log(`START: Attempting to delete course with id: ${id}`);

    const deleted = await this.courseCommandRepo.delete(id);

    this.logger.log(`SUCCESS: Course with id ${id} successfully deleted`);
    return { message: `Course with id ${id} was successfully deleted` };
  }
}