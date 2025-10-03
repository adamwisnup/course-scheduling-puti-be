import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateLecturerDto {
  @ApiProperty({
    description: 'Nomor Induk Pegawai (NIP) dosen',
    example: '1987654321',
  })
  @IsNotEmpty()
  @IsString()
  nip: string;

  @ApiProperty({
    description: 'Nama lengkap dosen',
    example: 'Dr. Andi Saputra',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email dosen',
    example: 'andi.saputra@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Fakultas tempat dosen mengajar',
    example: 'Fakultas Teknik',
  })
  @IsNotEmpty()
  @IsString()
  faculty: string;

  @ApiProperty({
    description: 'Spesialisasi atau bidang keahlian dosen',
    example: 'Kecerdasan Buatan',
  })
  @IsNotEmpty()
  @IsString()
  specialist: string;

  @ApiProperty({
    description: 'Nomor telepon dosen',
    example: '081298765432',
  })
  @IsString()
  phone_number: string;
}