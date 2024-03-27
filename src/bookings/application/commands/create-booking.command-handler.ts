import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Booking } from '@/bookings/application/entities';
import { BookingFactory } from '@/bookings/application/factories';

import { CreateBookingCommand } from './create-booking.command';
import { BookingRepository } from '@/bookings/application/ports/persistence';

@CommandHandler(CreateBookingCommand)
export class CreateBookingCommandHandler
  implements ICommandHandler<CreateBookingCommand>
{
  private readonly logger = new Logger(CreateBookingCommandHandler.name);

  constructor(
    private readonly bookingFactory: BookingFactory,
    private readonly bookingRepository: BookingRepository,
  ) {}

  async execute(command: CreateBookingCommand): Promise<Booking> {
    this.logger.log(`Process with command: ${JSON.stringify(command)}`);

    const entity = this.bookingFactory.create(
      command.title,
      command.description,
      command.roomCount,
      command.pricePerDay,
    );

    return await this.bookingRepository.save(entity);
  }
}
