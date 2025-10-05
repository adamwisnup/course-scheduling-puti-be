import { Lecturer } from "src/schemas/lecturers.schema";

export interface ILecturerQueryRepository {
  findById(id: string): Promise<Lecturer | null>;
  findByEmail(email: string): Promise<Lecturer | null>;
  findAll(): Promise<Lecturer[]>;
  findWithPagination(limit: number, offset: number): Promise<[Lecturer[], number]>;
}