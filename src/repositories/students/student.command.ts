import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "../../schemas/students.schema";
import { IStudentCommandRepository } from "../interfaces/student/student.command.interface";

@Injectable()
export class StudentCommandRepository implements IStudentCommandRepository {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {}

  async create(student: Partial<Student>): Promise<Student> {
    const newStudent = this.studentRepository.create(student);
    return this.studentRepository.save(newStudent);
  }

  async update(id: string, student: Partial<Student>): Promise<Student> {
    await this.studentRepository.update(id, student);
    const updatedStudent = await this.studentRepository.findOneBy({ id });
    if (!updatedStudent) {
      throw new Error(`Student with id ${id} not found.`);
    }
    return updatedStudent;
  }

  async delete(id: string): Promise<void> {
    const findById = await this.studentRepository.findOneBy({ id });
    if (!findById) {
      throw new Error(`Student with id ${id} not found.`);
    }
    await this.studentRepository.delete(id);
  }
}
