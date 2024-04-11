import { Module } from '@nestjs/common';

import { BookingFactory } from '@/bookings/application/factories';
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

import { BookingPersistenceModule } from '@/bookings/infrastructure/persistence/';

export const handlers = [
  CreateBookingCommandHandler,
  UpdateBookingCommandHandler,
  DeleteBookingCommandHandler,
  GetAllBookingQueryHandler,
  GetBookingByIdQueryHandler,
];

@Module({
  imports: [BookingPersistenceModule.register('postgres'), BookingHttpModule],
  providers: [BookingFactory, ...handlers],
  exports: [BookingPersistenceModule],
})
export class BookingsModule {}
