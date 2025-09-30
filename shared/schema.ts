import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Mock data types for the cat feeder (client-side only for now)
export type FeedingSchedule = {
  id: string;
  time: string;
  enabled: boolean;
};

export type FeedingHistory = {
  id: string;
  time: string;
  status: 'Fed' | 'Skipped' | 'Failed';
  timestamp: Date;
};

export type UserProfile = {
  petName: string;
  ownerName: string;
  email: string;
  notificationsEnabled: boolean;
  language: string;
};
