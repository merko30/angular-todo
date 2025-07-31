import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const post = pgTable("post", {
  id: uuid().primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  body: text("body").notNull(),
  slug: text("slug").notNull(),
  image: text("image"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const tag = pgTable("tag", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const postTag = pgTable("postTag", {
  id: serial("id").primaryKey(),
  tagId: serial("tag_id")
    .notNull()
    .references(() => tag.id, { onDelete: "cascade" }),
  postId: uuid("post_id")
    .notNull()
    .references(() => post.id, { onDelete: "no action" }),
});

export const comment = pgTable("comment", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  postId: uuid("post_id")
    .notNull()
    .references(() => post.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

// Relations
export const userRelations = relations(user, ({ one, many }) => ({
  posts: many(post),
  comments: many(comment),
  sessions: many(session),
  accounts: many(account),
}));

export const postRelations = relations(post, ({ one, many }) => ({
  user: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
  comments: many(comment),
  tags: many(postTag),
}));

export const commentRelations = relations(comment, ({ one }) => ({
  user: one(user, {
    fields: [comment.userId],
    references: [user.id],
  }),
  post: one(post, {
    fields: [comment.postId],
    references: [post.id],
  }),
}));

export const tagRelations = relations(tag, ({ many }) => ({
  postTags: many(postTag),
}));

export const postTagRelations = relations(postTag, ({ one }) => ({
  post: one(post, {
    fields: [postTag.postId],
    references: [post.id],
  }),
  tag: one(tag, {
    fields: [postTag.tagId],
    references: [tag.id],
  }),
}));
