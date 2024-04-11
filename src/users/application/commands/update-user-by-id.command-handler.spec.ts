import { IWriteUsersRepository } from '@/users/application/ports/persistence';
import { Test } from '@nestjs/testing';
import { UpdateUserByIdCommand } from '@/users/application/commands/update-user-by-id.command';
import { UpdateUserByIdCommandHandler } from '@/users/application/commands/update-user-by-id.command-handler';

describe('Update user by id', () => {
  let handler: UpdateUserByIdCommandHandler;
  let repository: IWriteUsersRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateUserByIdCommandHandler,
        {
          provide: IWriteUsersRepository,
          useFactory: () => ({
            update: jest
              .fn()
              .mockImplementation(async (userId: string) => userId),
          }),
        },
      ],
    }).compile();

    repository = module.get(IWriteUsersRepository);
    handler = module.get(UpdateUserByIdCommandHandler);
  });

  it('should be called update function repositories with user', async () => {
    const user: ConstructorParameters<typeof UpdateUserByIdCommand>[0] = {
      id: 'aaa-aaa',
    };
    const command = new UpdateUserByIdCommand(user);
    await handler.execute(command);
    expect(repository.update).toHaveBeenCalledWith(user);
  });
});
