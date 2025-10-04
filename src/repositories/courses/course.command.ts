import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ICourseCommandRepository } from "../interfaces/courses/course.command.interface";
import { Course } from "src/schemas/courses.schema";

@Injectable()
export class CourseCommandRepository implements ICourseCommandRepository {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) {}

  async create(course: Partial<Course>): Promise<Course> {
    const newCourse = this.courseRepository.create(course);
    return this.courseRepository.save(newCourse);
  }

  async update(id: string, course: Partial<Course>): Promise<Course> {
    await this.courseRepository.update(id, course);
    const updatedCourse = await this.courseRepository.findOneBy({ id });
    if (!updatedCourse) {
      throw new Error(`Course with id ${id} not found.`);
    }
    return updatedCourse;
  }

  async delete(id: string): Promise<void> {
    const findById = await this.courseRepository.findOneBy({ id });
    if (!findById) {
      throw new Error(`Lecturer with id ${id} not found.`);
    }
    await this.courseRepository.delete(id);
  }
}