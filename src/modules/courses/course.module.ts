import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repositories/repository.module';
import { CourseController } from './controllers/course.controller';
import { CreateCourseService } from './services/create-course.service';
import { GetAllCourseService } from './services/get-all-course.service';
import { GetByIdCourseService } from './services/get-byId-course.service';
import { GetByCourseCodeCourseService } from './services/get-byCourseCode-course.service';
import { UpdateByIdCourseService } from './services/update-byId-course.service';
import { DeleteByIdCourseService } from './services/delete-byId-course.service';

@Module({
  imports: [RepositoryModule],
  controllers: [CourseController],
  providers: [
    CreateCourseService,
    GetAllCourseService,
    GetByIdCourseService,
    GetByCourseCodeCourseService,
    UpdateByIdCourseService,
    DeleteByIdCourseService,
  ],
})
export class CourseModule {}
