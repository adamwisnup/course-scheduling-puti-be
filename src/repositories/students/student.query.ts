import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "../../schemas/students.schema";
import { IStudentQueryRepository } from "../interfaces/student/student.query.interface";

@Injectable()
export class StudentQueryRepository implements IStudentQueryRepository {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>
  ) {}
  async findWithPagination(limit: number, offset: number): Promise<[Student[], number]> {
    return this.studentRepo.findAndCount({
      skip: offset,
      take: limit,
      order: { created_at: 'DESC' },
    });
  }

  async findById(id: string): Promise<Student | null> {
    return this.studentRepo.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<Student | null> {
    return this.studentRepo.findOneBy({ email });
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepo.find();
  }
}
