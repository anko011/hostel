import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HashModule } from '@app/hash';

import { UsersModule } from '@/users/users.module';

import {
  RefreshCommandHandler,
  SignInCommandHandler,
  SignUpCommandHandler,
} from '@/auth/application/commands';
import { TokenModule } from 'src/auth/application/shared';
import { TokenConfig } from '@/auth/application/configs/';

import { AuthPersistenceModule } from '@/auth/infrastructure/persistence/';

import { AuthHttpModule } from '@/auth/presentation/http/';

const handlers = [
  SignUpCommandHandler,
  SignInCommandHandler,
  RefreshCommandHandler,
];

@Module({
  imports: [
    ConfigModule.forFeature(TokenConfig),
    HashModule,
    UsersModule,
    AuthPersistenceModule.use('in-memory'),
    AuthHttpModule,
    TokenModule,
  ],
  providers: [...handlers],
})
export class AuthModule {}
