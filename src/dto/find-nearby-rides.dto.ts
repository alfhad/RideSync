import { IsNotEmpty } from "class-validator";

export class FindNearbyRidesDto {

  @IsNotEmpty()
  radius: number;

  @IsNotEmpty()
  currentLocation: [number, number];

}