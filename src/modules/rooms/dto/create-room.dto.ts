import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Unique code identifying the room',
    example: 'R101',
  })
  @IsNotEmpty()
  @IsString()
  room_code: string;

  @ApiProperty({
    description: 'Name of the room',
    example: 'Computer Laboratory 1',
  })
  @IsNotEmpty()
  @IsString()
  room_name: string;

  @ApiProperty({
    description: 'Maximum capacity of the room',
    example: 40,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty({
    description: 'Building where the room is located',
    example: 'Engineering Building A',
  })
  @IsNotEmpty()
  @IsString()
  building: string;

  @ApiProperty({
    description: 'Available facilities in the room (optional)',
    example: 'Projector, Air Conditioner, Whiteboard',
    required: false,
  })
  @IsOptional()
  @IsString()
  facility?: string;
}