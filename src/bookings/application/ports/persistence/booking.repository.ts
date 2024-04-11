import { Booking } from '@/bookings/application/entities';
import {
  ReadRepository,
  WriteRepository,
} from '@/core/infrastructure/persistence';

export abstract class ReadBookingRepository extends ReadRepository<Booking> {}

export abstract class WriteBookingRepository extends WriteRepository<Booking> {}
