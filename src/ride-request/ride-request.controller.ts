import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RideRequestService } from './ride-request.service';
import { CreateRideRequestDto, GetRideRequestsDto, UpdateRideRequestDto } from '../dto';
import { ApiResponse } from 'src/utils';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('ride-request')
export class RideRequestController {

  constructor(private rideRequestService: RideRequestService) { }

  @Post()
  // @Roles(UserRole.USER)
  async createRideRequest(@Body() createRideRequestDto: CreateRideRequestDto) {
    try {
      const createdRideRequest = await this.rideRequestService.createRideRequest(createRideRequestDto);
      return new ApiResponse(createdRideRequest);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  // @Roles(UserRole.ADMIN)
  async getRideRequests(@Body() getRideRequestsDto: GetRideRequestsDto) {
    try {
      const rideRequests = await this.rideRequestService.getRideRequests(getRideRequestsDto);
      return new ApiResponse(rideRequests);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  // @Roles(UserRole.ADMIN)
  async updateRideRequest(@Param('id') rideRequestId: string, @Body() updateRideRequestDto: UpdateRideRequestDto) {
    try {
      const updatedRideRequest = await this.rideRequestService.updateRideRequest(rideRequestId, updateRideRequestDto.status);
      return new ApiResponse(updatedRideRequest);
    } catch (error) {
      throw error;
    }
  }
}
