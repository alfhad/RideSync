import { ArrayMaxSize, ArrayMinSize, IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { UserRole } from "@prisma/client"

export class CreateUserDto {

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword({ minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 1 })
  @IsNotEmpty()
  password: string;

  @IsNumberString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  currentLocation?: [number, number]; // [latitude, longitude]
}