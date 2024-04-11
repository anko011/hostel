import { SavedRefreshToken } from '@/auth/application/entities/';

export abstract class ITokenRepository {
  abstract save(token: SavedRefreshToken): Promise<SavedRefreshToken>;

  abstract remove(token: string): Promise<void>;

  abstract getAllByUserId(userId: string): Promise<SavedRefreshToken[]>;
}
