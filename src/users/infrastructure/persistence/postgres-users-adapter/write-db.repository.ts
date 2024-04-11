import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/users/application/entities';
import { IWriteUsersRepository } from '@/users/application/ports/persistence';

import { WRITE_DB_TOKEN } from '@/core/infrastructure/persistence';

import { UserEntity } from './entities';
import { ReadDbRepository } from './read-db.repository';
import { UserMapper } from './mappers';

@Injectable()
export class WriteDbRepository
  extends ReadDbRepository
  implements IWriteUsersRepository
{
  constructor(
    @InjectRepository(UserEntity, WRITE_DB_TOKEN)
    writeRepository: Repository<UserEntity>,
    mapper: UserMapper,
  ) {
    super(writeRepository, mapper);
  }

  async save(user: User): Promise<User> {
    const entity = this.userMapper.toPersistence(user);
    const newEntity = await this.userRepository.save(entity);
    return this.userMapper.toDomain(newEntity);
  }

  async update(entity: Pick<User, 'id'> & Partial<User>): Promise<User> {
    const newEntity = await this.userRepository.save(entity);
    return this.userMapper.toDomain(newEntity);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
