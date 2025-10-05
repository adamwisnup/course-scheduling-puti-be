import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { ScheduleCommandRepository } from 'src/repositories/schedules/schedule.command';

@Injectable()
export class DeleteByIdScheduleService {
  private readonly logger = new AppLogger(DeleteByIdScheduleService.name);

  constructor(
    private readonly scheduleCommandRepo: ScheduleCommandRepository,
  ) {}

  async execute(id: string): Promise<{ message: string }> {
    this.logger.log(`START: Attempting to delete schedule with id: ${id}`);

    try {
      await this.scheduleCommandRepo.delete(id);

      this.logger.log(`SUCCESS: Schedule with id ${id} successfully deleted`);
      return { message: `Schedule with id ${id} was successfully deleted` };
    } catch (error) {
      this.logger.error(`ERROR: Failed to delete schedule with id: ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to delete schedule');
    }
  }
}