import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';

import { Role } from '@/roles/application/entities/';
import { Roles } from '@/roles/presentation/http/decorators';

import {
  GetAllUsersQuery,
  GetUserByIdQuery,
} from '@/users/application/queries';

import {
  DeleteUserByIdCommand,
  UpdateUserByIdCommand,
} from '@/users/application/commands';

import { User } from '@/users/application/entities/';
import { NotExistUserException } from '@/users/application/exceptions';

import { UpdateUserRequest, UserResponse } from '../dto';

@ApiBearerAuth()
@Roles(Role.ADMIN)
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.commandBus.execute(new DeleteUserByIdCommand(id));
    } catch (e) {
      if (e instanceof NotExistUserException)
        throw new NotFoundException(e.message);

      throw e;
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    try {
      const data = await this.queryBus.execute<
        GetAllUsersQuery,
        Promise<User[]>
      >(new GetAllUsersQuery());
      return data.map((user) => new UserResponse(user));
    } catch (e) {
      throw e;
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.queryBus.execute(new GetUserByIdQuery(id));
      return new UserResponse(data);
    } catch (e) {
      throw e;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() request: UpdateUserRequest) {
    const { firstName, secondName } = request;
    try {
      const data = await this.commandBus.execute(
        new UpdateUserByIdCommand({ id, firstName, secondName }),
      );

      return new UserResponse(data);
    } catch (e) {
      throw e;
    }
  }
}
