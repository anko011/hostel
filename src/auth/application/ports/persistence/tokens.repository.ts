import { SavedRefreshToken } from '@/auth/application/entities/';

export abstract class TokensRepository {
  abstract save(token: SavedRefreshToken): Promise<SavedRefreshToken>;

  abstract remove(token: string): Promise<void>;

  abstract getAllByUserId(userId: string): Promise<SavedRefreshToken[]>;
}
