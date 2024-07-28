import { Injectable } from '@nestjs/common';
import { DrizzleService } from './drizzle/drizzle.service';
import {
  asc,
  between,
  count,
  eq,
  gte,
  PostTable,
  sql,
  userPreferenceTable,
  UserTable,
} from 'drizzle';

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

  async updateUser(id: string, age?: number, email?: string) {
    return this.drizzle.db
      .update(UserTable)
      .set({
        age,
        email,
      })
      .where(eq(UserTable.id, id))
      .returning({
        name: UserTable.name,
        age: UserTable.age,
        email: UserTable.email,
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

  async createPost(authorId: string, title: string) {
    return this.drizzle.db
      .insert(PostTable)
      .values({
        authorId,
        title,
      })
      .returning({
        id: PostTable.id,
        authorId: PostTable.authorId,
        title: PostTable.title,
      });
  }

  async getPosts(authorId: string) {
    return this.drizzle.db
      .select({
        authorId: PostTable.authorId,
        authorName: UserTable.name,
        title: PostTable.title,
      })
      .from(PostTable)
      .where(eq(PostTable.authorId, authorId))
      .leftJoin(UserTable, eq(UserTable.id, PostTable.authorId));
  }

  async getAuthorPostCount(withCountAtLeast = 0) {
    return (
      this.drizzle.db
        .select({
          id: UserTable.id,
          name: UserTable.name,
          count: count(PostTable.id),
        })
        .from(UserTable)
        .leftJoin(PostTable, eq(PostTable.authorId, UserTable.id))
        .groupBy(UserTable.id)
        // .having(eq(PostTable.id, 'uuid'))
        .having((columns) => gte(columns.count, withCountAtLeast))
    );
  }

  async deletePost(postId: string) {
    return this.drizzle.db
      .delete(PostTable)
      .where(eq(PostTable.id, postId))
      .returning({
        id: PostTable.id,
        authorId: PostTable.authorId,
        title: PostTable.title,
      });
  }
}
