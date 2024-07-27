import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  migrations: {
    prefix: 'supabase',
  },
  verbose: true,
  strict: true,
});
