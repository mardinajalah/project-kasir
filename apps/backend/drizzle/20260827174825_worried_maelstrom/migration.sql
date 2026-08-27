DROP INDEX `kode` ON `products`;--> statement-breakpoint
ALTER TABLE `products` ADD `vendor` varchar(255);--> statement-breakpoint
ALTER TABLE `products` ADD `profit` int;--> statement-breakpoint
CREATE UNIQUE INDEX `kode_idx` ON `products` (`kode`);