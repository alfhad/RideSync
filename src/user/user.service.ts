import { HttpException, Injectable } from '@nestjs/common';
import { decryptPassword, generateJwt, hashPassword } from '../utils';
import { CreateUserDto } from '../dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) { }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await hashPassword(createUserDto.password);

      const createdUser = await this.prismaService.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          hashedPassword: hashedPassword,
          phone: createUserDto.phone,
          currentLocation: createUserDto.currentLocation
        }
      });

      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(loginUserDto: { email: string, password: string }) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: loginUserDto.email
        }
      });

      if (!user) {
        throw new HttpException('No user found with email', 404);
      }

      if (!(await decryptPassword(loginUserDto.password, user.hashedPassword))) {
        throw new HttpException('Incorrect Password', 401);
      }

      return generateJwt({ id: user.id, email: user.email, role: user.role });
    } catch (error) {
      throw error;
    }
  }
}
