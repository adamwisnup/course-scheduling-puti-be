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
import { CourseCommandRepository } from './courses/course.command';
import { CourseQueryRepository } from './courses/course.query';
import { RoomCommandRepository } from './rooms/room.command';
import { RoomQueryRepository } from './rooms/room.query';

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
    CourseCommandRepository,
    CourseQueryRepository,
    RoomCommandRepository,
    RoomQueryRepository,
  ],
  exports: [
    StudentCommandRepository,
    StudentQueryRepository,
    LecturerCommandRepository,
    LecturerQueryRepository,
    CourseCommandRepository,
    CourseQueryRepository,
    RoomCommandRepository,
    RoomQueryRepository,
    TypeOrmModule,
  ],
})
export class RepositoryModule {}
