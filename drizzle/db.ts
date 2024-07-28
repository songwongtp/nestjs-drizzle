import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import * as postgres from 'postgres';
import { DATABASE_URL } from 'env';

export interface DrizzleWithClient {
  db: PostgresJsDatabase<typeof schema>;
  client: postgres.Sql;
}

// NOTE: might need to be async for some other driver packages
// e.g. https://orm.drizzle.team/docs/get-started-postgresql#node-postgres
export async function NewDrizzleWithClient(): Promise<DrizzleWithClient> {
  const client = postgres(DATABASE_URL);
  const db = drizzle(client, { schema, logger: true });
  return { db, client };
}
