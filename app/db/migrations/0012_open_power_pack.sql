ALTER TABLE "account" RENAME TO "accounts";--> statement-breakpoint
ALTER TABLE "session" RENAME TO "sessions";--> statement-breakpoint
ALTER TABLE "user" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "verification" RENAME TO "verifications";--> statement-breakpoint
ALTER TABLE "sessions" DROP CONSTRAINT "session_token_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_username_unique";--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "departments_leader_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "logs" DROP CONSTRAINT "logs_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "notice_reads" DROP CONSTRAINT "notice_reads_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "notices" DROP CONSTRAINT "notices_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "accounts" DROP CONSTRAINT "account_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "sessions" DROP CONSTRAINT "session_user_id_user_id_fk";
--> statement-breakpoint
DROP INDEX "account_userId_idx";--> statement-breakpoint
DROP INDEX "session_userId_idx";--> statement-breakpoint
DROP INDEX "verification_identifier_idx";--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_leader_id_users_id_fk" FOREIGN KEY ("leader_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "logs" ADD CONSTRAINT "logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notice_reads" ADD CONSTRAINT "notice_reads_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notices" ADD CONSTRAINT "notices_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "accounts_userId_idx" ON "accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_userId_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verifications_identifier_idx" ON "verifications" USING btree ("identifier");--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_token_unique" UNIQUE("token");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");