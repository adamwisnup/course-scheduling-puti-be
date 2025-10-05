import { Schedule } from "src/schemas/schedules.schema";

export interface IScheduleCommandRepository {
  create(lecturer: Partial<Schedule>): Promise<Schedule>;
  update(id: string, schedule: Partial<Schedule>): Promise<Schedule>;
  delete(id: string): Promise<void>;
}
