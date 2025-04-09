import { HttpException, Injectable } from '@nestjs/common';
import { CreateRideRequestDto, GetRideRequestsDto } from '../dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JoinRequestStatus, RideStatus } from '@prisma/client';

@Injectable()
export class RideRequestService {

  constructor(private prismaService: PrismaService) { }

  async createRideRequest(createRideRequestDto: CreateRideRequestDto) {
    try {

      const user = await this.prismaService.user.findUnique({
        where: {
          email: createRideRequestDto.email
        }
      });

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      const ride = await this.prismaService.ride.findUnique({
        where: {
          id: createRideRequestDto.rideId
        }
      });

      if (!ride) {
        throw new HttpException('Ride not found', 404);
      }

      const createdRideRequest = await this.prismaService.rideJoinRequest.create({
        data: {
          userId: user.id,
          rideId: ride.id
        }
      });

      return createdRideRequest;
    } catch (error) {
      throw error;
    }
  }

  async getRideRequests(getRideRequestsDto: GetRideRequestsDto) {
    try {
      const rideRequests = await this.prismaService.rideJoinRequest.findMany({
        where: {
          rideId: getRideRequestsDto.rideId
        }
      });

      return rideRequests;
    } catch (error) {
      throw error;
    }
  }

  async updateRideRequest(rideRequestId: string, status: JoinRequestStatus) {
    try {
      const rideRequest = await this.prismaService.rideJoinRequest.findUnique({
        where: {
          id: rideRequestId
        }
      });

      if (!rideRequest) {
        throw new HttpException('Ride request not found', 404);
      }

      const updatedRideRequest = await this.prismaService.rideJoinRequest.update({
        where: {
          id: rideRequestId
        },
        data: {
          status: status
        }
      });

      return updatedRideRequest;
    } catch (error) {
      throw error;
    }
  }

}
