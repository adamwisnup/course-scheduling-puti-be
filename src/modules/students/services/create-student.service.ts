import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentCommandRepository } from '../../../repositories/students/student.command';
import { AppLogger } from '../../../utils/logger';
import { CreateStudentDto } from '../dto/create-student.dto';

@Injectable()
export class CreateStudentsService {
  private readonly logger = new AppLogger(CreateStudentsService.name);

  constructor(
    private readonly studentCommandRepo: StudentCommandRepository,
  ) {}

  async execute(dto: CreateStudentDto) {
    const student = await this.studentCommandRepo.create(dto);
    this.logger.log('Student created', student);
    return student;
  }
}
