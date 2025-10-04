import { Module } from '@nestjs/common';
import { LecturerController } from './controllers/lecturer.controller';
import { CreateLecturerService } from './services/create-lecturer.service';
import { GetAllLecturerService } from './services/get-all-lecturer.service';
import { GetByIdLecturerService } from './services/get-byId-lecturer.service';
import { UpdateByIdLecturerService } from './services/update-byId-lecturer.service';
import { DeleteByIdLecturerService } from './services/delete-byId-lecturer.service';
import { RepositoryModule } from 'src/repositories/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [LecturerController],
  providers: [
    CreateLecturerService,
    GetAllLecturerService,
    GetByIdLecturerService,
    UpdateByIdLecturerService,
    DeleteByIdLecturerService,
  ],
})
export class LecturerModule {}
