ALTER TABLE "internalization" RENAME TO "i18n";--> statement-breakpoint
ALTER TABLE "i18n" DROP CONSTRAINT "internalization_parent_id_internalization_id_fk";
--> statement-breakpoint
DROP INDEX "internalization_parent_idx";--> statement-breakpoint
DROP INDEX "internalization_sort_idx";--> statement-breakpoint
ALTER TABLE "i18n" ADD CONSTRAINT "i18n_parent_id_i18n_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."i18n"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "i18n_parent_idx" ON "i18n" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "i18n_sort_idx" ON "i18n" USING btree ("parent_id","sort");