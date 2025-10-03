import { StudentQueryRepository } from './../../../repositories/students/student.query';
import { Injectable } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { defaultPaginator, generatePaginator } from 'src/utils/paginator';

@Injectable()
export class GetAllStudentsService {
  private readonly logger = new AppLogger(GetAllStudentsService.name);

  constructor(
    private readonly studentQueryRepo: StudentQueryRepository,
  ) {}

  async execute(params: any) {
    const { page, limit, offset } = defaultPaginator(params);
    const [data, total] = await this.studentQueryRepo.findWithPagination(limit, offset);

    return {
      data,
      meta: generatePaginator(page, limit, total),
    };
  }
}