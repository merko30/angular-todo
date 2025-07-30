ALTER TABLE "comment" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "postTag" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "postTag" ALTER COLUMN "tag_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "tag" ALTER COLUMN "id" SET DATA TYPE serial;