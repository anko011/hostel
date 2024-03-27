import { Module } from '@nestjs/common';
import { InMemoryRepository } from './in-memory.repository';
import { TokensRepository } from '@/auth/application/ports/persistence';

@Module({
  providers: [
    InMemoryRepository,
    {
      provide: TokensRepository,
      useClass: InMemoryRepository,
    },
  ],
  exports: [TokensRepository],
})
export class InMemoryModule {}
