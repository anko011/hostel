import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBookingCommand } from '@/bookings/application/commands/update-booking.command';
import { WriteBookingRepository } from '@/bookings/application/ports/persistence';
import { Logger } from '@nestjs/common';
import { Booking } from '@/bookings/application/entities';

@CommandHandler(UpdateBookingCommand)
export class UpdateBookingCommandHandler
  implements ICommandHandler<UpdateBookingCommand>
{
  private readonly logger = new Logger(UpdateBookingCommandHandler.name);

  constructor(private readonly bookingRepository: WriteBookingRepository) {}

  execute(command: UpdateBookingCommand): Promise<Booking> {
    this.logger.log(`Process with command: ${JSON.stringify(command)}`);

    return this.bookingRepository.update(command);
  }
}
