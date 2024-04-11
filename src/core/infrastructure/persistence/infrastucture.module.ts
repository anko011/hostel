import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReadDbConfig, WriteDbConfig } from '@/core/infrastructure/config';

import { READ_DB_TOKEN } from './read.repository';
import { WRITE_DB_TOKEN } from './write.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(ReadDbConfig)],
      name: READ_DB_TOKEN,
      inject: [ReadDbConfig.KEY],
      useFactory: (config: ConfigType<typeof ReadDbConfig>) => ({
        type: 'postgres',
        host: config.READ_DB_HOST,
        port: config.READ_DB_PORT,
        username: config.READ_DB_USERNAME,
        password: config.READ_DB_PASSWORD,
        database: config.READ_DB_NAME,
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(WriteDbConfig)],
      name: WRITE_DB_TOKEN,
      inject: [WriteDbConfig.KEY],
      useFactory: (config: ConfigType<typeof WriteDbConfig>) => ({
        type: 'postgres',
        host: config.WRITE_DB_HOST,
        port: config.WRITE_DB_PORT,
        username: config.WRITE_DB_USERNAME,
        password: config.WRITE_DB_PASSWORD,
        database: config.WRITE_DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class CoreStoragePersistenceModule {}
