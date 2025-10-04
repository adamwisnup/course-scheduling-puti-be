import { Injectable } from "@nestjs/common";
import { Lecturer } from "src/schemas/lecturers.schema";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ICourseQueryRepository } from "../interfaces/courses/course.query.interface";
import { Course } from "src/schemas/courses.schema";


@Injectable()
export class CourseQueryRepository implements ICourseQueryRepository {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>
  ) {}
  async findWithPagination(limit: number, offset: number): Promise<[Course[], number]> {
    return this.courseRepo.findAndCount({
      skip: offset,
      take: limit,
      order: { created_at: 'DESC' },
    });
  }

  async findById(id: string): Promise<Course | null> {
    return this.courseRepo.findOneBy({ id });
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepo.find();
  }

  async findByCourseCode(course_code: string): Promise<Course | null> {
    return this.courseRepo.findOneBy({ course_code });
  }
}