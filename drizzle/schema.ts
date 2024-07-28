import { relations } from 'drizzle-orm';
import {
  serial,
  timestamp,
  pgTable,
  pgEnum,
  varchar,
  integer,
  index,
  unique,
  boolean,
  uuid,
  real,
  primaryKey,
  text,
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
    // drizzle relations `one-to-one` does not enforce uniqueness in the database
    // need to explicitly declare `unique` or `primaryKey` here
    .unique()
    // database level reference
    .references(() => UserTable.id)
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

// RELATIONS (drizzle level references)

export const UserTableRelations = relations(UserTable, ({ one, many }) => {
  return {
    preference: one(userPreferenceTable),
    posts: many(PostTable),
  };
});

export const UserPreferenceTableRelations = relations(
  userPreferenceTable,
  ({ one }) => {
    return {
      user: one(UserTable, {
        fields: [userPreferenceTable.userId],
        references: [UserTable.id],
      }),
    };
  },
);

export const PostTableRelations = relations(PostTable, ({ one, many }) => {
  return {
    author: one(UserTable, {
      fields: [PostTable.authorId],
      references: [UserTable.id],
    }),
    postCategories: many(PostCategoryTable),
  };
});

export const CategoryTableRelations = relations(CategoryTable, ({ many }) => {
  return { postCategories: many(PostCategoryTable) };
});

export const PostCategoryTableRelations = relations(
  PostCategoryTable,
  ({ one }) => {
    return {
      post: one(PostTable, {
        fields: [PostCategoryTable.postId],
        references: [PostTable.id],
      }),
      category: one(CategoryTable, {
        fields: [PostCategoryTable.categoryId],
        references: [CategoryTable.id],
      }),
    };
  },
);
