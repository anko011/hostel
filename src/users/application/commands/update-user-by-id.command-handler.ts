import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { User } from '@/users/application/entities';
import { IWriteUsersRepository } from '@/users/application/ports/persistence/';

import { UpdateUserByIdCommand } from './update-user-by-id.command';

@CommandHandler(UpdateUserByIdCommand)
export class UpdateUserByIdCommandHandler
  implements IQueryHandler<UpdateUserByIdCommand>
{
  private readonly logger = new Logger(UpdateUserByIdCommandHandler.name);

  constructor(private readonly usersRepository: IWriteUsersRepository) {}

  execute(command: UpdateUserByIdCommand): Promise<User> {
    this.logger.log(`Process with command: ${JSON.stringify(command)}`);
    return this.usersRepository.update(command.user);
  }
}
