import { Module } from '@nestjs/common';
import { HashModule } from '@app/hash';

import { UserFactory } from '@/users/application/factories/user.factory';
import {
  GetAllUsersQueryHandler,
  GetUserByIdQueryHandler,
} from '@/users/application/queries';
import {
  DeleteUserByIdCommandHandler,
  UpdateUserByIdCommandHandler,
} from '@/users/application/commands';

import { UsersPersistenceModule } from '@/users/infrastructure/persistence';
import { UsersHttpModule } from '@/users/presentation/http';

const handlers = [
  GetAllUsersQueryHandler,
  GetUserByIdQueryHandler,
  DeleteUserByIdCommandHandler,
  UpdateUserByIdCommandHandler,
];

@Module({
  imports: [UsersPersistenceModule.use('db'), UsersHttpModule, HashModule],
  providers: [UserFactory, ...handlers],
  exports: [UserFactory, UsersPersistenceModule],
})
export class UsersModule {}
