import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecturer } from "src/schemas/lecturers.schema";
import { LecturerController } from './controllers/lecturer.controller';
import { CreateLecturerService } from './services/create-lecturer.service';
import { GetAllLecturerService } from './services/get-all-lecturer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lecturer])],
  controllers: [LecturerController],
  providers: [
    CreateLecturerService,
    GetAllLecturerService,
 
  ],
  exports: [TypeOrmModule],
})
export class LecturerModule {}