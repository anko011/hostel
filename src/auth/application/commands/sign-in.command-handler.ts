import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from '@/auth/application/commands/sign-in.command';
import { Logger } from '@nestjs/common';
import { UsersRepository } from '@/users/application/ports/persistence/users.repository';
import { IncorrectCredentialsException } from '@/auth/application/exceptions';
import { HashService } from '@app/hash';
import { TokenService } from 'src/auth/application/shared';
import { TokensRepository } from '@/auth/application/ports/persistence';

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
  private readonly logger = new Logger(SignInCommandHandler.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly tokenRepository: TokensRepository,
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
