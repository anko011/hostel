import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { IWriteUsersRepository } from '@/users/application/ports/persistence';

import { DeleteUserByIdCommand } from './delete-user-by-id.command';

@CommandHandler(DeleteUserByIdCommand)
export class DeleteUserByIdCommandHandler
  implements IQueryHandler<DeleteUserByIdCommand>
{
  private readonly logger = new Logger(DeleteUserByIdCommandHandler.name);

  constructor(private readonly usersRepository: IWriteUsersRepository) {}

  execute(command: DeleteUserByIdCommand): Promise<any> {
    this.logger.log(`Process with command: ${JSON.stringify(command)}`);
    return this.usersRepository.remove(command.id);
  }
}
