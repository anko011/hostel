import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { TokenService } from '@/auth/application/shared/token';
import { UsersRepository } from '@/users/application/ports/persistence';

import { RefreshCommand } from './refresh.command';

@CommandHandler(RefreshCommand)
export class RefreshCommandHandler implements ICommandHandler<RefreshCommand> {
  private readonly logger = new Logger(RefreshCommandHandler.name);

  constructor(
    private readonly tokenService: TokenService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(command: RefreshCommand): Promise<any> {
    this.logger.log(`Process with command: ${JSON.stringify(command)}`);

    const userData = await this.tokenService.verify(command.token);
    const user = await this.usersRepository.getOneById(userData.id);

    await this.tokenService.removeToken(command.token);
    return this.tokenService.generateTokens(user);
  }
}
