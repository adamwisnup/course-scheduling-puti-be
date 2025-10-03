import { Student } from "../../../schemas/students.schema";

export interface IStudentQueryRepository {
  findById(id: string): Promise<Student | null>;
  findByEmail(email: string): Promise<Student | null>;
  findAll(): Promise<Student[]>;
}
