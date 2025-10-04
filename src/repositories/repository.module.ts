import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../schemas/students.schema';
import { Lecturer } from '../schemas/lecturers.schema';
import { Course } from '../schemas/courses.schema';
import { Room } from '../schemas/rooms.schema';
import { Schedule } from '../schemas/schedules.schema';
import { Enrollment } from '../schemas/enrollments.schema';
import { StudentCommandRepository } from './students/student.command';
import { StudentQueryRepository } from './students/student.query';
import { LecturerCommandRepository } from './lecturers/lecturer.command';
import { LecturerQueryRepository } from './lecturers/lecturer.query';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      Lecturer,
      Course,
      Room,
      Schedule,
      Enrollment,
    ]),
  ],
  providers: [
    StudentCommandRepository,
    StudentQueryRepository,
    LecturerCommandRepository,
    LecturerQueryRepository,
  ],
  exports: [
    StudentCommandRepository,
    StudentQueryRepository,
    LecturerCommandRepository,
    LecturerQueryRepository,
    TypeOrmModule,
  ],
})
export class RepositoryModule {}
