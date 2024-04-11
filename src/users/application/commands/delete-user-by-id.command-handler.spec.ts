import { IWriteUsersRepository } from '@/users/application/ports/persistence';
import { DeleteUserByIdCommandHandler } from '@/users/application/commands/delete-user-by-id.command-handler';
import { DeleteBookingCommand } from '@/bookings/application/commands';
import { Test } from '@nestjs/testing';

describe('Delete user by id', () => {
  let handler: DeleteUserByIdCommandHandler;
  let repository: IWriteUsersRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteUserByIdCommandHandler,
        {
          provide: IWriteUsersRepository,
          useFactory: () => ({
            remove: jest
              .fn()
              .mockImplementation(async (userId: string) => userId),
          }),
        },
      ],
    }).compile();

    repository = module.get(IWriteUsersRepository);
    handler = module.get(DeleteUserByIdCommandHandler);
  });

  it('should be called remove function repo with user id', async () => {
    const userId = 'aaa-aaa';
    const command = new DeleteBookingCommand(userId);
    await handler.execute(command);
    expect(repository.remove).toHaveBeenCalledWith(userId);
  });
});
