import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  IReadUsersRepository,
  IWriteUsersRepository,
} from '@/users/application/ports/persistence';

import { UserEntity } from './entities';
import { UserMapper } from './mappers';
import { ReadDbRepository } from './read-db.repository';
import { WriteDbRepository } from './write-db.repository';
import {
  READ_DB_TOKEN,
  WRITE_DB_TOKEN,
} from '@/core/infrastructure/persistence';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity], READ_DB_TOKEN),
    TypeOrmModule.forFeature([UserEntity], WRITE_DB_TOKEN),
  ],
  providers: [
    UserMapper,
    {
      provide: IReadUsersRepository,
      useClass: ReadDbRepository,
    },
    {
      provide: IWriteUsersRepository,
      useClass: WriteDbRepository,
    },
  ],
  exports: [IReadUsersRepository, IWriteUsersRepository],
})
export class PostgresUsersAdapter {}
