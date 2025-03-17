import { IsEmail, IsNotEmpty } from "class-validator";

export class GetRidesByUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
}