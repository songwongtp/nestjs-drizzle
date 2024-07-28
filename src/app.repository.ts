import { Injectable } from '@nestjs/common';
import { DrizzleService } from './drizzle/drizzle.service';
import { asc, between, sql, userPreferenceTable, UserTable } from 'drizzle';

@Injectable()
export class AppRepository {
  constructor(private drizzle: DrizzleService) {}

  async createUser(name: string, age: number, email: string) {
    return this.drizzle.db
      .insert(UserTable)
      .values({
        name,
        age,
        email,
        role: 'admin',
        userRole: 'ADMIN',
      })
      .returning({
        id: UserTable.id,
      });
  }

  async saveUserPreference(userId: string, emailUpdatable: boolean) {
    return this.drizzle.db
      .insert(userPreferenceTable)
      .values({
        emailUpdatable,
        userId,
      })
      .onConflictDoUpdate({
        target: userPreferenceTable.userId,
        set: { emailUpdatable },
      })
      .returning({
        userId: userPreferenceTable.userId,
        emailUpdatable: userPreferenceTable.emailUpdatable,
      });
  }

  async getUsers() {
    // `query` - prisma like syntax for select
    return this.drizzle.db.query.UserTable.findMany({
      columns: { id: true, name: true },
      with: {
        preference: true,
        posts: {
          with: { postCategories: true },
        },
      },
      extras: {
        lowerCaseName: sql<string>`lower(${UserTable.name})`.as(
          'lowerCaseName',
        ),
      },
      orderBy: asc(UserTable.age),
      // orderBy: (table, funcs) => funcs.asc(table.age),
      where: between(UserTable.age, 20, 25),
      // where: (table, funcs) => funcs.between(table.age, 20, 25),
      offset: 0,
      limit: 100,
    });
  }
}
