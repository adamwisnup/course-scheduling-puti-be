import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class SearchScheduleDto {
  @ApiPropertyOptional({ description: 'Schedule ID', example: 'e57b6a83-0e4c-44c9-b2e5-1b6ab4b7e4b2' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({ description: 'Course ID to filter by', example: 'course-123' })
  @IsOptional()
  @IsString()
  course_id?: string;

  @ApiPropertyOptional({ description: 'Lecturer ID to filter by', example: 'lecturer-456' })
  @IsOptional()
  @IsString()
  lecturer_id?: string;

  @ApiPropertyOptional({ description: 'Room ID to filter by', example: 'room-789' })
  @IsOptional()
  @IsString()
  room_id?: string;

  @ApiPropertyOptional({ description: 'Number of results per page', example: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({ description: 'Offset for pagination', example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;
}