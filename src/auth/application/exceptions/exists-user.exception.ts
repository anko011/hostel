import { User } from '@/users/application/entities/user';

export class ExistsUserException extends Error {
  constructor(user: User | string) {
    const login = typeof user === 'string' ? user : user.login;
    super(`User with login: ${login} is exists`);
    Object.setPrototypeOf(this, ExistsUserException.prototype);
  }
}
