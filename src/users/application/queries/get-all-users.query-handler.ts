import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { UsersRepository } from '@/users/application/ports/persistence/';
import { User } from '@/users/application/entities/';

import { GetAllUsersQuery } from './get-all-users.query';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersQueryHandler
  implements IQueryHandler<GetAllUsersQuery>
{
  private readonly logger = new Logger(GetAllUsersQueryHandler.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  execute(query: GetAllUsersQuery): Promise<User[]> {
    this.logger.log(`Process with query: ${JSON.stringify(query)}`);
    return this.usersRepository.findAll();
  }
}
