import { IQuery } from '@nestjs/cqrs';

import { User } from '@/users/application/entities';

export class UpdateUserByIdCommand implements IQuery {
  constructor(
    public readonly user: {
      id: User['id'];
      firstName?: User['firstName'];
      secondName?: User['secondName'];
    },
  ) {}
}
