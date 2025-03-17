import { AdminRequestStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAdminRequestDto {

  @IsEnum(AdminRequestStatus)
  @IsNotEmpty()
  status: AdminRequestStatus

  @IsOptional()
  @IsString()
  rejectionReason: string
    
}