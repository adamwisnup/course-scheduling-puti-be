import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { AppLogger } from "src/utils/logger";
import { CreateCourseDto } from "../dto/create-course.dto";
import { CourseCommandRepository } from "src/repositories/courses/course.command";

@Injectable()
export class CreateCourseService {
  private readonly logger = new AppLogger(CreateCourseService.name);

  constructor(
    private readonly courseCommandRepo: CourseCommandRepository,
  ) {}

  async execute(dto: CreateCourseDto) {
    this.logger.log(`Starting course creation with code: ${dto.course_code}`);

    try {
      const course = await this.courseCommandRepo.create(dto);
      this.logger.log(`Course created successfully. ID: ${course.id}, Name: ${course.course_name}`);
      return course;
    } catch (error) {
      this.logger.error(
        `Failed to create course with code: ${dto.course_code}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to create course');
    }
  }
}
