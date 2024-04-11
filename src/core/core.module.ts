import { Module } from '@nestjs/common';
import { ConditionalModule, ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CoreStoragePersistenceModule } from '@/core/infrastructure/persistence';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule.forRoot(),
    ConditionalModule.registerWhen(
      CoreStoragePersistenceModule,
      (env) => env['IN_MEMORY'] === 'false',
    ),
  ],
})
export class CoreModule {}
