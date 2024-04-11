import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { AuthGuard } from './guards';
import { AuthController } from './controllers';
import { TokenModule } from '@/auth/application/shared';
import { UsersModule } from '@/users';

@Module({
  imports: [TokenModule, UsersModule],
  controllers: [AuthController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthHttpModule {}
