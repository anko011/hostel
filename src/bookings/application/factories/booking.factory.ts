import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Booking } from '@/bookings/application/entities';
import { InvalidBookingAttributeException } from '@/bookings/application/exceptions';

@Injectable()
export class BookingFactory {
  create(
    title: string,
    description: string,
    roomCount: number,
    pricePerDay: number,
  ) {
    const id = randomUUID();
    if (roomCount <= 0 || pricePerDay <= 0)
      throw new InvalidBookingAttributeException(
        `RoomCount and PricePerDay must be better than zero`,
      );

    return new Booking(id, title, description, roomCount, pricePerDay);
  }
}
