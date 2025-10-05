import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { ScheduleCommandRepository } from 'src/repositories/schedules/schedule.command';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';
import { Schedule } from 'src/schemas/schedules.schema';

@Injectable()
export class UpdateByIdScheduleService {
  private readonly logger = new AppLogger(UpdateByIdScheduleService.name);

  constructor(
    private readonly scheduleCommandRepo: ScheduleCommandRepository,
  ) {}

  async execute(id: string, dto: UpdateScheduleDto): Promise<Schedule> {
    this.logger.log(`START: Updating schedule with ID: ${id}`, { payload: dto });

    try {
      const updatedSchedule = await this.scheduleCommandRepo.update(id, dto);

      if (!updatedSchedule) {
        this.logger.warn(`NOT_FOUND: Schedule with ID ${id} was not found`);
        throw new NotFoundException(`Schedule with ID ${id} was not found`);
      }

      this.logger.log(`SUCCESS: Schedule with ID ${id} has been updated successfully`, {
        updated: updatedSchedule,
      });

      return updatedSchedule;
    } catch (error) {
      this.logger.error(
        `ERROR: Failed to update schedule with ID: ${id}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to update schedule');
    }
  }
}