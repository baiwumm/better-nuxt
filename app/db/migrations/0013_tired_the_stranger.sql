CREATE INDEX "logs_created_idx" ON "logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "notices_list_idx" ON "notices" USING btree ("pinned","published_at","created_at");--> statement-breakpoint
CREATE INDEX "posts_sort_idx" ON "posts" USING btree ("sort","created_at");--> statement-breakpoint
CREATE INDEX "roles_sort_idx" ON "roles" USING btree ("sort","created_at");--> statement-breakpoint
CREATE INDEX "users_created_idx" ON "users" USING btree ("created_at");