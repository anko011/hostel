import { DynamicModule, Module } from '@nestjs/common';
import { InMemoryUsersAdapter } from '@/users/infrastructure/persistence/in-memory-users-adapter';
import { PostgresUsersAdapter } from '@/users/infrastructure/persistence/postgres-users-adapter';

@Module({})
export class UsersPersistenceModule {
  private static readonly ADAPTERS_MODULES = {
    'in-memory': InMemoryUsersAdapter,
    postgres: PostgresUsersAdapter,
  };

  static register(adapter: 'in-memory' | 'postgres'): DynamicModule {
    const adapterModule = UsersPersistenceModule.ADAPTERS_MODULES[adapter];
    return {
      module: UsersPersistenceModule,
      imports: [adapterModule],
      exports: [adapterModule],
    };
  }
}
