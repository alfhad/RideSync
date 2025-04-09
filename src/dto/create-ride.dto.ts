import { Type } from "class-transformer"
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateRideDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(30)
  title: string

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(150)
  description: string

  @IsNotEmpty()
  @IsInt()
  rideDuration: number

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startDate: Date

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startTime: Date

  @IsNotEmpty()
  startLocation: [number, number]

  @IsNotEmpty()
  endLocation: [number, number]
}