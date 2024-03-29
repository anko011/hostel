import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { UsersModule } from '@/users';

import { TokenModule } from '@/auth/application/shared';
import { AuthGuard } from './guards';
import { AuthController } from './controllers';

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthHttpModule {}
