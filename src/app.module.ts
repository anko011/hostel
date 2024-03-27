import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '@/users/';
import { AuthModule } from '@/auth/';
import { BookingsModule } from '@/bookings/';
import { RolesModule } from '@/roles/';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule.forRoot(),
    AuthModule,
    UsersModule,
    BookingsModule,
    RolesModule,
  ],
})
export class AppModule {}
