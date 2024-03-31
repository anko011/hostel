import { User } from '@/users/application/entities';
import { ReadUserRepository } from '@/users/application/ports/persistence';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/users/infrastructure/persistence/db-users-adapter/entities';
import { Repository } from 'typeorm';
import { UserMapper } from '@/users/infrastructure/persistence/db-users-adapter/mappers';
import { NotExistUserException } from '@/users/application/exceptions';

@Injectable()
export class ReadDbRepository implements ReadUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly userRepository: Repository<UserEntity>,
    protected readonly userMapper: UserMapper,
  ) {}

  async findAll(): Promise<User[]> {
    const entities = await this.userRepository.find();
    return entities.map((entity) => this.userMapper.toDomain(entity));
  }

  async findOneById(id: string): Promise<User> {
    const entity = await this.userRepository.findOneBy({ id });
    return this.userMapper.toDomain(entity);
  }

  async getOneById(id: string): Promise<User> {
    const entity = await this.userRepository.findOneBy({ id });

    if (!entity)
      throw new NotExistUserException(`User with id: ${id} not exists`);

    return this.userMapper.toDomain(entity);
  }
}
