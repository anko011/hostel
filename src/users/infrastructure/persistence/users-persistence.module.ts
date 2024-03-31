import { DynamicModule, Logger, Module } from '@nestjs/common';

import { InMemoryModule } from './in-memory-users-adapter';
import { DbModule } from './db-users-adapter';

@Module({})
export class UsersPersistenceModule {
  private static readonly logger = new Logger(UsersPersistenceModule.name);

  private static readonly drivers = new Map([
    ['in-memory', InMemoryModule],
    ['db', DbModule],
  ]);

  static use(driver: 'in-memory' | 'db'): DynamicModule {
    UsersPersistenceModule.logger.log(`Started with driver: ${driver}`);
    const module = UsersPersistenceModule.drivers.get(driver);
    return {
      module: UsersPersistenceModule,
      imports: [module],
      exports: [module],
    };
  }
}
