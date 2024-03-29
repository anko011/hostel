import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HashService } from '@app/hash';

import { UsersRepository } from '@/users/application/ports/persistence/users.repository';

import { TokenService } from '@/auth/application/shared/token';
import { IncorrectCredentialsException } from '@/auth/application/exceptions';

import { SignInCommand } from './sign-in.command';

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
  private readonly logger = new Logger(SignInCommandHandler.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: SignInCommand): Promise<any> {
    this.logger.log(`Process with command: ${JSON.stringify(command)}`);

    const user = await this.usersRepository.findOneByLogin(command.login);
    if (!user) throw new IncorrectCredentialsException();

    const isCorrectPassword = await this.hashService.compare(
      command.password,
      user.passwordHash,
    );

    if (!isCorrectPassword) throw new IncorrectCredentialsException();

    await this.tokenService.clearExpiredTokens(user);
    return await this.tokenService.generateTokens(user);
  }
}
