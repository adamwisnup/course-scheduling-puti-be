import { Student } from "../../../schemas/students.schema";

export interface IStudentCommandRepository {
  create(student: Partial<Student>): Promise<Student>;
  update(id: string, student: Partial<Student>): Promise<Student>;
  delete(id: string): Promise<void>;
}
