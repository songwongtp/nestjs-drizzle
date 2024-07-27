import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AppRepository } from './app.repository';

@Module({
  imports: [DrizzleModule],
  controllers: [AppController],
  providers: [AppRepository, AppService],
})
export class AppModule {}
