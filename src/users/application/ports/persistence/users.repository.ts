import { User } from '@/users/application/entities/user';
import {
  ReadRepository,
  WriteRepository,
} from '@/core/infrastructure/persistence';

export abstract class UsersRepository {
  abstract save(user: User): Promise<User>;

  abstract update(user: Pick<User, 'id'> & Partial<User>): Promise<User>;

  abstract findAll(): Promise<User[]>;

  abstract findOneById(id: User['id']): Promise<User | null>;

  abstract findOneByLogin(login: User['login']): Promise<User | null>;

  abstract getOneById(id: User['id']): Promise<User>;

  abstract remove(id: string): Promise<void>;
}

export abstract class ReadUserRepository extends ReadRepository<User> {}

export abstract class WriteUserRepository extends WriteRepository<User> {}
