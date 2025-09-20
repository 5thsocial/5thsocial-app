import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtUser } from '../strategies/jwt.strategy';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler()
    ) || [];
    
    if (!requiredRoles.length) return true;

    const request = context.switchToHttp().getRequest();
    const user: JwtUser = request.user;
    
    return requiredRoles.some(role => user.roles?.includes(role));
  }
}