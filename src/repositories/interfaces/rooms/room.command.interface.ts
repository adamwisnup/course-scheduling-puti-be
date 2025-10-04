import { Room } from "src/schemas/rooms.schema";

export interface IRoomCommandRepository {
  create(lecturer: Partial<Room>): Promise<Room>;
  update(id: string, room: Partial<Room>): Promise<Room>;
  delete(id: string): Promise<void>;
}
