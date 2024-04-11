import { Module } from '@nestjs/common';

import { CoreModule } from '@/core/';
import { UsersModule } from '@/users/';
import { BookingsModule } from '@/bookings';
import { AuthModule } from '@/auth';
import { RolesModule } from '@/roles';

@Module({
  imports: [CoreModule, UsersModule, BookingsModule, AuthModule, RolesModule],
})
export class AppModule {}
