import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { WriteBookingRepository } from '@/bookings/application/ports/persistence';

import { DeleteBookingCommand } from './delete-booking.command';

@CommandHandler(DeleteBookingCommand)
export class DeleteBookingCommandHandler
  implements ICommandHandler<DeleteBookingCommand>
{
  private readonly logger = new Logger(DeleteBookingCommandHandler.name);

  constructor(private readonly bookingRepository: WriteBookingRepository) {}

  async execute(command: DeleteBookingCommand): Promise<void> {
    this.logger.log(`Process with command: ${JSON.stringify(command)}`);

    return await this.bookingRepository.remove(command.id);
  }
}
