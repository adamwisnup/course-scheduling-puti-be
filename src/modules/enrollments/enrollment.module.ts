import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repositories/repository.module';
import { EnrollmentController } from './controllers/enrollment.controller';
import { CreateEnrollmentService } from './services/create-enrollment.service';
import { GetAllEnrollmentService } from './services/get-all-enrollment.service';
import { GetByIdEnrollmentService } from './services/get-byId-enrollment.service';
import { GetByStudentIdEnrollmentService } from './services/get-byStudentId-enrollment.service';
import { GetByScheduleIdEnrollmentService } from './services/get-byScheduleId-enrollment.service';
import { UpdateByIdEnrollmentService } from './services/update-byId-enrollment.service';
import { DeleteByIdEnrollmentService } from './services/delete-byId-enrollment.service';

@Module({
  imports: [RepositoryModule],
  controllers: [EnrollmentController],
  providers: [
    CreateEnrollmentService,
    GetAllEnrollmentService,
    GetByIdEnrollmentService,
    GetByStudentIdEnrollmentService,
    GetByScheduleIdEnrollmentService,
    UpdateByIdEnrollmentService,
    DeleteByIdEnrollmentService,
  ],
})
export class EnrollmentModule {}
