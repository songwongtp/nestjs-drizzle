import { Injectable } from '@nestjs/common';
import { DrizzleService } from './drizzle/drizzle.service';
import { sql, UserTable } from 'drizzle';

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

  async getUsers() {
    // `query` - prisma like syntax for select
    return this.drizzle.db.query.UserTable.findMany({
      columns: { name: true },
      extras: {
        lowerCaseName: sql<string>`lower(${UserTable.name})`.as(
          'lowerCaseName',
        ),
      },
      // offset: 0,
      // limit: 1,
    });
  }
}
