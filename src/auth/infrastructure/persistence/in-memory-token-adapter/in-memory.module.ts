import { Module } from '@nestjs/common';
import { InMemoryRepository } from './in-memory.repository';
import { TokenRepository } from '@/auth/application/ports/persistence';

@Module({
  providers: [
    InMemoryRepository,
    {
      provide: TokenRepository,
      useClass: InMemoryRepository,
    },
  ],
  exports: [TokenRepository],
})
export class InMemoryModule {}
