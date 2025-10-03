import { StudentQueryRepository } from './../../../repositories/students/student.query';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';

@Injectable()
export class GetByEmailStudentsService {
  private readonly logger = new AppLogger(GetByEmailStudentsService.name);

  constructor(
    private readonly studentQueryRepo: StudentQueryRepository,
  ) {}

  async execute(email: string) {
    const student = await this.studentQueryRepo.findByEmail(email);
    if (!student) {
      throw new NotFoundException(`Mahasiswa dengan email ${email} tidak ditemukan`);
    }
    return student;
  }
}