import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IRoomQueryRepository } from "../interfaces/rooms/room.query.interface";
import { Room } from "src/schemas/rooms.schema";


@Injectable()
export class RoomQueryRepository implements IRoomQueryRepository {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>
  ) {}
  async findWithPagination(limit: number, offset: number): Promise<[Room[], number]> {
    return this.roomRepo.findAndCount({
      skip: offset,
      take: limit,
      order: { created_at: 'DESC' },
    });
  }

  async findById(id: string): Promise<Room | null> {
    return this.roomRepo.findOneBy({ id });
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepo.find();
  }

  async findByRoomCode(room_code: string): Promise<Room | null> {
    return this.roomRepo.findOneBy({ room_code });
  }
}