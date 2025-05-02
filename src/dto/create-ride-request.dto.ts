import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateRideRequestDto {

  @IsString()
  @IsNotEmpty()
  rideId: string
} 