CREATE TABLE "internalization" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"zh" text,
	"en" text,
	"parent_id" text,
	"sort" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "menu" DROP CONSTRAINT "menu_parent_fk";
--> statement-breakpoint
ALTER TABLE "internalization" ADD CONSTRAINT "internalization_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."internalization"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "internalization_parent_idx" ON "internalization" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "internalization_sort_idx" ON "internalization" USING btree ("parent_id","sort");--> statement-breakpoint
ALTER TABLE "menu" ADD CONSTRAINT "menu_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menu"("id") ON DELETE restrict ON UPDATE no action;