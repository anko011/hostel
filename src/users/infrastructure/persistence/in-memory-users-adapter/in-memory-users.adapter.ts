import { Module } from '@nestjs/common';
import {
  IReadUsersRepository,
  IWriteUsersRepository,
} from '@/users/application/ports/persistence/';

import { InMemoryUsersRepository } from './in-memory-users.repository';

@Module({
  providers: [
    {
      provide: IReadUsersRepository,
      useClass: InMemoryUsersRepository,
    },
    {
      provide: IWriteUsersRepository,
      useClass: InMemoryUsersRepository,
    },
  ],
  exports: [IReadUsersRepository, IWriteUsersRepository],
})
export class InMemoryUsersAdapter {}
