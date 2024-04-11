import { RefreshCommandHandler } from '@/auth/application/commands/refresh.command-handler';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '@/auth/application/shared/token';
import { IWriteUsersRepository } from '@/users/application/ports/persistence';
import { RefreshCommand } from '@/auth/application/commands/refresh.command';

describe('Refresh tokens command', () => {
  let handler: RefreshCommandHandler;

  const user = {
    id: 'userId',
    firstName: 'userFirstName',
    secondName: 'userSecondName',
    login: 'userLogin',
    passwordHash: 'userPasswordHash',
  };

  const tokensData = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshCommandHandler,
        {
          provide: TokenService,
          useFactory: () => ({
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            removeToken: jest.fn(async (token: string) => undefined),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            verify: jest.fn(async (token: string) => user),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            generateTokens: jest.fn(async (token: string) => tokensData),
          }),
        },
        {
          provide: IWriteUsersRepository,
          useFactory: () => ({
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            getOneById: jest.fn(async (id: string) => user),
          }),
        },
      ],
    }).compile();

    handler = module.get(RefreshCommandHandler);
  });

  it('if token valid should return tokens', async () => {
    const validCommand = new RefreshCommand('validToken');
    const result = await handler.execute(validCommand);
    expect(result).toMatchObject(tokensData);
  });
});
