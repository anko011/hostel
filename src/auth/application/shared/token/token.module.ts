import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TokenConfig } from '@/auth/application/configs/';
import { TokenPersistenceModule } from '@/auth/infrastructure/persistence/token';

import { TokenService } from './token.service';

@Module({
  imports: [ConfigModule.forFeature(TokenConfig), TokenPersistenceModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
