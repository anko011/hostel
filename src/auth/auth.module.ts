import { Module } from '@nestjs/common';

import { HashModule } from '@app/hash';

import {
  RefreshCommandHandler,
  SignInCommandHandler,
  SignUpCommandHandler,
} from '@/auth/application/commands';
import { TokenModule } from '@/auth/application/shared';
import { AuthHttpModule } from '@/auth/presentation/http';
import { UsersModule } from '@/users';

const handlers = [
  SignUpCommandHandler,
  SignInCommandHandler,
  RefreshCommandHandler,
];

@Module({
  imports: [UsersModule, HashModule, TokenModule, AuthHttpModule],
  providers: [...handlers],
  exports: [TokenModule],
})
export class AuthModule {}
