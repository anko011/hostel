import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingRequest } from './create-booking.request';

export class UpdateBookingRequest extends PartialType(CreateBookingRequest) {}
