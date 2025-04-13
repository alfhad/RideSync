import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class FindNearbyRidesDto {

  @IsNotEmpty()
  radius: number;

  @IsArray()
  @ArrayMinSize(2)
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  currentLocation: [number, number];

}