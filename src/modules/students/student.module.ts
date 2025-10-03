import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './controllers/student.controller';
import { CreateStudentsService } from './services/create-student.service';
import { GetAllStudentsService } from './services/get-all-student.service';
import { GetByIdStudentsService } from './services/get-byId.service';
import { UpdateByIdStudentsService } from './services/update-byId-student.service';
import { DeleteByIdStudentsService } from './services/delete-byId-student.service';
import { Student } from '../../schemas/students.schema';
import { StudentCommandRepository } from '../../repositories/students/student.command';
import { StudentQueryRepository } from '../../repositories/students/student.query';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [
    CreateStudentsService,
    GetAllStudentsService,
    GetByIdStudentsService,
    UpdateByIdStudentsService,
    DeleteByIdStudentsService,
    StudentCommandRepository,
    StudentQueryRepository,
  ],
  exports: [TypeOrmModule],
})
export class StudentModule {}
