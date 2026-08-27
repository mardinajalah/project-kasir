CREATE TABLE `vendor` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`kode_vendor` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`updated_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `kode_vendor_idx` UNIQUE INDEX(`kode_vendor`)
);
--> statement-breakpoint
DROP INDEX `name` ON `categories`;--> statement-breakpoint
DROP INDEX `kode_idx` ON `products`;--> statement-breakpoint
DROP INDEX `name` ON `units`;--> statement-breakpoint
ALTER TABLE `categories` ADD `kode_category` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `kode_product` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `vendor_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `units` ADD `kode_unit` varchar(255) NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `name_idx` ON `categories` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `kode_category_idx` ON `categories` (`kode_category`);--> statement-breakpoint
CREATE UNIQUE INDEX `kode_product_idx` ON `products` (`kode_product`);--> statement-breakpoint
CREATE UNIQUE INDEX `name_idx` ON `units` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `kode_unit_idx` ON `units` (`kode_unit`);--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_vendor_id_vendor_id_fkey` FOREIGN KEY (`vendor_id`) REFERENCES `vendor`(`id`);--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `kode`;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `vendor`;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `profit`;