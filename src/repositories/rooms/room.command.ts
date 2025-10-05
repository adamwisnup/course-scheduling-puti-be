import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoomCommandRepository } from '../interfaces/rooms/room.command.interface';
import { Room } from 'src/schemas/rooms.schema';

@Injectable()
export class RoomCommandRepository implements IRoomCommandRepository {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(room: Partial<Room>): Promise<Room> {
    const newRoom = this.roomRepository.create(room);
    return this.roomRepository.save(newRoom);
  }

  async update(id: string, room: Partial<Room>): Promise<Room> {
    await this.roomRepository.update(id, room);
    const updatedRoom = await this.roomRepository.findOneBy({ id });
    if (!updatedRoom) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
    return updatedRoom;
  }

  async delete(id: string): Promise<void> {
    const existingRoom = await this.roomRepository.findOneBy({ id });
    if (!existingRoom) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
    await this.roomRepository.delete(id);
  }
}