import { Injectable } from '@nestjs/common';
import { ITokenRepository } from '@/auth/application/ports/persistence';
import { SavedRefreshToken } from '@/auth/application/entities';
import Redis from 'ioredis';
import { NotExistsTokenException } from '@/auth/application/exceptions';

@Injectable()
export class RedisTokenRepository implements ITokenRepository {
  private static readonly AUTH_TOKEN = 'AUTH_TOKENS';

  constructor(private readonly client: Redis) {}

  async save(tokenInfo: SavedRefreshToken): Promise<SavedRefreshToken> {
    const tokensData = await this.getTokensData();
    tokensData.push(tokenInfo);
    await this.saveTokensData(tokensData);
    return tokenInfo;
  }

  async remove(token: string): Promise<void> {
    const tokensData = await this.getTokensData();

    const existingTokens = tokensData.find(
      ({ token: exToken }) => exToken === token,
    );

    if (!existingTokens) throw new NotExistsTokenException();

    await this.saveTokensData(
      tokensData.filter(({ token: exToken }) => exToken !== token),
    );
  }

  async getAllByUserId(userId: string): Promise<SavedRefreshToken[]> {
    const tokensData = await this.getTokensData();
    return tokensData.filter(({ userId: exUserId }) => exUserId === userId);
  }

  private async getTokensData() {
    const tokensMap = await this.client.get(RedisTokenRepository.AUTH_TOKEN);
    const tokensData: SavedRefreshToken[] = tokensMap
      ? JSON.parse(tokensMap)
      : [];

    return tokensData;
  }

  private saveTokensData(data: SavedRefreshToken[]) {
    return this.client.set(
      RedisTokenRepository.AUTH_TOKEN,
      JSON.stringify(data),
    );
  }
}
