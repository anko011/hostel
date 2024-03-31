import { Injectable } from '@nestjs/common';
import { ReadDbRepository } from '@/users/infrastructure/persistence/db-users-adapter/read-db.repository';
import { WriteUserRepository } from '@/users/application/ports/persistence';
import { User } from '@/users/application/entities';

@Injectable()
export class WriteDbRepository
  extends ReadDbRepository
  implements WriteUserRepository
{
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
