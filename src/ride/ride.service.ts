import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateRideDto, FindNearbyRidesDto, GetRidesByUserDto, UpdateRideDto } from '../dto';
import { PrismaService } from '../prisma/prisma.service';
import { RideStatus } from '@prisma/client';

@Injectable()
export class RideService {
  constructor(private prismaService: PrismaService) { }

  async createRide(createRideDto: CreateRideDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: createRideDto.email
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const ride = await this.prismaService.ride.create({
        data: {
          title: createRideDto.title,
          description: createRideDto.description,
          startDate: createRideDto.startDate,
          startTime: createRideDto.startTime,
          rideDuration: createRideDto.rideDuration,
          startLocation: {
            type: "Point",
            coordinates: [createRideDto.startLocation[1], createRideDto.startLocation[0]] // [longitude, latitude]
          },
          endLocation: {
            type: "Point",
            coordinates: [createRideDto.endLocation[1], createRideDto.endLocation[0]] // [longitude, latitude]
          },
          createdBy: user.id
        }
      });

      return ride;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateRideDetails(rideId: string, updateRideDto: UpdateRideDto) {
    try {

      const ride = await this.prismaService.ride.findUnique({
        where: {
          id: rideId
        }
      });

      if (!ride) {
        throw new HttpException('No rides found!', 404);
      }

      if (ride.status !== 'UPCOMING') {
        throw new HttpException('Cannot update a ride that is already in progress or completed', 400);
      }

      if (ride.joinedUsers.length > 0) {
        const allowedUpdates = ["title", "description", "startTime", "endLocation"];
        const updateFields = Object.keys(updateRideDto);

        const invalidFields = updateFields.filter(field => !allowedUpdates.includes(field));

        if (invalidFields.length > 0) {
          throw new BadRequestException(
            `Some fields cannot be updated as users have already joined: ${invalidFields.join(", ")}`
          );
        }
      }

      const updatedRide = await this.prismaService.ride.update({
        where: {
          id: rideId
        },
        data: {
          title: updateRideDto.title,
          description: updateRideDto.description,
          status: updateRideDto.status,
          startLocation: {
            update: {
              longitude: updateRideDto.startLocation[1],
              latitude: updateRideDto.startLocation[0]
            }
          },
          endLocation: {
            update: {
              longitude: updateRideDto.endLocation[1],
              latitude: updateRideDto.endLocation[0]
            }
          },
          startTime: updateRideDto.startTime,
          rideDuration: updateRideDto.rideDuration
        }
      });

      return updatedRide;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRidesByUser(getRidesByUserDto: GetRidesByUserDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: getRidesByUserDto.email
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const rides = await this.prismaService.ride.findMany({
        where: {
          createdBy: user.id
        }
      });

      return rides;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllRides() {
    try {
      const rides = await this.prismaService.ride.findMany();
      return rides;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findNearbyRides(findNearbyRidesDto: FindNearbyRidesDto) {
    try {
      const availableRides = await this.prismaService.$runCommandRaw({
        aggregate: "Ride",
        pipeline: [
          {
            $geoNear: {
              near: { type: "Point", coordinates: [findNearbyRidesDto.currentLocation[0], findNearbyRidesDto.currentLocation[1]] },
              distanceField: "distance",
              spherical: true,
              maxDistance: findNearbyRidesDto.radius * 1000,
            }
          },
          { $match: { status: RideStatus.UPCOMING } },
          { $sort: { distance: 1 } }
        ],
        cursor: {}
      });

      return availableRides;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
