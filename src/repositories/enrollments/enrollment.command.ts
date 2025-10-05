import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from 'src/schemas/schedules.schema';
import { Course } from 'src/schemas/courses.schema';
import { Lecturer } from 'src/schemas/lecturers.schema';
import { Room } from 'src/schemas/rooms.schema';
import { IEnrollmentCommandRepository } from '../interfaces/enrollments/enrollment.command.interface';
import { Enrollment } from 'src/schemas/enrollments.schema';
import { CreateEnrollmentDto } from 'src/modules/enrollments/dto/create-enrollment.dto';
import { Student } from 'src/schemas/students.schema';

@Injectable()
export class EnrollmentCommandRepository implements IEnrollmentCommandRepository {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepo: Repository<Enrollment>,
  ) {}

  async create(dto: CreateEnrollmentDto): Promise<Enrollment> {
    const newSchedule = this.enrollmentRepo.create({
      student: dto.student_id ? ({ id: dto.student_id } as any) : undefined,
      schedule: dto.schedule_id ? ({ id: dto.schedule_id } as Schedule) : undefined,
      status: dto.status,
      grade: dto.grade,
    });

    return this.enrollmentRepo.save(newSchedule);
  }

  async update(id: string, data: Partial<Enrollment>): Promise<Enrollment> {
    const existingSchedule = await this.enrollmentRepo.findOne({
      where: { id },
    });

    if (!existingSchedule) {
      throw new NotFoundException(`Schedule with ID ${id} was not found`);
    }

    if (data['student_id'])
      (existingSchedule as any).student = { id: data['student_id'] } as Student;
    if (data['schedule_id'])
      (existingSchedule as any).schedule = { id: data['schedule_id'] } as Schedule;

    Object.assign(existingSchedule, data);
    return this.enrollmentRepo.save(existingSchedule);
  }

  async delete(id: string): Promise<void> {
    const existingSchedule = await this.enrollmentRepo.findOneBy({ id });
    if (!existingSchedule) {
      throw new NotFoundException(`Schedule with ID ${id} was not found`);
    }
    await this.enrollmentRepo.delete(id);
  }
}