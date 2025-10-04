import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { CreateStudentsService } from './services/create-student.service';
import { GetAllStudentsService } from './services/get-all-student.service';
import { GetByIdStudentsService } from './services/get-byId.service';
import { UpdateByIdStudentsService } from './services/update-byId-student.service';
import { DeleteByIdStudentsService } from './services/delete-byId-student.service';
import { RepositoryModule } from '../../repositories/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [StudentController],
  providers: [
    CreateStudentsService,
    GetAllStudentsService,
    GetByIdStudentsService,
    UpdateByIdStudentsService,
    DeleteByIdStudentsService,
  ],
})
export class StudentModule {}
