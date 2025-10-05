import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IScheduleCommandRepository } from '../interfaces/schedules/schedule.command.interface';
import { Schedule } from 'src/schemas/schedules.schema';
import { CreateScheduleDto } from 'src/modules/schedules/dto/create-schedule.dto';
import { Course } from 'src/schemas/courses.schema';
import { Lecturer } from 'src/schemas/lecturers.schema';
import { Room } from 'src/schemas/rooms.schema';

@Injectable()
export class ScheduleCommandRepository implements IScheduleCommandRepository {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async create(dto: CreateScheduleDto): Promise<Schedule> {
    const newSchedule = this.scheduleRepository.create({
      day: dto.day,
      start_time: dto.start_time,
      end_time: dto.end_time,
      quota: dto.quota,
      class_name: dto.class_name,
      academic_year: dto.academic_year,
      semester: dto.semester,
      course: dto.course_id ? ({ id: dto.course_id } as Course) : undefined,
      lecturer: dto.lecturer_id ? ({ id: dto.lecturer_id } as Lecturer) : undefined,
      room: dto.room_id ? ({ id: dto.room_id } as Room) : undefined,
    });

    return this.scheduleRepository.save(newSchedule);
  }

  async update(id: string, data: Partial<Schedule>): Promise<Schedule> {
    const existingSchedule = await this.scheduleRepository.findOne({
      where: { id },
    });

    if (!existingSchedule) {
      throw new NotFoundException(`Schedule with ID ${id} was not found`);
    }

    if (data['course_id'])
      (existingSchedule as any).course = { id: data['course_id'] } as Course;
    if (data['lecturer_id'])
      (existingSchedule as any).lecturer = { id: data['lecturer_id'] } as Lecturer;
    if (data['room_id'])
      (existingSchedule as any).room = { id: data['room_id'] } as Room;

    Object.assign(existingSchedule, data);
    return this.scheduleRepository.save(existingSchedule);
  }

  async delete(id: string): Promise<void> {
    const existingSchedule = await this.scheduleRepository.findOneBy({ id });
    if (!existingSchedule) {
      throw new NotFoundException(`Schedule with ID ${id} was not found`);
    }
    await this.scheduleRepository.delete(id);
  }
}