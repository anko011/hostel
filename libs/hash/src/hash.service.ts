import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class HashService {
  compare(data: string, encrypted: string) {
    return compare(data, encrypted);
  }

  async hash(data: string) {
    const salt = await genSalt();
    return hash(data, salt);
  }
}
