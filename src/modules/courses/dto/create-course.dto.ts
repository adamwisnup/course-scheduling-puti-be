import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Unique course code',
    example: 'CS101',
  })
  @IsNotEmpty()
  @IsString()
  course_code: string;

  @ApiProperty({
    description: 'Course name',
    example: 'Introduction to Computer Science',
  })
  @IsNotEmpty()
  @IsString()
  course_name: string;

  @ApiProperty({
    description: 'Number of credits (SKS)',
    example: 3,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  sks: number;

  @ApiProperty({
    description: 'Course description',
    example: 'Basic concepts of programming and computer science.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Semester when the course is offered',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  semester: number;
}
