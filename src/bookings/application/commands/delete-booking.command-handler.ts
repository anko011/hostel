import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BookingRepository } from '@/bookings/application/ports/persistence';
import { DeleteBookingCommand } from '@/bookings/application/commands/delete-booking.command';

@CommandHandler(DeleteBookingCommand)
export class DeleteBookingCommandHandler
  implements ICommandHandler<DeleteBookingCommand>
{
  private readonly logger = new Logger(DeleteBookingCommandHandler.name);

  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(command: DeleteBookingCommand): Promise<void> {
    this.logger.log(`Process with command: ${JSON.stringify(command)}`);

    return await this.bookingRepository.delete(command.id);
  }
}
