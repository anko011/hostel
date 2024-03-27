import { IQuery } from '@nestjs/cqrs';
import { Booking } from '@/bookings/application/entities';

export class GetBookingByIdQuery implements IQuery {
  constructor(public readonly id: Booking['id']) {}
}
