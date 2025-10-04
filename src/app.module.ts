import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './configs/db.config';
import { StudentModule } from './modules/students/student.module';
import { LecturerModule } from './modules/lecturers/lecturer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(config),
    StudentModule,
    LecturerModule,
  ],
})
export class AppModule {}
