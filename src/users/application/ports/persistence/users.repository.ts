import { User } from '@/users/application/entities/user';
import {
  ReadRepository,
  WriteRepository,
} from '@/core/infrastructure/persistence';

export abstract class IReadUsersRepository extends ReadRepository<User> {
  abstract findOneByLogin(login: string): Promise<User | null>;
}

export abstract class IWriteUsersRepository extends WriteRepository<User> {
  abstract findOneByLogin(login: string): Promise<User | null>;
}
