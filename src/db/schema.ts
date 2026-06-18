// ============================================================
// AntimAI — Database Schema (Drizzle ORM + NeonDB)
// ============================================================

import {
  pgTable,
  uuid,
  text,
  date,
  jsonb,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const cases = pgTable("cases", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  heirsName: text("heirs_name").notNull(),
  heirsRelationship: text("heirs_relationship").notNull(),
  heirsContact: text("heirs_contact"),
  deceasedName: text("deceased_name").notNull(),
  deceasedDod: date("deceased_dod").notNull(),
  state: text("state").notNull(),
  assetsJson: jsonb("assets_json").notNull().$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: text("id").primaryKey(),
  caseId: uuid("case_id")
    .references(() => cases.id)
    .notNull(),
  institution: text("institution").notNull(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  urgency: text("urgency").notNull(),
  documentsRequiredJson: jsonb("documents_required_json")
    .notNull()
    .$type<string[]>(),
  officialPortalUrl: text("official_portal_url"),
  estimatedDays: integer("estimated_days"),
  stateSpecificNote: text("state_specific_note"),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
