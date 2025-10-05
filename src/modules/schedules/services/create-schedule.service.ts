import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ScheduleCommandRepository } from 'src/repositories/schedules/schedule.command';
import { AppLogger } from 'src/utils/logger';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { Schedule } from 'src/schemas/schedules.schema';

@Injectable()
export class CreateScheduleService {
  private readonly logger = new AppLogger(CreateScheduleService.name);

  constructor(
    private readonly scheduleCommandRepo: ScheduleCommandRepository,
  ) {}

  async execute(dto: CreateScheduleDto): Promise<Schedule> {
    this.logger.log(`START: Creating schedule for course_id: ${dto.course_id}`);

    try {
      const schedule = await this.scheduleCommandRepo.create(dto);

      this.logger.log(
        `SUCCESS: Schedule created successfully. ID: ${schedule.id}, Course ID: ${schedule.course?.id ?? dto.course_id}`,
      );

      return schedule;
    } catch (error) {
      this.logger.error(
        `ERROR: Failed to create schedule for course_id: ${dto.course_id}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to create schedule');
    }
  }
}