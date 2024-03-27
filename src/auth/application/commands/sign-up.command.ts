import { ICommand } from '@nestjs/cqrs';

export class SignUpCommand implements ICommand {
  constructor(
    public readonly login: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly secondName: string,
  ) {}
}
