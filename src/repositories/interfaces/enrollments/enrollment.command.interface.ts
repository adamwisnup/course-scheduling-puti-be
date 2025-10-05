import { Enrollment } from "src/schemas/enrollments.schema";

export interface IEnrollmentCommandRepository {
  create(enrollment: Partial<Enrollment>): Promise<Enrollment>;
  update(id: string, enrollment: Partial<Enrollment>): Promise<Enrollment>;
  delete(id: string): Promise<void>;
}