import { RideStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateRideDto {

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string

  @IsEnum(RideStatus)
  @IsNotEmpty()
  status: RideStatus

  @IsOptional()
  @IsNotEmpty()
  startLocation: [number, number]

  @IsOptional()
  @IsNotEmpty()
  endLocation: [number, number]

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  startTime: string

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  rideDuration: number
}