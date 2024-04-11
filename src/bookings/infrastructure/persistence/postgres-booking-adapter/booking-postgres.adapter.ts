import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  READ_DB_TOKEN,
  WRITE_DB_TOKEN,
} from '@/core/infrastructure/persistence';
import {
  ReadBookingRepository,
  WriteBookingRepository,
} from '@/bookings/application/ports/persistence';

import { BookingMapper } from './mappers';
import { BookingEntity } from './entities';
import { ReadPostgresBookingRepository } from './booking-read.repository';
import { WritePostgresBookingRepository } from './booking-write.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity], READ_DB_TOKEN),
    TypeOrmModule.forFeature([BookingEntity], WRITE_DB_TOKEN),
  ],
  providers: [
    BookingMapper,
    {
      provide: ReadBookingRepository,
      useClass: ReadPostgresBookingRepository,
    },
    {
      provide: WriteBookingRepository,
      useClass: WritePostgresBookingRepository,
    },
  ],
  exports: [BookingMapper, WriteBookingRepository, ReadBookingRepository],
})
export class PostgresBookingsAdapter {}
