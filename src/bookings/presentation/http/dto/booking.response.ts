import { Booking } from '@/bookings/application/entities';

export class BookingResponse {
  constructor(booking: Partial<Booking>) {
    Object.keys(booking).forEach((key) => {
      const newKey = key.replace('_', '');
      this[newKey] = booking[key];
    });
  }
}
