import { Injectable } from '@nestjs/common';
import { CreateRideDto, GetRidesByUserDto, JoinRideDto, UpdateRideDto } from '../dto';
import { PrismaService } from '../prisma/prisma.service';

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
            create: {
              longitude: createRideDto.startLocation[1],
              latitude: createRideDto.startLocation[0]
            }
          },
          endLocation: {
            create: {
              longitude: createRideDto.endLocation[1],
              latitude: createRideDto.endLocation[0]
            }
          },
          createdBy: user.id
        }
      });

      return ride;
    } catch (error) {
      throw new Error(error);
    }
  }

  async joinRide(rideId: string, joinRideDto: JoinRideDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: joinRideDto.email
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const ride = await this.prismaService.ride.findUnique({
        where: {
          id: rideId
        }
      });

      if (!ride) {
        throw new Error('Ride not found');
      }

      const updatedRidersList = [
        user.id,
        ...(ride.joinedUsers as string[])
      ];

      const rideUser = await this.prismaService.ride.update({
        where: {
          id: rideId
        },
        data: {
          joinedUsers: {
            set: updatedRidersList
          }
        }
      });

      return rideUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateRideDetails(rideId: string, updateRideDto: UpdateRideDto) {
    try {
      // const ride = await this.prismaService.ride.update({
      //   where: {
      //     id: rideId
      //   },
      //   data: {
      //     title: updateRideDto.title,
      //     description: updateRideDto.description,
      //     status: updateRideDto.status,
      //     startLocation: {
      //       update: {
      //         longitude: updateRideDto.startLocation[1],
      //         latitude: updateRideDto.startLocation[0]
      //       }
      //     },
      //     endLocation: {
      //       update: {
      //         longitude: updateRideDto.endLocation[1],
      //         latitude: updateRideDto.endLocation[0]
      //       }
      //     },
      //     startTime: updateRideDto.startTime,
      //     rideDuration: updateRideDto.rideDuration
      //   }
      // });

      // return ride;
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
}
