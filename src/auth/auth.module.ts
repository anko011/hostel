import { Module } from '@nestjs/common';

import { HashModule } from '@app/hash';

import { UsersModule } from '@/users/users.module';

import {
  RefreshCommandHandler,
  SignInCommandHandler,
  SignUpCommandHandler,
} from '@/auth/application/commands';
import { TokenModule } from '@/auth/application/shared';
import { AuthHttpModule } from '@/auth/presentation/http';

const handlers = [
  SignUpCommandHandler,
  SignInCommandHandler,
  RefreshCommandHandler,
];

@Module({})
export class AuthModule {
  static forRoot() {
    return {
      module: AuthModule,
      imports: [HashModule, UsersModule, TokenModule, AuthHttpModule],
      providers: [...handlers],
    };
  }
}
