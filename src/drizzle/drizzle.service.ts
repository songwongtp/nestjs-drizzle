import {
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DrizzleWithClient } from 'drizzle';

export const DRIZZLE_INJECTION_TOKEN = 'DRIZZLE_INJECTION_TOKEN';

@Injectable()
export class DrizzleService implements OnApplicationShutdown {
  private readonly logger = new Logger(DrizzleService.name);

  readonly db: DrizzleWithClient['db'];
  private readonly client: DrizzleWithClient['client'];
  // NOTE: cannot use `NewDrizzleWithClient` in constructor since it is async
  constructor(
    @Inject(DRIZZLE_INJECTION_TOKEN)
    { db, client }: DrizzleWithClient,
  ) {
    this.db = db;
    this.client = client;
    this.logger.log('Database initialized');
  }

  async onApplicationShutdown(signal?: string) {
    this.logger.log(`Graceful Shutdown ${signal}`);
    await this.client.end();
  }
}
