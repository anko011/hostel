import { Role } from '@/roles/application/entities/role';

export class User {
  constructor(
    private readonly _id: string,
    private readonly _firstName: string,
    private readonly _secondName: string,
    private readonly _login: string,
    private readonly _passwordHash: string,
    private readonly _role: Role,
  ) {}

  get id(): string {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get secondName(): string {
    return this._secondName;
  }

  get login(): string {
    return this._login;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  get role(): Role {
    return this._role;
  }
}
