import { DynamicModule, Logger, Module } from '@nestjs/common';

import { InMemoryModule } from '@/bookings/infrastructure/persistence/in-memory-booking-adapter/in-memory.module';

@Module({})
export class BookingPersistenceModule {
  private static readonly logger = new Logger(BookingPersistenceModule.name);

  static use(driver: 'in-memory' | 'postgres'): DynamicModule {
    BookingPersistenceModule.logger.log(`Started with driver: ${driver}`);
    return {
      module: BookingPersistenceModule,
      imports: [InMemoryModule],
      exports: [InMemoryModule],
    };
  }
}
