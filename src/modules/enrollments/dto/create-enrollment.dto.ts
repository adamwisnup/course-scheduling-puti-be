import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID, IsString, IsNumber, IsIn } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({
    description: 'ID student yang melakukan pendaftaran',
    example: 'd2f8c3a1-4567-4b9d-8e12-a9f3b7d1c234',
  })
  @IsNotEmpty()
  @IsUUID()
  student_id: string;

  @ApiProperty({
    description: 'ID schedule yang diambil oleh student',
    example: 'e3a9b6d4-7890-4c5a-9d12-bd8a76d93e11',
  })
  @IsNotEmpty()
  @IsUUID()
  schedule_id: string;

  @ApiProperty({
    description: 'Status pendaftaran (misal: aktif, batal, selesai)',
    example: 'aktif',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['aktif', 'batal', 'selesai'], {
    message: 'status harus salah satu dari: aktif, batal, selesai',
  })
  status?: string;

  @ApiProperty({
    description: 'Nilai akhir yang diperoleh student (jika tersedia)',
    example: 85.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  grade?: number;
}