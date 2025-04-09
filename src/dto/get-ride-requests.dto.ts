import { IsNotEmpty, IsString } from "class-validator";

export class GetRideRequestsDto {

  @IsNotEmpty()
  @IsString()
  rideId: string
}