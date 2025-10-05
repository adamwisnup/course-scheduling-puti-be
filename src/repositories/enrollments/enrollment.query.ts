import { Enrollment } from './../../schemas/enrollments.schema';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IEnrollmentQueryRepository } from '../interfaces/enrollments/enrollment.query.interface';

@Injectable()
export class EnrollmentQueryRepository implements IEnrollmentQueryRepository {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepo: Repository<Enrollment>,
  ) {}

  async findWithPagination(limit: number, offset: number): Promise<[Enrollment[], number]> {
    return this.enrollmentRepo.findAndCount({
      skip: offset,
      take: limit,
      order: { created_at: 'DESC' },
      relations: ['student', 'schedule'],
    });
  }

  async findById(id: string): Promise<Enrollment | null> {
    return this.enrollmentRepo.findOne({
      where: { id },
      relations: ['student', 'schedule'],
    });
  }

  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepo.find({
      relations: ['student', 'schedule'],
      order: { created_at: 'DESC' },
    });
  }

  async findByStudenIdtId(studentId: string): Promise<Enrollment[]> {
    return this.enrollmentRepo.find({
      where: { student: { id: studentId } },
      relations: ['student', 'schedule'],
    });
  }

  async findByScheduleId(scheduleId: string): Promise<Enrollment[]> {
    return this.enrollmentRepo.find({
      where: { schedule: { id: scheduleId } },
      relations: ['student', 'schedule'],
    });
  }
}
