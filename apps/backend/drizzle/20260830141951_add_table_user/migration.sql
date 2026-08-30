CREATE TABLE `user` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`kode_user` varchar(255),
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role` enum('admin','user') DEFAULT 'user',
	`updated_at` timestamp DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp DEFAULT (now()),
	CONSTRAINT `kode_user_idx` UNIQUE INDEX(`kode_user`)
);
