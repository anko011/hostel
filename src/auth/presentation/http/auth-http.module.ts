import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { AuthController } from './controllers';
import { AuthGuard } from './guards';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthHttpModule {}
