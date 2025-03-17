import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { verifyJwt } from 'src/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());

      if (!roles || roles.length === 0) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('No Bearer token found');
      }

      const jwtToken = authHeader.split(' ')[1];

      const user = await verifyJwt(jwtToken);

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      request.user = user;

      const userRole = user['role'] as UserRole;

      return roles.includes(userRole);
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}