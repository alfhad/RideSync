import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from '../dto';
import { ApiResponse } from '../utils';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.userService.createUser(createUserDto);
      return new ApiResponse(createdUser);
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.userService.loginUser(loginUserDto);
      return new ApiResponse(user);
    } catch (error) {
      throw error;
    }
  }
}
