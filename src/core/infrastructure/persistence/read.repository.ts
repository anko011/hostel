export const READ_DB_TOKEN = 'READ_DB_TOKEN';

export abstract class ReadRepository<T extends { id: string }> {
  abstract findAll(): Promise<T[]>;

  abstract findOneById(id: T['id']): Promise<T | null>;

  abstract getOneById(id: T['id']): Promise<T>;
}
