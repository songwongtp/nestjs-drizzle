import { Module } from '@nestjs/common';

import { NewDrizzleClient } from 'drizzle/db';
import { DRIZZLE_INJECTION_TOKEN, DrizzleService } from './drizzle.service';

@Module({
  providers: [
    {
      provide: DRIZZLE_INJECTION_TOKEN,
      useFactory: NewDrizzleClient,
    },
    DrizzleService,
  ],
  exports: [DrizzleService],
})
export class DrizzleModule {}
