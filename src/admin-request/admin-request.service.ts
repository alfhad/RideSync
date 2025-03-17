import { HttpException, Injectable } from '@nestjs/common';
import { CreateAdminRequestDto, UpdateAdminRequestDto } from '../dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { addMonths } from 'date-fns';
import { AdminRequestStatus } from '@prisma/client';

@Injectable()
export class AdminRequestService {
  constructor(private prismaService: PrismaService) { }

  async getAllAdminRequests() {
    try {
      const adminRequests = await this.prismaService.adminRequest.findMany({
        include: {
          User: true,
        },
      });

      return adminRequests;
    } catch (error) {
      throw error;
    }
  }

  async createAdminRequest(createAdminRequestDto: CreateAdminRequestDto) {
    try {

      const user = await this.prismaService.user.findUnique({
        where: {
          email: createAdminRequestDto.email,
        },
      });

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      const alreadyExists = await this.checkIfRequestIsAllowed(user.id);

      if (alreadyExists) {
        return await this.updateRequest(user.id, createAdminRequestDto);
      }

      const adminRequest = await this.prismaService.adminRequest.create(
        {
          data: {
            userId: user.id,
            reason: createAdminRequestDto.reason,
            experience: createAdminRequestDto.experience,
            socialProof: createAdminRequestDto.socialProof,
          },
        });

      return adminRequest;
    } catch (error) {
      throw error;
    }
  }

  async updateAdminRequest(requestId: string, updateAdminRequestDto: UpdateAdminRequestDto) {
    try {
      const adminRequest = await this.prismaService.adminRequest.update({
        where: {
          id: requestId,
        },
        data: {
          status: updateAdminRequestDto.status,
          rejectionReason: updateAdminRequestDto.rejectionReason,
        },
      });

      const updatedUser = await this.prismaService.user.update({
        where: {
          id: adminRequest.userId,
        },
        data: {
          role: updateAdminRequestDto.status === AdminRequestStatus.ACCEPTED ? 'ADMIN' : 'USER',
        },
      });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async checkIfRequestIsAllowed(userId: string) {
    try {
      const existingRequest = await this.checkIfRequestExists(userId);

      if (existingRequest) {
        const oneMonthAgo = addMonths(new Date(), -1);
        if (existingRequest.createdAt > oneMonthAgo) {
          throw new HttpException(
            'You can only request to become an admin once a month.',
            400,
          );
        }
      }

      return existingRequest;
    } catch (error) {
      throw error;
    }
  }

  async checkIfRequestExists(userId: string) {
    try {
      const existingRequest = await this.prismaService.adminRequest.findUnique({
        where: { userId },
      });

      return existingRequest;
    } catch (error) {
      throw error;
    }
  }

  async updateRequest(userId: string, createAdminRequestDto: CreateAdminRequestDto) {
    try {
      const updatedRequest = await this.prismaService.adminRequest.update({
        where: { userId: userId },
        data: {
          reason: createAdminRequestDto.reason,
          experience: createAdminRequestDto.experience,
          socialProof: createAdminRequestDto.socialProof,
          createdAt: new Date(),
          status: AdminRequestStatus.PENDING,
        },
      });

      return updatedRequest;
    } catch (error) {
      throw error;
    }
  }
}
