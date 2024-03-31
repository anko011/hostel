import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import TokenConfig from '@/auth/application/configs/token.config';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { User } from '@/users/application/entities/user';
import { TokenRepository } from '@/auth/application/ports/persistence';

@Injectable()
export class TokenService {
  private readonly jwtService: JwtService;

  constructor(
    @Inject(TokenConfig.KEY)
    private readonly tokenConfig: ConfigType<typeof TokenConfig>,
    private readonly tokenRepository: TokenRepository,
  ) {
    this.jwtService = new JwtService({
      secret: tokenConfig.tokenSecret,
      signOptions: {
        expiresIn: tokenConfig.accessTokenTTL_SEC + 's',
      },
    });
  }

  createRefreshToken(payload: object) {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.tokenConfig.refreshTokenTTL_SEC + 's',
    });
  }

  createAccessToken(payload: object) {
    return this.jwtService.signAsync(payload);
  }

  verify(
    token: string,
  ): Promise<Record<'id' | 'firstName' | 'secondName', string>> {
    return this.jwtService.verifyAsync(token);
  }

  async clearExpiredTokens(user: User) {
    const tokens = await this.tokenRepository.getAllByUserId(user.id);
    tokens.forEach(({ token }) => {
      try {
        this.verify(token);
      } catch (e) {
        if (e instanceof TokenExpiredError) {
          this.tokenRepository.remove(token);
        }
      }
    });
  }

  async removeToken(token: string) {
    return this.tokenRepository.remove(token);
  }

  async generateTokens(user: User) {
    const newAccessToken = this.createAccessToken({
      id: user.id,
      firstName: user.firstName,
      secondName: user.secondName,
    });

    const newRefreshToken = this.createRefreshToken({
      id: user.id,
    });

    const [accessToken, refreshToken] = await Promise.all([
      newAccessToken,
      newRefreshToken,
    ]);

    await this.tokenRepository.save({
      userId: user.id,
      token: refreshToken,
    });

    return { accessToken, refreshToken };
  }
}
