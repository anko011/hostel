import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TokenConfig } from '@/auth/application/configs/';

import { TokenService } from './token.service';
import { TokenPersistenceModule } from '@/auth/infrastructure/persistence';

@Module({
  imports: [
    ConfigModule.forFeature(TokenConfig),
    TokenPersistenceModule.use('in-memory'),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
