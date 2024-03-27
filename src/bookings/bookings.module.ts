import { Module } from '@nestjs/common';

import { BookingFactory } from '@/bookings/application/factories';
import { BookingPersistenceModule } from '@/bookings/infrastructure/persistence/';
import { BookingHttpModule } from '@/bookings/presentation/http/';
import {
  CreateBookingCommandHandler,
  DeleteBookingCommandHandler,
  UpdateBookingCommandHandler,
} from '@/bookings/application/commands';
import {
  GetAllBookingQueryHandler,
  GetBookingByIdQueryHandler,
} from '@/bookings/application/queries';

const handlers = [
  CreateBookingCommandHandler,
  UpdateBookingCommandHandler,
  DeleteBookingCommandHandler,
  GetAllBookingQueryHandler,
  GetBookingByIdQueryHandler,
];

@Module({
  imports: [BookingPersistenceModule.use('in-memory'), BookingHttpModule],
  providers: [BookingFactory, ...handlers],
  exports: [BookingFactory, BookingPersistenceModule],
})
export class BookingsModule {}
