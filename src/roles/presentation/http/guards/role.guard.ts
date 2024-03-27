import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Role } from '@/roles/application/entities/role';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '@/roles/presentation/http/decorators/role.decorator';
import { User } from '@/users/application/entities/user';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{ user: User }>();
    if (!user) throw new UnauthorizedException();
    return requiredRoles.some((role) => user.role === role);
  }
}
