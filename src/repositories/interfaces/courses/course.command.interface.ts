import { Course } from "src/schemas/courses.schema";

export interface ICourseCommandRepository {
  create(course: Partial<Course>): Promise<Course>;
  update(id: string, course: Partial<Course>): Promise<Course>;
  delete(id: string): Promise<void>;
}
