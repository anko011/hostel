import { DynamicModule, Logger, Module } from '@nestjs/common';

import { InMemoryModule } from './in-memory-users-adapter';

@Module({})
export class UsersPersistenceModule {
  private static readonly logger = new Logger(UsersPersistenceModule.name);

  static use(driver: 'in-memory' | 'orm'): DynamicModule {
    UsersPersistenceModule.logger.log(`Started with driver: ${driver}`);
    return {
      module: UsersPersistenceModule,
      imports: [InMemoryModule],
      exports: [InMemoryModule],
    };
  }
}
