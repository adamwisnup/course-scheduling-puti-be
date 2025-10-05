import { Room } from "src/schemas/rooms.schema";

export interface IRoomQueryRepository {
  findById(id: string): Promise<Room | null>;
  findAll(): Promise<Room[]>;
  findByRoomCode(room_code: string): Promise<Room | null>;
  findWithPagination(limit: number, offset: number): Promise<[Room[], number]>;
}