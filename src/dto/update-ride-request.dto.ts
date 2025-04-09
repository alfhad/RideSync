import { JoinRequestStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateRideRequestDto {

  @IsEnum(JoinRequestStatus)
  @IsNotEmpty()
  status: JoinRequestStatus
}