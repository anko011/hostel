import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BookingEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  roomCount: number;

  @Column()
  pricePerDay: number;
}
