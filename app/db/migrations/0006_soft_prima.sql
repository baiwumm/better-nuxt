CREATE TABLE "ip_geo" (
	"ip" text PRIMARY KEY NOT NULL,
	"country" text,
	"province" text,
	"city" text,
	"isp" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "logs_ip_idx" ON "logs" USING btree ("ip");