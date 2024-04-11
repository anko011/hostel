import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { BookingPersistenceModule } from '@/bookings/infrastructure/persistence';
import { BookingHttpModule } from '@/bookings/presentation/http';
import { BookingFactory } from '@/bookings/application/factories';
import { handlers } from '@/bookings/bookings.module';
import { CqrsModule } from '@nestjs/cqrs';
import * as request from 'supertest';

describe('Bookings module', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        CqrsModule.forRoot(),
        BookingPersistenceModule.register('in-memory'),
        BookingHttpModule,
      ],
      providers: [BookingFactory, ...handlers],
      exports: [BookingPersistenceModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be return bookings', async () => {
    const booking = {
      title: '#Title',
      description: '#Description',
      roomCount: 1,
      pricePerDay: 1,
    };
    const response = await request(app.getHttpServer())
      .post('/bookings')
      .send(booking);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(booking);
    expect(response.body.id).toBeDefined();
  });
});
