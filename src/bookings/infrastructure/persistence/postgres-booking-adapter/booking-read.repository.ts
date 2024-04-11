import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { READ_DB_TOKEN } from '@/core/infrastructure/persistence';

import { Booking } from '@/bookings/application/entities';
import { ReadBookingRepository } from '@/bookings/application/ports/persistence';

import { BookingEntity } from './entities';
import { BookingMapper } from './mappers';
import { NotExistsBookingException } from '@/bookings/application/exceptions';

@Injectable()
export class ReadPostgresBookingRepository implements ReadBookingRepository {
  constructor(
    @InjectRepository(BookingEntity, READ_DB_TOKEN)
    protected readonly db: Repository<BookingEntity>,
    protected readonly bookingMapper: BookingMapper,
  ) {}

  async findAll(): Promise<Booking[]> {
    const entities = await this.db.find();
    return entities.map((entity) => this.bookingMapper.toDomain(entity));
  }

  async findOneById(id: Booking['id']): Promise<Booking> {
    const entity = await this.db.findOneBy({ id });
    return this.bookingMapper.toDomain(entity);
  }

  async getOneById(id: Booking['id']): Promise<Booking> {
    const entity = await this.findOneById(id);
    if (!entity)
      throw new NotExistsBookingException(`Booking with id: ${id} not exists`);

    return this.bookingMapper.toDomain(entity);
  }
}
