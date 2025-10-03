import { Injectable } from "@nestjs/common";
import { Lecturer } from "src/schemas/lecturers.schema";
import { Repository } from "typeorm";
import { ILecturerQueryRepository } from "../interfaces/lecturers/lecturer.query.interface";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class LecturerQueryRepository implements ILecturerQueryRepository {
  constructor(
    @InjectRepository(Lecturer)
    private readonly lecturerRepo: Repository<Lecturer>
  ) {}
  async findWithPagination(limit: number, offset: number): Promise<[Lecturer[], number]> {
    return this.lecturerRepo.findAndCount({
      skip: offset,
      take: limit,
      order: { created_at: 'DESC' },
    });
  }

  async findById(id: string): Promise<Lecturer | null> {
    return this.lecturerRepo.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<Lecturer | null> {
    return this.lecturerRepo.findOneBy({ email });
  }

  async findAll(): Promise<Lecturer[]> {
    return this.lecturerRepo.find();
  }
}