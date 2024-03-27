import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { SignInCommand, SignUpCommand } from '@/auth/application/commands';
import {
  ExistsUserException,
  IncorrectCredentialsException,
  NotExistsTokenException,
} from '@/auth/application/exceptions';

import { RefreshRequest, SignInRequest, SignUpRequest } from '../dtos';
import { Public } from '@/auth/presentation/http/decorators';
import { RefreshCommand } from '@/auth/application/commands/refresh.command';
import { TokenExpiredError } from '@nestjs/jwt';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('signup')
  async signUp(@Body() registrationDto: SignUpRequest) {
    try {
      return await this.commandBus.execute(
        new SignUpCommand(
          registrationDto.login,
          registrationDto.password,
          registrationDto.firstName,
          registrationDto.secondName,
        ),
      );
    } catch (e) {
      if (e instanceof ExistsUserException)
        throw new BadRequestException(e.message);

      throw e;
    }
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInRequest) {
    try {
      return await this.commandBus.execute(
        new SignInCommand(signInDto.login, signInDto.password),
      );
    } catch (e) {
      if (e instanceof IncorrectCredentialsException)
        throw new UnauthorizedException('Incorrect credentials');

      throw e;
    }
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshRequest) {
    try {
      return await this.commandBus.execute(
        new RefreshCommand(dto.refreshToken),
      );
    } catch (e) {
      if (e instanceof NotExistsTokenException)
        throw new BadRequestException(e.message);

      if (e instanceof TokenExpiredError)
        throw new UnauthorizedException(e.message);

      throw e;
    }
  }
}
