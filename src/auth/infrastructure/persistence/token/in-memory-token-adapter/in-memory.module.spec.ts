import { InMemoryTokenRepository } from './in-memory-token.repository';
import { test } from '@/auth/application/ports/persistence/token.repository._spec';

test(new InMemoryTokenRepository());
