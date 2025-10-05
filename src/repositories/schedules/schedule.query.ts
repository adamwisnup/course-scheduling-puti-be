import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOptionsWhere } from "typeorm";
import { Schedule } from "src/schemas/schedules.schema";
import { IScheduleQueryRepository } from "../interfaces/schedules/schedule.query.interface";

@Injectable()
export class ScheduleQueryRepository implements IScheduleQueryRepository {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async findById(id: string): Promise<Schedule | null> {
    return this.scheduleRepo.findOne({
      where: { id },
      relations: ['course', 'lecturer', 'room'],
    });
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepo.find({
      relations: ['course', 'lecturer', 'room'],
      order: { created_at: 'DESC' },
    });
  }

  async findWithPagination(limit: number, offset: number): Promise<[Schedule[], number]> {
    return this.scheduleRepo.findAndCount({
      skip: offset,
      take: limit,
      order: { created_at: 'DESC' },
      relations: ['course', 'lecturer', 'room'],
    });
  }

  async findByCourseId(courseId: string): Promise<Schedule[]> {
    return this.scheduleRepo.find({
      where: { course: { id: courseId } },
      relations: ['course', 'lecturer', 'room'],
    });
  }

  async findByLecturerId(lecturerId: string): Promise<Schedule[]> {
    return this.scheduleRepo.find({
      where: { lecturer: { id: lecturerId } },
      relations: ['course', 'lecturer', 'room'],
    });
  }

  async findByRoomId(roomId: string): Promise<Schedule[]> {
    return this.scheduleRepo.find({
      where: { room: { id: roomId } },
      relations: ['course', 'lecturer', 'room'],
    });
  }

  async search(params: {
    id?: string;
    course_id?: string;
    lecturer_id?: string;
    room_id?: string;
    limit?: number;
    offset?: number;
  }): Promise<[Schedule[], number]> {
    const { id, course_id, lecturer_id, room_id, limit = 20, offset = 0 } = params;

    const where: FindOptionsWhere<Schedule> = {};

    if (id) where.id = id;
    if (course_id) where.course = { id: course_id };
    if (lecturer_id) where.lecturer = { id: lecturer_id };
    if (room_id) where.room = { id: room_id };

    return this.scheduleRepo.findAndCount({
      where,
      skip: offset,
      take: limit,
      order: { created_at: 'DESC' },
      relations: ['course', 'lecturer', 'room'],
    });
  }
}
