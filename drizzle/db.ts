import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import * as postgres from 'postgres';
import { DATABASE_URL } from 'env';

export function NewDrizzleClient() {
  const client = postgres(DATABASE_URL);
  return drizzle(client, { schema, logger: true });
}
