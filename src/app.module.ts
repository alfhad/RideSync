import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminRequestModule } from './admin-request/admin-request.module';
import { PrimsaModule } from './prisma/prisma.module';
import { RideModule } from './ride/ride.module';

@Module({
  imports: [UserModule, AdminRequestModule, PrimsaModule, RideModule],
})
export class AppModule { }
