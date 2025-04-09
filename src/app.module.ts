import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminRequestModule } from './admin-request/admin-request.module';
import { PrimsaModule } from './prisma/prisma.module';
import { RideModule } from './ride/ride.module';
import { RideRequestModule } from './ride-request/ride-request.module';

@Module({
  imports: [UserModule, AdminRequestModule, PrimsaModule, RideModule, RideRequestModule],
})
export class AppModule { }
