import { Exclude } from 'class-transformer';
import { User } from '@/users/application/entities/user';

export class UserResponse {
  id: string;
  firstName: string;
  secondName: string;

  @Exclude()
  passwordHash: string;

  @Exclude()
  login: string;

  constructor(partial: Partial<User>) {
    Object.keys(partial).forEach((key) => {
      const value = partial[key];
      const newKey = key.replace('_', '');
      if (value) this[newKey] = partial[key];
    });
  }
}
