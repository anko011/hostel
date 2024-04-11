import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '@/users/application/entities';
import { IReadUsersRepository } from '@/users/application/ports/persistence';
import { NotExistUserException } from '@/users/application/exceptions';

import { READ_DB_TOKEN } from '@/core/infrastructure/persistence';

import { UserEntity } from './entities';
import { UserMapper } from './mappers';

@Injectable()
export class ReadDbRepository implements IReadUsersRepository {
  constructor(
    @InjectRepository(UserEntity, READ_DB_TOKEN)
    protected readonly userRepository: Repository<UserEntity>,
    protected readonly userMapper: UserMapper,
  ) {}

  async findOneByLogin(login: string): Promise<User | null> {
    const entity = await this.userRepository.findOneBy({ login });
    return entity ? this.userMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<User[]> {
    const entities = await this.userRepository.find();
    return entities.map((entity) => this.userMapper.toDomain(entity));
  }

  async findOneById(id: string): Promise<User> {
    const entity = await this.userRepository.findOneBy({ id });
    return entity ? this.userMapper.toDomain(entity) : null;
  }

  async getOneById(id: string): Promise<User> {
    const entity = await this.userRepository.findOneBy({ id });

    if (!entity)
      throw new NotExistUserException(`User with id: ${id} not exists`);

    return this.userMapper.toDomain(entity);
  }
}
