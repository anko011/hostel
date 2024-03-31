import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ReadUserRepository,
  WriteUserRepository,
} from '@/users/application/ports/persistence';

import { UserEntity } from './entities';
import { UserMapper } from './mappers';
import { ReadDbRepository } from './read-db.repository';
import { WriteDbRepository } from './write-db.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserMapper,
    {
      provide: ReadUserRepository,
      useClass: ReadDbRepository,
    },
    {
      provide: WriteUserRepository,
      useClass: WriteDbRepository,
    },
  ],
  exports: [ReadUserRepository, WriteUserRepository],
})
export class DbModule {}
