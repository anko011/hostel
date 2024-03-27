import { ICommand } from '@nestjs/cqrs';

export class SignInCommand implements ICommand {
  constructor(
    public readonly login: string,
    public readonly password: string,
  ) {}
}
