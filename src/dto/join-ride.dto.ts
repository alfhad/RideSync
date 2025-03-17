import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class JoinRideDto {

  @IsEmail()
  @IsNotEmpty()
  email: string
} 