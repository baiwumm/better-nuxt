CREATE TYPE "public"."notice_type" AS ENUM('notice', 'message');--> statement-breakpoint
CREATE TABLE "department" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"parent_id" text,
	"leader_id" text,
	"enabled" boolean DEFAULT true NOT NULL,
	"description" text,
	"sort" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "department_name_unique" UNIQUE("name"),
	CONSTRAINT "department_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "notice_read" (
	"notice_id" text NOT NULL,
	"user_id" text NOT NULL,
	"read_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "notice_read_unique" UNIQUE("notice_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "notices" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"summary" text,
	"type" "notice_type" DEFAULT 'notice' NOT NULL,
	"content" text NOT NULL,
	"pinned" boolean DEFAULT false NOT NULL,
	"published_at" timestamp,
	"published" boolean DEFAULT true NOT NULL,
	"user_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"department_id" text,
	"enabled" boolean DEFAULT true NOT NULL,
	"description" text,
	"sort" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "post_name_unique" UNIQUE("name"),
	CONSTRAINT "post_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "internalization" DROP CONSTRAINT "internalization_parent_fk";
--> statement-breakpoint
ALTER TABLE "menu" DROP CONSTRAINT "menu_parent_fk";
--> statement-breakpoint
DROP INDEX "role_sort_idx";--> statement-breakpoint
ALTER TABLE "department" ADD CONSTRAINT "department_parent_id_department_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."department"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "department" ADD CONSTRAINT "department_leader_id_user_id_fk" FOREIGN KEY ("leader_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notice_read" ADD CONSTRAINT "notice_read_notice_id_notices_id_fk" FOREIGN KEY ("notice_id") REFERENCES "public"."notices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notice_read" ADD CONSTRAINT "notice_read_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notices" ADD CONSTRAINT "notices_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_department_id_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."department"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "department_parent_idx" ON "department" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "department_leader_idx" ON "department" USING btree ("leader_id");--> statement-breakpoint
CREATE INDEX "department_sort_idx" ON "department" USING btree ("parent_id","sort");--> statement-breakpoint
CREATE INDEX "notice_read_notice_idx" ON "notice_read" USING btree ("notice_id");--> statement-breakpoint
CREATE INDEX "notice_read_user_idx" ON "notice_read" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notice_user_idx" ON "notices" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "post_department_idx" ON "post" USING btree ("department_id");--> statement-breakpoint
ALTER TABLE "internalization" ADD CONSTRAINT "internalization_parent_id_internalization_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."internalization"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu" ADD CONSTRAINT "menu_parent_id_menu_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menu"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "logs_user_idx" ON "logs" USING btree ("user_id");