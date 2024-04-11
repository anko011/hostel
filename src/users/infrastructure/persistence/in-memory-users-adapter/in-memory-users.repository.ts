import { Injectable } from '@nestjs/common';

import { User } from '@/users/application/entities/user';
import {
  IReadUsersRepository,
  IWriteUsersRepository,
} from '@/users/application/ports/persistence/';
import { NotExistUserException } from '@/users/application/exceptions';

@Injectable()
export class InMemoryUsersRepository
  implements IReadUsersRepository, IWriteUsersRepository
{
  private users: User[] = [];

  async save(user: User): Promise<User> {
    const existing = await this.findOneById(user.id);
    if (existing) return this.update(user);
    this.users.push(user);
    return user;
  }

  async update(user: User) {
    const existing = this.findOneById(user.id);
    if (!existing)
      throw new NotExistUserException(`User with id: ${user.id} is not exists`);

    Object.keys(user).forEach((key) => {
      const value = user[key];
      if (value) existing[`_${key}`] = value;
    });

    return existing;
  }

  async remove(id: User['id']): Promise<void> {
    const existingUser = await this.findOneById(id);
    if (!existingUser)
      throw new NotExistUserException(`User with id: ${id} is not exists`);

    this.users = this.users.filter((user) => user.id !== id);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOneById(id: User['id']): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    return user ? user : null;
  }

  async getOneById(id: User['id']): Promise<User> {
    const user = this.findOneById(id);
    if (!user)
      throw new NotExistUserException(`Not exists user with id: ${id}`);

    return user;
  }

  async findOneByLogin(login: User['login']): Promise<User | null> {
    const user = this.users.find((user) => user.login === login);
    return user ? user : null;
  }
}
