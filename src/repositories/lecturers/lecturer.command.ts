import { Injectable } from "@nestjs/common";
import { ILecturerCommandRepository } from "../interfaces/lecturers/lecturer.command.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Lecturer } from "src/schemas/lecturers.schema";
import { Repository } from "typeorm";

@Injectable()
export class LecturerCommandRepository implements ILecturerCommandRepository {
  constructor(
    @InjectRepository(Lecturer)
    private readonly lecturerRepository: Repository<Lecturer>
  ) {}

  async create(lecturer: Partial<Lecturer>): Promise<Lecturer> {
    const newLecturer = this.lecturerRepository.create(lecturer);
    return this.lecturerRepository.save(newLecturer);
  }

  async update(id: string, lecturer: Partial<Lecturer>): Promise<Lecturer> {
    await this.lecturerRepository.update(id, lecturer);
    const updatedLecturer = await this.lecturerRepository.findOneBy({ id });
    if (!updatedLecturer) {
      throw new Error(`Lecturer with id ${id} not found.`);
    }
    return updatedLecturer;
  }

  async delete(id: string): Promise<void> {
    const findById = await this.lecturerRepository.findOneBy({ id });
    if (!findById) {
      throw new Error(`Lecturer with id ${id} not found.`);
    }
    await this.lecturerRepository.delete(id);
  }
}