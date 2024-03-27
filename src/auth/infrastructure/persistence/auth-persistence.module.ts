import { DynamicModule, Logger, Module } from '@nestjs/common';

import { InMemoryModule } from '@/auth/infrastructure/persistence/in-memory-token-adapter/in-memory.module';

@Module({})
export class AuthPersistenceModule {
  private static readonly logger = new Logger(AuthPersistenceModule.name);

  static use(driver: 'in-memory' | 'redis'): DynamicModule {
    AuthPersistenceModule.logger.log(`Started with driver: ${driver}`);
    return {
      module: AuthPersistenceModule,
      imports: [InMemoryModule],
      exports: [InMemoryModule],
    };
  }
}
