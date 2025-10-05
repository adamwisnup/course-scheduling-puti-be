import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repositories/repository.module';
import { ScheduleController } from './controllers/schedule.controller';
import { CreateScheduleService } from './services/create-schedule.service';
import { GetAllScheduleService } from './services/get-all-schedule.service';
import { GetByIdScheduleService } from './services/get-byId-schedule.service';
import { GetByCourseIdScheduleService } from './services/get-byCourseId-schedule.service';
import { GetByLecturerIdScheduleService } from './services/get-bylecturerId-schedule.service';
import { GetByRoomIdScheduleService } from './services/get-byRoomId-schedule.service';
import { SearchScheduleService } from './services/search-schedule.service';
import { UpdateByIdScheduleService } from './services/update-byId-schedule.service';
import { DeleteByIdScheduleService } from './services/delete-byId-schedule.service';

@Module({
  imports: [RepositoryModule],
  controllers: [ScheduleController],
  providers: [
    CreateScheduleService,
    GetAllScheduleService,
    GetByIdScheduleService,
    GetByCourseIdScheduleService,
    GetByLecturerIdScheduleService,
    GetByRoomIdScheduleService,
    SearchScheduleService,
    UpdateByIdScheduleService,
    DeleteByIdScheduleService,
  ],
})
export class ScheduleModule {}
