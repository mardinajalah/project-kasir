CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`name` varchar(255) NOT NULL,
	`updated_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `name` UNIQUE INDEX(`name`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`kode` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`buy_price` int NOT NULL,
	`sell_price` int NOT NULL,
	`stock` int NOT NULL,
	`min_stock` int NOT NULL,
	`category_id` int NOT NULL,
	`unit_id` int NOT NULL,
	`updated_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `kode` UNIQUE INDEX(`kode`)
);
--> statement-breakpoint
CREATE TABLE `units` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`name` varchar(255) NOT NULL,
	`updated_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `name` UNIQUE INDEX(`name`)
);
--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_categories_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`);--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_unit_id_units_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `units`(`id`);