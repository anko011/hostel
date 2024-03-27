import { Module } from '@nestjs/common';
import { BookingRepository } from '@/bookings/application/ports/persistence';

import { InMemoryRepository } from './in-memory.repository';

@Module({
  providers: [
    {
      provide: BookingRepository,
      useClass: InMemoryRepository,
    },
  ],
  exports: [BookingRepository],
})
export class InMemoryModule {}
