import { Module } from '@nestjs/common';
import { AdminRequestService } from './admin-request.service';
import { AdminRequestController } from './admin-request.controller';

@Module({
  imports: [],
  providers: [AdminRequestService],
  controllers: [AdminRequestController]
})
export class AdminRequestModule {}
