import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword({ minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 1 })
  @IsNotEmpty()
  password: string;
}