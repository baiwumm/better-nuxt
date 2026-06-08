ALTER TABLE "department" RENAME TO "departments";--> statement-breakpoint
ALTER TABLE "ip_geo" RENAME TO "ip_geos";--> statement-breakpoint
ALTER TABLE "menu" RENAME TO "menus";--> statement-breakpoint
ALTER TABLE "notice_read" RENAME TO "notice_reads";--> statement-breakpoint
ALTER TABLE "post" RENAME TO "posts";--> statement-breakpoint
ALTER TABLE "role_menu" RENAME TO "role_menus";--> statement-breakpoint
ALTER TABLE "role" RENAME TO "roles";--> statement-breakpoint
ALTER TABLE "user_role" RENAME TO "user_roles";--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "department_name_unique";--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "department_code_unique";--> statement-breakpoint
ALTER TABLE "notice_reads" DROP CONSTRAINT "notice_read_unique";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "post_name_unique";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "post_code_unique";--> statement-breakpoint
ALTER TABLE "roles" DROP CONSTRAINT "role_name_unique";--> statement-breakpoint
ALTER TABLE "roles" DROP CONSTRAINT "role_code_unique";--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "department_parent_id_department_id_fk";
--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "department_leader_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "menus" DROP CONSTRAINT "menu_parent_id_menu_id_fk";
--> statement-breakpoint
ALTER TABLE "notice_reads" DROP CONSTRAINT "notice_read_notice_id_notices_id_fk";
--> statement-breakpoint
ALTER TABLE "notice_reads" DROP CONSTRAINT "notice_read_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "post_department_id_department_id_fk";
--> statement-breakpoint
ALTER TABLE "role_menus" DROP CONSTRAINT "role_menu_role_id_role_id_fk";
--> statement-breakpoint
ALTER TABLE "role_menus" DROP CONSTRAINT "role_menu_menu_id_menu_id_fk";
--> statement-breakpoint
ALTER TABLE "user_roles" DROP CONSTRAINT "user_role_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_roles" DROP CONSTRAINT "user_role_role_id_role_id_fk";
--> statement-breakpoint
DROP INDEX "department_parent_idx";--> statement-breakpoint
DROP INDEX "department_leader_idx";--> statement-breakpoint
DROP INDEX "department_sort_idx";--> statement-breakpoint
DROP INDEX "menu_parent_idx";--> statement-breakpoint
DROP INDEX "menu_sort_idx";--> statement-breakpoint
DROP INDEX "notice_read_notice_idx";--> statement-breakpoint
DROP INDEX "notice_read_user_idx";--> statement-breakpoint
DROP INDEX "notice_user_idx";--> statement-breakpoint
DROP INDEX "post_department_idx";--> statement-breakpoint
DROP INDEX "role_menu_role_idx";--> statement-breakpoint
DROP INDEX "role_menu_menu_idx";--> statement-breakpoint
DROP INDEX "user_role_user_idx";--> statement-breakpoint
DROP INDEX "user_role_role_idx";--> statement-breakpoint
ALTER TABLE "role_menus" DROP CONSTRAINT "role_menu_role_id_menu_id_pk";--> statement-breakpoint
ALTER TABLE "user_roles" DROP CONSTRAINT "user_role_user_id_role_id_pk";--> statement-breakpoint
ALTER TABLE "notice_reads" ADD CONSTRAINT "notice_reads_notice_id_user_id_pk" PRIMARY KEY("notice_id","user_id");--> statement-breakpoint
ALTER TABLE "role_menus" ADD CONSTRAINT "role_menus_role_id_menu_id_pk" PRIMARY KEY("role_id","menu_id");--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_role_id_pk" PRIMARY KEY("user_id","role_id");--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_parent_id_departments_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."departments"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_leader_id_user_id_fk" FOREIGN KEY ("leader_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menus" ADD CONSTRAINT "menus_parent_id_menus_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menus"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notice_reads" ADD CONSTRAINT "notice_reads_notice_id_notices_id_fk" FOREIGN KEY ("notice_id") REFERENCES "public"."notices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notice_reads" ADD CONSTRAINT "notice_reads_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_menus" ADD CONSTRAINT "role_menus_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_menus" ADD CONSTRAINT "role_menus_menu_id_menus_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "departments_parent_idx" ON "departments" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "departments_leader_idx" ON "departments" USING btree ("leader_id");--> statement-breakpoint
CREATE INDEX "departments_sort_idx" ON "departments" USING btree ("parent_id","sort");--> statement-breakpoint
CREATE INDEX "menus_parent_idx" ON "menus" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "menus_sort_idx" ON "menus" USING btree ("parent_id","sort");--> statement-breakpoint
CREATE INDEX "notice_reads_notice_idx" ON "notice_reads" USING btree ("notice_id");--> statement-breakpoint
CREATE INDEX "notice_reads_user_idx" ON "notice_reads" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notices_user_idx" ON "notices" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "posts_department_idx" ON "posts" USING btree ("department_id");--> statement-breakpoint
CREATE INDEX "role_menus_role_idx" ON "role_menus" USING btree ("role_id");--> statement-breakpoint
CREATE INDEX "role_menus_menu_idx" ON "role_menus" USING btree ("menu_id");--> statement-breakpoint
CREATE INDEX "user_roles_user_idx" ON "user_roles" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_roles_role_idx" ON "user_roles" USING btree ("role_id");--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_code_unique" UNIQUE("code");--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_code_unique" UNIQUE("code");--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_code_unique" UNIQUE("code");