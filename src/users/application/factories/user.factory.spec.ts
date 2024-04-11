import { HashService } from '@app/hash';
import { UserFactory } from './user.factory';
import { Test } from '@nestjs/testing';
import { Role } from '@/roles/application/entities';
import { User } from '@/users/application/entities';

describe('UserFactory', () => {
  let factory: UserFactory;
  const rolesMethods = {
    [Role.USER]: 'createUser',
    [Role.MANAGER]: 'createManager',
    [Role.ADMIN]: 'createAdmin',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserFactory,
        {
          provide: HashService,
          useFactory: () => ({
            hash: jest
              .fn()
              .mockImplementation(async (hash: string) => `hashed_${hash}`),
          }),
        },
      ],
    }).compile();

    factory = module.get(UserFactory);
  });

  describe.each(Object.keys(rolesMethods))('Role %s', (role) => {
    const method = rolesMethods[role];
    const passedData = {
      firstName: 'firstName',
      secondName: 'secondName',
      login: 'login',
      password: 'password',
    };

    const createUser = async (): Promise<User> =>
      await factory[method](
        passedData.firstName,
        passedData.secondName,
        passedData.login,
        passedData.password,
      );

    it(`should have role ${role}`, async () => {
      const user = await createUser();
      expect(user.role).toEqual(role);
    });

    it('should have unique id', async () => {
      const user = await createUser();
      expect(user.id).toBeDefined();
    });

    it('should have passwordHash', async () => {
      const user = await createUser();
      expect(user.passwordHash).toBeDefined();
      expect(user.passwordHash).not.toEqual(passedData.password);
    });
  });
});
