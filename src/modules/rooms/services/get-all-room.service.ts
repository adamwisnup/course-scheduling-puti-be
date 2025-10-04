import { Injectable } from '@nestjs/common';
import { AppLogger } from '../../../utils/logger';
import { defaultPaginator, generatePaginator } from 'src/utils/paginator';
import { RoomQueryRepository } from 'src/repositories/rooms/room.query';

@Injectable()
export class GetAllRoomService {
  private readonly logger = new AppLogger(GetAllRoomService.name);

  constructor(
    private readonly roomQueryRepo: RoomQueryRepository,
  ) {}

  async execute(params: any) {
    this.logger.log('Executing GetAllRoomService.execute()');

    const { page, limit, offset } = defaultPaginator(params);
    this.logger.debug(`Pagination -> page=${page}, limit=${limit}, offset=${offset}`);

    try {
      const [data, total] = await this.roomQueryRepo.findWithPagination(limit, offset);
      this.logger.log(`Successfully fetched ${data.length} rooms out of total ${total}`);

      return {
        data,
        meta: generatePaginator(page, limit, total),
      };
    } catch (error) {
      this.logger.error('Failed to fetch rooms', error.stack);
      throw error;
    }
  }
}