import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import Redis from 'ioredis';

import { ITokenRepository } from '@/auth/application/ports/persistence';

import { RedisTokenRepository } from './redis-token.repository';

@Module({
  imports: [ConfigModule],
  providers: [
    RedisTokenRepository,
    {
      inject: [ConfigService],
      provide: Redis,
      useFactory: (config: ConfigService) => {
        return new Redis({
          host: config.get('CACHE_DB_HOST'),
          port: config.get('CACHE_DB_PORT'),
        });
      },
    },
    {
      provide: ITokenRepository,
      useClass: RedisTokenRepository,
    },
  ],
  exports: [ITokenRepository, RedisTokenRepository],
})
export class RedisTokenAdapter {}
