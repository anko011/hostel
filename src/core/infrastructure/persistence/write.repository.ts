import { ReadRepository } from './read.repository';

export const WRITE_DB_TOKEN = 'WRITE_DB_TOKEN';

export abstract class WriteRepository<
  T extends { id: string },
> extends ReadRepository<T> {
  abstract save(entity: T): Promise<T>;

  abstract update(entity: Pick<T, 'id'> & Partial<T>): Promise<T>;

  abstract remove(entity: T['id']): Promise<void>;
}
