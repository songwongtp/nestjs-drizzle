ALTER TABLE "user" ALTER COLUMN "userRole" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "userPreference" ADD CONSTRAINT "userPreference_userId_unique" UNIQUE("userId");