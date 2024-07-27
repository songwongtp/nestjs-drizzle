import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { DATABASE_URL } from 'env';
import postgres from 'postgres';

// for migrations
const migrationClient = postgres(DATABASE_URL, { max: 1 });

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: './drizzle/migrations',
  });
  await migrationClient.end();
}
main();
