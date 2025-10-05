import { Schedule } from "src/schemas/schedules.schema";

export interface IScheduleQueryRepository {
  findById(id: string): Promise<Schedule | null>;
  findAll(): Promise<Schedule[]>;
  findWithPagination(limit: number, offset: number): Promise<[Schedule[], number]>;
  findByCourseId(courseId: string): Promise<Schedule[]>;
  findByLecturerId(lecturerId: string): Promise<Schedule[]>;
  findByRoomId(roomId: string): Promise<Schedule[]>;
  search(params: {
    id?: string;
    course_id?: string;
    lecturer_id?: string;
    room_id?: string;
    limit?: number;
    offset?: number;
  }): Promise<[Schedule[], number]>;
}
