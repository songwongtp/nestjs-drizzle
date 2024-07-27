import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase, schema } from 'drizzle';

export const DRIZZLE_INJECTION_TOKEN = 'DRIZZLE_INJECTION_TOKEN';

@Injectable()
export class DrizzleService {
  constructor(
    @Inject(DRIZZLE_INJECTION_TOKEN)
    readonly db: PostgresJsDatabase<typeof schema>,
  ) {}
}
