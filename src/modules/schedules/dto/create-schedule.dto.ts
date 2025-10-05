import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, Min, Matches } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty({
    description: 'ID course yang diambil dari tabel courses',
    example: 'a3e8b5d2-1234-4c5a-9d12-bd8a76d93e11',
  })
  @IsNotEmpty()
  @IsString()
  course_id: string;

  @ApiProperty({
    description: 'ID lecturer yang mengajar pada jadwal ini',
    example: 'b7e2a4f1-5678-4a9b-8c34-f9e73d1a7a44',
  })
  @IsOptional()
  @IsString()
  lecturer_id?: string;

  @ApiProperty({
    description: 'ID room tempat jadwal dilaksanakan',
    example: 'c1f3b6e8-7890-4d4c-9a12-c8e92a6e5d77',
  })
  @IsOptional()
  @IsString()
  room_id?: string;

  @ApiProperty({
    description: 'Hari pelaksanaan jadwal (misal: Monday, Tuesday, dll)',
    example: 'Monday',
  })
  @IsNotEmpty()
  @IsString()
  day: string;

  @ApiProperty({
    description: 'Waktu mulai jadwal (format 24 jam: HH:mm)',
    example: '08:00',
  })
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'start_time harus dalam format HH:mm (24 jam)',
  })
  start_time: string;

  @ApiProperty({
    description: 'Waktu selesai jadwal (format 24 jam: HH:mm)',
    example: '10:00',
  })
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'end_time harus dalam format HH:mm (24 jam)',
  })
  end_time: string;

  @ApiProperty({
    description: 'Kuota maksimal peserta pada jadwal ini',
    example: 40,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quota: number;

  @ApiProperty({
    description: 'Nama kelas (misal: A, B, C, atau nama kelas khusus)',
    example: 'A',
  })
  @IsNotEmpty()
  @IsString()
  class_name: string;

  @ApiProperty({
    description: 'Tahun akademik (misal: 2025/2026)',
    example: '2025/2026',
  })
  @IsNotEmpty()
  @IsString()
  academic_year: string;

  @ApiProperty({
    description: 'Semester pelaksanaan (misal: Ganjil/Genap atau angka 1/2)',
    example: 'Ganjil',
  })
  @IsNotEmpty()
  @IsString()
  semester: string;
}