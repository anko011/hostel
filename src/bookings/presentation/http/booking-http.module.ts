import { Module } from '@nestjs/common';
import { BookingController } from '@/bookings/presentation/http/controllers/booking.controller';

@Module({
  controllers: [BookingController],
})
export class BookingHttpModule {}
