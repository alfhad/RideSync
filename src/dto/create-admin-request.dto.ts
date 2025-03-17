import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAdminRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(10)
  @MaxLength(100)
  @IsNotEmpty()
  reason: string;

  @IsString()
  @MinLength(10)
  @MaxLength(100)
  @IsOptional()
  experience: string;

  @IsString()
  @MinLength(20)
  @MaxLength(100)
  @IsOptional()
  socialProof: string;
}