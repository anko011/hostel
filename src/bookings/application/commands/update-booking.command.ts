import { ICommand } from '@nestjs/cqrs';
import { Booking } from '@/bookings/application/entities';

export class UpdateBookingCommand implements ICommand {
  constructor(
    public readonly id: Booking['id'],
    public readonly title?: Booking['title'],
    public readonly description?: Booking['description'],
    public readonly roomCount?: Booking['roomCount'],
    public readonly pricePerDay?: Booking['pricePerDay'],
  ) {}
}
