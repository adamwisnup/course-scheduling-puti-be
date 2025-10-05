import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './configs/db.config';
import { StudentModule } from './modules/students/student.module';
import { LecturerModule } from './modules/lecturers/lecturer.module';
import { CourseModule } from './modules/courses/course.module';
import { RoomModule } from './modules/rooms/room.module';
import { ScheduleModule } from './modules/schedules/schedule.module';
import { EnrollmentModule } from './modules/enrollments/enrollment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(config),
    StudentModule,
    LecturerModule,
    CourseModule,
    RoomModule,
    ScheduleModule,
    EnrollmentModule,
  ],
})
export class AppModule {}
