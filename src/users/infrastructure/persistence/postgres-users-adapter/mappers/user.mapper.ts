import { Injectable } from '@nestjs/common';

import { User } from '@/users/application/entities';

import { UserEntity } from '../entities';

@Injectable()
export class UserMapper {
  toDomain(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.firstName,
      entity.secondName,
      entity.login,
      entity.passwordHash,
      entity.role,
    );
  }

  toPersistence(entity: User): UserEntity {
    const user = new UserEntity();
    user.id = entity.id;
    user.firstName = entity.firstName;
    user.secondName = entity.secondName;
    user.login = entity.login;
    user.passwordHash = entity.passwordHash;
    user.role = entity.role;

    return user;
  }
}
