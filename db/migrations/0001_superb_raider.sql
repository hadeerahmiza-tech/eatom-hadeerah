CREATE TABLE `dokumen_permohonan` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`permohonan_id` integer NOT NULL,
	`nama_fail` text NOT NULL,
	`jenis_doc` text NOT NULL,
	`saiz_fail` integer,
	`mime_type` text,
	`storage_path` text NOT NULL,
	`uploaded_by` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`permohonan_id`) REFERENCES `permohonan_lesen`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`uploaded_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `invois` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`no_invois` text NOT NULL,
	`permohonan_id` integer NOT NULL,
	`jenis_invois` text NOT NULL,
	`jumlah` integer NOT NULL,
	`status` text DEFAULT 'belum_bayar' NOT NULL,
	`tarikh_bayar` integer,
	`rujukan_bayar` text,
	`disahkan_oleh` text,
	`tarikh_sah` integer,
	`catatan_kewangan` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`permohonan_id`) REFERENCES `permohonan_lesen`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`disahkan_oleh`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `invois_no_invois_unique` ON `invois` (`no_invois`);--> statement-breakpoint
CREATE TABLE `syarat_lesen` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`permohonan_id` integer NOT NULL,
	`kod_syarat` text,
	`penerangan` text NOT NULL,
	`kategori` text,
	`added_by` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`permohonan_id`) REFERENCES `permohonan_lesen`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`added_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sijil_lesen` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`permohonan_id` integer NOT NULL,
	`no_sijil` text NOT NULL,
	`tarikh_mula` integer NOT NULL,
	`tarikh_tamat` integer NOT NULL,
	`dijana_oleh` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`permohonan_id`) REFERENCES `permohonan_lesen`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`dijana_oleh`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sijil_lesen_no_sijil_unique` ON `sijil_lesen` (`no_sijil`);--> statement-breakpoint
ALTER TABLE `permohonan_lesen` ADD `kategori_lesen` text;--> statement-breakpoint
ALTER TABLE `permohonan_lesen` ADD `sub_kategori` text;--> statement-breakpoint
ALTER TABLE `permohonan_lesen` ADD `lokasi` text;--> statement-breakpoint
ALTER TABLE `permohonan_lesen` ADD `aktiviti` text;--> statement-breakpoint
ALTER TABLE `permohonan_lesen` ADD `bil_peralatan` integer;--> statement-breakpoint
ALTER TABLE `permohonan_lesen` ADD `no_lesen_sedia_ada` text;--> statement-breakpoint
ALTER TABLE `permohonan_lesen` ADD `kategori_kawalan` text;--> statement-breakpoint
ALTER TABLE `permohonan_lesen` ADD `catatan_kategori` text;