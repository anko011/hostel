import { ITokenRepository } from '@/auth/application/ports/persistence';
import { SavedRefreshToken } from '@/auth/application/entities';
import { NotExistsTokenException } from '@/auth/application/exceptions';

export const test = (repository: ITokenRepository) => {
  describe('InMemoryTokenRepositoryAdapter', () => {
    const mock: SavedRefreshToken = {
      userId: '123',
      token: 'tok.tok.tok',
    };

    it('should be define', () => {
      expect(repository).toBeDefined();
    });

    describe('save', () => {
      it('should be return the passed data', async () => {
        const actual = await repository.save(mock);
        expect(actual).toBe(mock);
      });
    });

    describe('remove', () => {
      it('should remove by token', async () => {
        const actual = await repository.save(mock);
        expect(actual).toBe(mock);

        await repository.remove(actual.token);

        const tokens = await repository.getAllByUserId(actual.userId);
        expect(tokens).toStrictEqual([]);
      });

      it('should rise exception if passed not exists token', async () => {
        try {
          await repository.remove('');
        } catch (e) {
          expect(e).toBeInstanceOf(NotExistsTokenException);
        }
      });
    });

    describe('getAllByUserId', () => {});
  });
};
