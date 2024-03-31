import { InMemoryRepository } from './in-memory.repository';
import { test } from '@/auth/application/ports/persistence/token.repository._spec';

test(new InMemoryRepository());
