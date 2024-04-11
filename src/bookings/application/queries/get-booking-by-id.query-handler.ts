import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { Booking } from '@/bookings/application/entities';
import { ReadBookingRepository } from '@/bookings/application/ports/persistence';

import { GetBookingByIdQuery } from './get-booking-by-id.query';

@QueryHandler(GetBookingByIdQuery)
export class GetBookingByIdQueryHandler
  implements IQueryHandler<GetBookingByIdQuery>
{
  private readonly logger = new Logger(GetBookingByIdQueryHandler.name);

  constructor(private readonly bookingRepository: ReadBookingRepository) {}

  execute(query: GetBookingByIdQuery): Promise<Booking> {
    this.logger.log(`Process with query: ${JSON.stringify(query)}`);

    return this.bookingRepository.findOneById(query.id);
  }
}
