import { Injectable } from '@nestjs/common';

import { SavedRefreshToken } from '@/auth/application/entities';
import { TokensRepository } from '@/auth/application/ports/persistence/';
import { NotExistsTokenException } from '@/auth/application/exceptions/';

@Injectable()
export class InMemoryRepository implements TokensRepository {
  private tokens: SavedRefreshToken[] = [];

  async save(token: SavedRefreshToken): Promise<SavedRefreshToken> {
    this.tokens.push(token);
    return token;
  }

  async remove(token: string): Promise<void> {
    const existingToken = this.tokens.find(
      ({ token: exToken }) => exToken === token,
    );

    if (!existingToken) throw new NotExistsTokenException();

    this.tokens = this.tokens.filter(({ token: exToken }) => exToken !== token);
  }

  async getAllByUserId(userId: string): Promise<SavedRefreshToken[]> {
    return this.tokens.filter(({ userId: exUserId }) => exUserId === userId);
  }
}
