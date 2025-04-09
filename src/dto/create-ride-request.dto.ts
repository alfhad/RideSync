import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateRideRequestDto {

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  rideId: string
} 