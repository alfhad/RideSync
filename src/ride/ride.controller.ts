import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto, FindNearbyRidesDto, GetRidesByUserDto, UpdateRideDto } from '../dto';
import { ApiResponse } from 'src/utils';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('ride')
export class RideController {
  constructor(private rideService: RideService) { }

  @Post()
  // @Roles(UserRole.ADMIN)
  async createRide(@Body() createRideDto: CreateRideDto) {
    try {
      const ride = await this.rideService.createRide(createRideDto);
      return new ApiResponse(ride);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('nearby')
  // @Roles(UserRole.USER)
  async findNearbyRides(@Body() findNearbyRidesDto: FindNearbyRidesDto) {
    try {
      const rides = await this.rideService.findNearbyRides(findNearbyRidesDto);
      return new ApiResponse(rides);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':email')
  // @Roles(UserRole.ADMIN)
  async getRidesByUser(@Param() getRidesByUserDto: GetRidesByUserDto) {
    try {
      const rides = await this.rideService.getRidesByUser(getRidesByUserDto);
      return new ApiResponse(rides);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get()
  // @Roles(UserRole.SUPERADMIN)
  async getAllRides() {
    try {
      const rides = await this.rideService.getAllRides();
      return new ApiResponse(rides);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  // @Roles(UserRole.ADMIN)
  async updateRideDetails(@Param('id') rideId: string, @Body() updateRideDto: UpdateRideDto) {
    try {
      const ride = await this.rideService.updateRideDetails(rideId, updateRideDto);
      return new ApiResponse(ride);
    } catch (error) {
      throw new Error(error);
    }
  }

}
