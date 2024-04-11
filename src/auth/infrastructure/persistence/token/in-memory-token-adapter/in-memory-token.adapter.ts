import { Module } from '@nestjs/common';
import { InMemoryTokenRepository } from './in-memory-token.repository';
import { ITokenRepository } from '@/auth/application/ports/persistence';

@Module({
  providers: [
    InMemoryTokenRepository,
    {
      provide: ITokenRepository,
      useClass: InMemoryTokenRepository,
    },
  ],
  exports: [ITokenRepository, InMemoryTokenRepository],
})
export class InMemoryTokenAdapter {}
