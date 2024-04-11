import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '@/auth/application/shared/token';
import { SignInCommandHandler } from '@/auth/application/commands/sign-in.command-handler';
import { HashService } from '@app/hash';
import { IWriteUsersRepository } from '@/users/application/ports/persistence';
import { SignInCommand } from '@/auth/application/commands/sign-in.command';
import { IncorrectCredentialsException } from '@/auth/application/exceptions';

describe('Sign in command', () => {
  let handler: SignInCommandHandler;

  const incorrectCredentials = {
    login: 'incorrectLogin',
    password: 'incorrectPassword',
  };

  const correctCredentials = {
    login: 'login',
    password: 'correctPassword',
  };

  const existUser = {
    id: 'id',
    firstName: 'firstName',
    secondName: 'secondName',
    login: 'login',
    passwordHash: 'passwordHash',
  };

  const tokensData = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInCommandHandler,
        {
          provide: TokenService,
          useFactory: () => ({
            clearExpiredTokens: jest.fn(() => undefined),
            generateTokens: jest.fn(async () => tokensData),
          }),
        },
        {
          provide: HashService,
          useFactory: () => ({
            compare: jest.fn(
              async (password: string) => password === 'correctPassword',
            ),
          }),
        },
        {
          provide: IWriteUsersRepository,
          useFactory: () => ({
            findOneByLogin: jest.fn(async (login: string) =>
              login === 'login' ? existUser : null,
            ),
          }),
        },
      ],
    }).compile();

    handler = module.get(SignInCommandHandler);
  });

  it('if correct credential should return tokens', async () => {
    const validCommand = new SignInCommand(
      correctCredentials.login,
      correctCredentials.password,
    );
    const result = await handler.execute(validCommand);
    expect(result).toMatchObject(tokensData);
  });

  const params = ['login', 'password'];

  it.each(params)(
    'if incorrect %s should raise IncorrectCredentials',
    async (param) => {
      const validCommand = new SignInCommand(
        incorrectCredentials[param],
        correctCredentials.password,
      );
      try {
        await handler.execute(validCommand);
      } catch (e) {
        expect(e).toBeInstanceOf(IncorrectCredentialsException);
      }
    },
  );
});
