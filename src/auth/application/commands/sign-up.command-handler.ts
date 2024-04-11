import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpCommand } from '@/auth/application/commands/sign-up.command';
import { IWriteUsersRepository } from '@/users/application/ports/persistence/users.repository';
import { UserFactory } from '@/users/application/factories/user.factory';
import { User } from '@/users/application/entities/user';
import { ExistsUserException } from '@/auth/application/exceptions/exists-user.exception';
import { TokenService } from '@/auth/application/shared/token/token.service';
import { Logger } from '@nestjs/common';

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  private readonly logger = new Logger(SignUpCommandHandler.name);

  constructor(
    private readonly usersRepository: IWriteUsersRepository,
    private readonly userFactory: UserFactory,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: SignUpCommand): Promise<any> {
    this.logger.log(`Process with command: ${JSON.stringify(command)}`);

    const existingUser: User | null = await this.usersRepository.findOneByLogin(
      command.login,
    );

    if (existingUser) throw new ExistsUserException(existingUser);

    const entity = await this.userFactory.createUser(
      command.firstName,
      command.secondName,
      command.login,
      command.password,
    );

    const user = await this.usersRepository.save(entity);
    return await this.tokenService.generateTokens(user);
  }
}
