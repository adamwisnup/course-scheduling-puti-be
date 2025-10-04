import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repositories/repository.module';
import { RoomController } from './controllers/room.controller';
import { CreateRoomService } from './services/create-room.service';
import { GetAllRoomService } from './services/get-all-room.service';
import { GetByIdRoomService } from './services/get-byId-room.service';
import { GetByRoomCodeRoomService } from './services/get-byRoomCode-room.service';
import { UpdateByIdRoomService } from './services/update-byId-room.service';
import { DeleteByIdRoomService } from './services/delete-byId-room.service';

@Module({
  imports: [RepositoryModule],
  controllers: [RoomController],
  providers: [
    CreateRoomService,
    GetAllRoomService,
    GetByIdRoomService,
    GetByRoomCodeRoomService,
    UpdateByIdRoomService,
    DeleteByIdRoomService,
  ],
})
export class RoomModule {}
