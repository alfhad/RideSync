import { RideStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateRideDto {

  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsEnum(RideStatus)
  @IsNotEmpty()
  status: RideStatus

  @IsOptional()
  startLocation: [number, number]

  @IsOptional()
  endLocation: [number, number]

  @IsOptional()
  @IsString()
  startTime: string

  @IsOptional()
  @IsNumber()
  rideDuration: number
}