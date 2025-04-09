import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

// Run this query manually in mongo shell to create index for geolocation querying
// db.Ride.createIndex({ startLocation: "2dsphere" });
// db.Ride.createIndex({ endLocation: "2dsphere" });
