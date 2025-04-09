import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminRequestService } from './admin-request.service';
import { CreateAdminRequestDto, UpdateAdminRequestDto } from '../dto';
import { ApiResponse } from 'src/utils';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('admin-request')
export class AdminRequestController {
  constructor(private adminRequestService: AdminRequestService) { }

  @Get()
  // @Roles(UserRole.SUPERADMIN)
  async getAllAdminRequests() {
    try {
      const adminRequests = await this.adminRequestService.getAllAdminRequests();
      return new ApiResponse(adminRequests);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  // @Roles(UserRole.USER)
  async createAdminRequest(@Body() createAdminRequestDto: CreateAdminRequestDto) {
    try {
      const adminRequest = await this.adminRequestService.createAdminRequest(createAdminRequestDto);
      return new ApiResponse(adminRequest);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  // @Roles(UserRole.SUPERADMIN)
  async updateAdminRequest(@Param('id') requestId: string, @Body() updateAdminRequestDto: UpdateAdminRequestDto) {
    try {
      const adminRequest = await this.adminRequestService.updateAdminRequest(requestId, updateAdminRequestDto);
      return new ApiResponse(adminRequest);
    } catch (error) {
      throw error;
    }
  }
}
