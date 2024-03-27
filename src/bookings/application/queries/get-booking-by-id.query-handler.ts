import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBookingByIdQuery } from '@/bookings/application/queries/get-booking-by-id.query';
import { BookingRepository } from '@/bookings/application/ports/persistence';
import { Logger } from '@nestjs/common';
import { Booking } from '@/bookings/application/entities';

@QueryHandler(GetBookingByIdQuery)
export class GetBookingByIdQueryHandler
  implements IQueryHandler<GetBookingByIdQuery>
{
  private readonly logger = new Logger(GetBookingByIdQueryHandler.name);

  constructor(private readonly bookingRepository: BookingRepository) {}

  execute(query: GetBookingByIdQuery): Promise<Booking> {
    this.logger.log(`Process with query: ${JSON.stringify(query)}`);

    return this.bookingRepository.findOneById(query.id);
  }
}
