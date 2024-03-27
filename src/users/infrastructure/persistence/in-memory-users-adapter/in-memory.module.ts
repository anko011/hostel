import { Module } from '@nestjs/common';
import { UsersRepository } from '@/users/application/ports/persistence/';

import { InMemoryRepository } from './in-memory.repository';

@Module({
  providers: [
    {
      provide: UsersRepository,
      useClass: InMemoryRepository,
    },
  ],
  exports: [UsersRepository],
})
export class InMemoryModule {}
