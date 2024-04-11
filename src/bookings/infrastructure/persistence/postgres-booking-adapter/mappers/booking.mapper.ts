import { Injectable } from '@nestjs/common';

import { Booking } from '@/bookings/application/entities';
import { BookingEntity } from '../entities/';

@Injectable()
export class BookingMapper {
  toDomain(entity: BookingEntity): Booking {
    return new Booking(
      entity.id,
      entity.title,
      entity.description,
      entity.roomCount,
      entity.pricePerDay,
    );
  }

  toPersistence(booking: Booking): BookingEntity {
    const entity = new BookingEntity();
    entity.id = booking.id;
    entity.title = booking.title;
    entity.description = booking.description;
    entity.roomCount = booking.roomCount;
    entity.pricePerDay = booking.pricePerDay;
    return entity;
  }
}
