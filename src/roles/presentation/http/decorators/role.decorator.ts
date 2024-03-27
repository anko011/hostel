import { Role } from '@/roles/application/entities/role';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = Symbol('ROLES');
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
