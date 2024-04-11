import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '@/auth/application/shared/token';
import { IWriteUsersRepository } from '@/users/application/ports/persistence';
import { SignUpCommand } from '@/auth/application/commands/sign-up.command';
import { SignUpCommandHandler } from '@/auth/application/commands/sign-up.command-handler';
import { UserFactory } from '@/users/application/factories';
import { Role } from '@/roles/application/entities';
import { ExistsUserException } from '@/auth/application/exceptions';

describe('Sign in command', () => {
  let handler: SignUpCommandHandler;

  const existsUser = {
    id: 'aaa-aaa',
    firstName: 'John',
    secondName: 'Doe',
    login: 'jonh',
    passwordHash: 'hashedPassword',
    role: Role.USER,
  };

  const newUser = {
    id: 'bbb-bbb',
    passwordHash: 'hashedPassword',
    role: Role.USER,
  };

  const newUserRegistrationData = {
    login: 'alex',
    password: 'password',
    firstName: 'Alex',
    secondName: 'Lavash',
  };

  const tokens = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpCommandHandler,
        {
          provide: IWriteUsersRepository,
          useFactory: () => ({
            findOneByLogin: jest.fn(async (login: string) =>
              login === existsUser.login ? existsUser : null,
            ),
            save: jest.fn(),
          }),
        },
        {
          provide: UserFactory,
          useFactory: () => ({
            createUser: jest.fn(
              async (firstName: string, secondName: string, login: string) => ({
                firstName,
                secondName,
                login,
                ...newUser,
              }),
            ),
          }),
        },
        {
          provide: TokenService,
          useFactory: () => ({
            generateTokens: jest.fn().mockResolvedValueOnce(tokens),
          }),
        },
      ],
    }).compile();

    handler = module.get(SignUpCommandHandler);
  });

  it('if login not exists should return tokens', async () => {
    const validCommand = new SignUpCommand(
      newUserRegistrationData.login,
      newUserRegistrationData.password,
      newUserRegistrationData.firstName,
      newUserRegistrationData.secondName,
    );

    const result = await handler.execute(validCommand);

    expect(result).toMatchObject(tokens);
  });

  it('if login  exists should rise ExistsUserException', async () => {
    const invalidCommand = new SignUpCommand(
      existsUser.login,
      existsUser.passwordHash,
      existsUser.firstName,
      existsUser.secondName,
    );

    try {
      await handler.execute(invalidCommand);
    } catch (e) {
      expect(e instanceof ExistsUserException);
    }
  });
});
