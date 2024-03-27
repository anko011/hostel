import { User } from '@/users/application/entities/user';

export abstract class UsersRepository {
  abstract save(user: User): Promise<User>;

  abstract update(user: Pick<User, 'id'> & Partial<User>): Promise<User>;

  abstract findAll(): Promise<User[]>;

  abstract findOneById(id: User['id']): Promise<User | null>;

  abstract findOneByLogin(login: User['login']): Promise<User | null>;

  abstract getOneById(id: User['id']): Promise<User>;

  abstract delete(id: string): Promise<void>;
}
