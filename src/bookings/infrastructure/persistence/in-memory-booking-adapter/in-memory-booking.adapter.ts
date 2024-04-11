import { Module } from '@nestjs/common';
import {
  ReadBookingRepository,
  WriteBookingRepository,
} from '@/bookings/application/ports/persistence';

import { InMemoryBookingRepository } from './in-memory-booking.repository';

@Module({
  providers: [
    InMemoryBookingRepository,
    {
      provide: ReadBookingRepository,
      useClass: InMemoryBookingRepository,
    },
    {
      provide: WriteBookingRepository,
      useExisting: InMemoryBookingRepository,
    },
  ],
  exports: [
    ReadBookingRepository,
    WriteBookingRepository,
    InMemoryBookingRepository,
  ],
})
export class InMemoryBookingAdapter {}
