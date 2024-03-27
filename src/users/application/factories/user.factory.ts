import { HashService } from '@app/hash';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { User } from '@/users/application/entities/user';
import { Role } from '@/roles/application/entities/role';

@Injectable()
export class UserFactory {
  constructor(private readonly hashService: HashService) {}

  async createUser(
    firstName: string,
    secondName: string,
    login: string,
    password: string,
  ) {
    return await this.create(firstName, secondName, login, password, Role.USER);
  }

  async createManager(
    firstName: string,
    secondName: string,
    login: string,
    password: string,
  ) {
    return await this.create(
      firstName,
      secondName,
      login,
      password,
      Role.MANAGER,
    );
  }

  async createAdmin(
    firstName: string,
    secondName: string,
    login: string,
    password: string,
  ) {
    return await this.create(
      firstName,
      secondName,
      login,
      password,
      Role.ADMIN,
    );
  }

  private async create(
    firstName: string,
    secondName: string,
    login: string,
    password: string,
    role: Role,
  ) {
    const id = randomUUID();
    const passwordHash = await this.hashService.hash(password);
    return new User(id, firstName, secondName, login, passwordHash, role);
  }
}
