import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import InMemoryBookingAdapter from './in-memory-booking-adapter';
import PostgresBookingsAdapter from './postgres-booking-adapter';

@Module({})
export class BookingPersistenceModule {
  private static readonly adaptersModules = {
    'in-memory': InMemoryBookingAdapter,
    postgres: PostgresBookingsAdapter,
  };

  static register(adapter: 'in-memory' | 'postgres'): DynamicModule {
    const adapterModule = BookingPersistenceModule.adaptersModules[adapter];

    return {
      module: BookingPersistenceModule,
      imports: [ConfigModule, adapterModule],
      exports: [adapterModule],
    };
  }
}
