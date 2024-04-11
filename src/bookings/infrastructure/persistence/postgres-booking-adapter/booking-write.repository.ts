import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking } from '@/bookings/application/entities';
import { WriteBookingRepository } from '@/bookings/application/ports/persistence';

import { WRITE_DB_TOKEN } from '@/core/infrastructure/persistence';

import { ReadPostgresBookingRepository } from './booking-read.repository';
import { BookingEntity } from './entities';
import { BookingMapper } from './mappers';

@Injectable()
export class WritePostgresBookingRepository
  extends ReadPostgresBookingRepository
  implements WriteBookingRepository
{
  constructor(
    @InjectRepository(BookingEntity, WRITE_DB_TOKEN)
    writeRepository: Repository<BookingEntity>,
    bookingMapper: BookingMapper,
  ) {
    super(writeRepository, bookingMapper);
  }

  async save(booking: Booking): Promise<Booking> {
    const entity = this.bookingMapper.toPersistence(booking);
    const newEntity = await this.db.save(entity);
    return this.bookingMapper.toDomain(newEntity);
  }

  async update(
    booking: Pick<Booking, 'id'> & Partial<Booking>,
  ): Promise<Booking> {
    const newEntity = await this.db.save(booking);
    return this.bookingMapper.toDomain(newEntity);
  }

  async remove(id: Booking['id']): Promise<void> {
    await this.db.delete({ id });
  }
}
