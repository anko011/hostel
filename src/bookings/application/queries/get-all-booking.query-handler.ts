import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBookingQuery } from '@/bookings/application/queries/get-all-booking.query';
import { BookingRepository } from '@/bookings/application/ports/persistence';
import { Booking } from '@/bookings/application/entities';
import { Logger } from '@nestjs/common';

@QueryHandler(GetAllBookingQuery)
export class GetAllBookingQueryHandler
  implements IQueryHandler<GetAllBookingQuery>
{
  constructor(private readonly bookingRepository: BookingRepository) {}

  private readonly logger = new Logger(GetAllBookingQueryHandler.name);

  execute(query: GetAllBookingQuery): Promise<Booking[]> {
    this.logger.log(`Process with query: ${JSON.stringify(query)}`);

    return this.bookingRepository.findAll();
  }
}
