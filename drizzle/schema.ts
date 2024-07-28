import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const UserRole = pgEnum('userRole', ['ADMIN', 'BASIC']);

export const UserTable = pgTable(
  'user',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    age: integer('age').notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    role: text('role').$type<'admin' | 'basic'>(),
    userRole: UserRole('userRole').default('BASIC'),
  },
  (table) => {
    return {
      emailIndex: index('emailIndex').on(table.email),
      uniqueNameAndAge: unique('uniqueNameAndAge').on(table.name, table.age),
    };
  },
);

export const userPreferenceTable = pgTable('userPreference', {
  id: serial('id'),
  emailUpdatable: boolean('emailUpdatable').notNull().default(false),
  userId: uuid('userId')
    .unique()
    .references(() => UserTable.id) // database level reference
    .notNull(),
});

export const PostTable = pgTable('post', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  averageRating: real('averageRating').notNull().default(0),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  authorId: uuid('authorId')
    .references(() => UserTable.id)
    .notNull(),
});

export const CategoryTable = pgTable('category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const PostCategoryTable = pgTable(
  'postCategory',
  {
    postId: uuid('postId')
      .references(() => PostTable.id)
      .notNull(),
    categoryId: uuid('categoryId')
      .references(() => CategoryTable.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.categoryId] }),
    };
  },
);
