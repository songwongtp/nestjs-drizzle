import { Injectable } from '@nestjs/common';
import { DrizzleService } from './drizzle/drizzle.service';
import { UserTable } from 'drizzle/schema';

@Injectable()
export class AppRepository {
  constructor(private drizzle: DrizzleService) {}

  async createUser(name: string, age: number, email: string) {
    const newUser: typeof UserTable.$inferInsert = {
      name,
      age,
      email,
      role: 'admin',
      userRole: 'ADMIN',
    };
    return this.drizzle.db.insert(UserTable).values(newUser).returning({
      id: UserTable.id,
    });
  }
}
