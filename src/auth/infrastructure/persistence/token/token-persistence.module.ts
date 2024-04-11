import { Module } from '@nestjs/common';

import { InMemoryTokenAdapter } from './in-memory-token-adapter';
import { RedisTokenAdapter } from './redis-token-adapter';

const adapter =
  process.env['IN_MEMORY'] === 'true'
    ? InMemoryTokenAdapter
    : RedisTokenAdapter;

@Module({
  imports: [adapter],
  exports: [adapter],
})
export class TokenPersistenceModule {}
