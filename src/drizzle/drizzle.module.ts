import { Module } from '@nestjs/common';

import { NewDrizzleWithClient } from 'drizzle/db';
import { DRIZZLE_INJECTION_TOKEN, DrizzleService } from './drizzle.service';

@Module({
  providers: [
    {
      provide: DRIZZLE_INJECTION_TOKEN,
      useFactory: NewDrizzleWithClient,
    },
    DrizzleService,
  ],
  exports: [DrizzleService],
})
export class DrizzleModule {}
