import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Role } from '@/roles/application/entities';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column()
  login: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
