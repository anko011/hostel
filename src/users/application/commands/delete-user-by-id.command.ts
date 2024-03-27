import { IQuery } from '@nestjs/cqrs';

import { User } from '../entities';

export class DeleteUserByIdCommand implements IQuery {
  constructor(public readonly id: User['id']) {}
}
