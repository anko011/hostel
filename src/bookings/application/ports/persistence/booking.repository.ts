import { Booking } from '@/bookings/application/entities';

export abstract class BookingRepository {
  abstract save(user: Booking): Promise<Booking>;

  abstract update(user: Pick<Booking, 'id'>): Promise<Booking>;

  abstract findAll(): Promise<Booking[]>;

  abstract findOneById(id: Booking['id']): Promise<Booking | null>;

  abstract getOneById(id: Booking['id']): Promise<Booking>;

  abstract delete(id: Booking['id']): Promise<void>;
}
