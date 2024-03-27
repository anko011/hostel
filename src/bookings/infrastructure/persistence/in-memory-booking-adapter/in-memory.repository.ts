import { Injectable } from '@nestjs/common';

import { Booking } from '@/bookings/application/entities';
import { BookingRepository } from '@/bookings/application/ports/persistence';
import { NotExistsBookingException } from '@/bookings/application/exceptions';

@Injectable()
export class InMemoryRepository implements BookingRepository {
  private bookings: Booking[] = [];

  async save(booking: Booking): Promise<Booking> {
    const existing = await this.findOneById(booking.id);
    if (existing) return this.update(booking);
    this.bookings.push(booking as unknown as Booking);
    return booking;
  }

  async update(
    booking: Pick<Booking, 'id'> & Partial<Booking>,
  ): Promise<Booking> {
    const existing = await this.findOneById(booking.id);
    if (!existing)
      throw new NotExistsBookingException(
        `Booking with id: ${booking.id} not exists`,
      );

    Object.keys(booking).forEach((key) => {
      const value = booking[key];
      if (value) existing['_' + key] = booking[key];
    });

    return existing;
  }

  async delete(id: Booking['id']): Promise<void> {
    const existing = await this.findOneById(id);
    if (!existing)
      throw new NotExistsBookingException(
        `Booking with id: ${id} is not exists`,
      );

    this.bookings = this.bookings.filter((booking) => booking.id !== id);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookings;
  }

  async findOneById(id: Booking['id']): Promise<Booking> {
    const booking = this.bookings.find((booking) => booking.id === id);
    return booking ? booking : null;
  }

  async getOneById(id: Booking['id']): Promise<Booking> {
    const booking = await this.findOneById(id);
    if (!booking)
      throw new NotExistsBookingException(`Booking with id: ${id} not exists`);

    return booking;
  }
}
