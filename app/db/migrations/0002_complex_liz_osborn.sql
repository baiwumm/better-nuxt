CREATE TYPE "public"."target_enum" AS ENUM('_self', '_blank');--> statement-breakpoint
CREATE TABLE "menu" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "menu_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"label" text NOT NULL,
	"icon" text NOT NULL,
	"to" text NOT NULL,
	"badge" text,
	"parent_id" integer,
	"sort" integer DEFAULT 0 NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"default_open" boolean DEFAULT false NOT NULL,
	"target" "target_enum" DEFAULT '_self' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "menu_parent_idx" ON "menu" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "menu_sort_idx" ON "menu" USING btree ("parent_id","sort");