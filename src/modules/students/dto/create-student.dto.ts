import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Nomor Induk Mahasiswa',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  nim: string;

  @ApiProperty({
    description: 'Nama lengkap mahasiswa',
    example: 'Budi Santoso',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email mahasiswa',
    example: 'budi.santoso@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Jurusan mahasiswa',
    example: 'Teknik Informatika',
  })
  @IsNotEmpty()
  @IsString()
  major: string;

  @ApiProperty({
    description: 'Semester mahasiswa',
    example: 5,
  })
  @IsInt()
  semester: number;

  @ApiProperty({
    description: 'Nomor telepon mahasiswa',
    example: '081234567890',
    required: false,
  })
  @IsString()
  phone_number: string;
}