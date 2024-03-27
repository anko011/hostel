import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from '@/users/application/entities/';
import { UsersRepository } from '@/users/application/ports/persistence';

import { GetUserByIdQuery } from './get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  private readonly logger = new Logger(GetUserByIdQueryHandler.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  execute(query: GetUserByIdQuery): Promise<User | null> {
    this.logger.log(`Process with query: ${JSON.stringify(query)}`);
    return this.usersRepository.findOneById(query.id);
  }
}
