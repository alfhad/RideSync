import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsObject, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

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

  @IsObject()
  @IsOptional()
  socialLinks: object;

  @IsArray()
  @ArrayMinSize(2)
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  currentLocation: [number, number];
}