import { Course } from "src/schemas/courses.schema";

 export interface ICourseQueryRepository {
  findById(id: string): Promise<Course | null>;
  findAll(): Promise<Course[]>;
  findByCourseCode(course_code: string): Promise<Course | null>;
}