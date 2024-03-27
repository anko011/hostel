import { ICommand } from '@nestjs/cqrs';

export class RefreshCommand implements ICommand {
  constructor(public readonly token: string) {}
}
