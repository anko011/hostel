import { DynamicModule, Logger, Module } from '@nestjs/common';

import { InMemoryModule } from '@/auth/infrastructure/persistence/in-memory-token-adapter/in-memory.module';

@Module({})
export class TokenPersistenceModule {
  private static readonly logger = new Logger(TokenPersistenceModule.name);

  static use(driver: 'in-memory' | 'redis'): DynamicModule {
    TokenPersistenceModule.logger.log(`Started with driver: ${driver}`);
    return {
      module: TokenPersistenceModule,
      imports: [InMemoryModule],
      exports: [InMemoryModule],
    };
  }
}
