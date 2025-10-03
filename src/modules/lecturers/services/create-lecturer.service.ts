import { Injectable } from "@nestjs/common";
import { LecturerCommandRepository } from "src/repositories/lecturers/lecturer.command";
import { AppLogger } from "src/utils/logger";
import { CreateLecturerDto } from "../dto/create-lecturer.dto";

@Injectable()
export class CreateLecturerService {
  private readonly logger = new AppLogger(CreateLecturerService.name);

  constructor(
    private readonly lecturerCommandRepo: LecturerCommandRepository,
  ) {}

  async execute(dto: CreateLecturerDto) {
    const lecturer = await this.lecturerCommandRepo.create(dto);
    this.logger.log('Lecturer created', lecturer);
    return lecturer;
  }
}