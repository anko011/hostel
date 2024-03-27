import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TokenConfig } from '@/auth/application/configs';

import { TokenService } from './token.service';

@Module({
  imports: [ConfigModule.forFeature(TokenConfig)],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
