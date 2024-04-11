import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { Booking } from '@/bookings/application/entities';
import { ReadBookingRepository } from '@/bookings/application/ports/persistence';

import { GetAllBookingQuery } from './get-all-booking.query';

@QueryHandler(GetAllBookingQuery)
export class GetAllBookingQueryHandler
  implements IQueryHandler<GetAllBookingQuery>
{
  constructor(private readonly bookingRepository: ReadBookingRepository) {}

  private readonly logger = new Logger(GetAllBookingQueryHandler.name);

  execute(query: GetAllBookingQuery): Promise<Booking[]> {
    this.logger.log(`Process with query: ${JSON.stringify(query)}`);

    return this.bookingRepository.findAll();
  }
}
