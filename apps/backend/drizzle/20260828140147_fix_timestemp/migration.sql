ALTER TABLE `categories` MODIFY COLUMN `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `categories` MODIFY COLUMN `deleted_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `deleted_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `units` MODIFY COLUMN `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `units` MODIFY COLUMN `deleted_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `vendor` MODIFY COLUMN `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `vendor` MODIFY COLUMN `deleted_at` timestamp DEFAULT (now());