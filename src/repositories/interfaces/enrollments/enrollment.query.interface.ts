import { Enrollment } from "src/schemas/enrollments.schema";


export interface IEnrollmentQueryRepository {
  findById(id: string): Promise<Enrollment | null>;
  findAll(): Promise<Enrollment[]>;
  findWithPagination(limit: number, offset: number): Promise<[Enrollment[], number]>;
  findByStudenIdtId(studentId: string): Promise<Enrollment[]>;
  findByScheduleId(scheduleId: string): Promise<Enrollment[]>;
}