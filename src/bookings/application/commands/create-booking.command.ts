import { ICommand } from '@nestjs/cqrs';

export class CreateBookingCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly roomCount: number,
    public readonly pricePerDay: number,
  ) {}
}
