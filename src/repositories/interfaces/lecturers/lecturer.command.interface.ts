import { Lecturer } from "src/schemas/lecturers.schema";

export interface ILecturerCommandRepository {
  create(lecturer: Partial<Lecturer>): Promise<Lecturer>;
  update(id: string, lecturer: Partial<Lecturer>): Promise<Lecturer>;
  delete(id: string): Promise<void>;
}
