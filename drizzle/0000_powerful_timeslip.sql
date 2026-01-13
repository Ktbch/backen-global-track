CREATE TABLE `documents` (
	`id` varchar(36) NOT NULL,
	`shipment_id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` varchar(100) NOT NULL,
	`file_path` text NOT NULL,
	`file_size` int,
	`uploaded_by` varchar(36),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`shipment_id` varchar(36),
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`type` varchar(50) DEFAULT 'info',
	`channel` varchar(50) DEFAULT 'in_app',
	`is_read` boolean DEFAULT false,
	`sent_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partner_commissions` (
	`id` varchar(36) NOT NULL,
	`partner_id` varchar(36) NOT NULL,
	`shipment_id` varchar(36) NOT NULL,
	`payment_id` varchar(36),
	`commission_rate` decimal(5,2) DEFAULT '10.00',
	`commission_amount` decimal(12,2) NOT NULL,
	`currency` varchar(10) DEFAULT 'NGN',
	`status` varchar(20) DEFAULT 'pending',
	`paid_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `partner_commissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` varchar(36) NOT NULL,
	`shipment_id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`currency` varchar(10) DEFAULT 'NGN',
	`provider` varchar(50) NOT NULL,
	`provider_reference` varchar(100),
	`status` varchar(20) DEFAULT 'pending',
	`metadata` json,
	`paid_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`full_name` varchar(255),
	`phone` varchar(50),
	`company_name` varchar(255),
	`address` varchar(1000),
	`city` varchar(100),
	`country` varchar(100) DEFAULT 'Nigeria',
	`avatar_url` varchar(1000),
	`partner_code` varchar(100),
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `profiles_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`refresh_token_hash` varchar(255) NOT NULL,
	`user_agent` text,
	`ip_address` varchar(45),
	`expires_at` timestamp NOT NULL,
	`revoked_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `shipment_items` (
	`id` varchar(36) NOT NULL DEFAULT 'UUID()',
	`shipment_id` varchar(36) NOT NULL,
	`description` text NOT NULL,
	`quantity` int DEFAULT 1,
	`weight_kg` decimal(10,2),
	`length_cm` decimal(10,2),
	`width_cm` decimal(10,2),
	`height_cm` decimal(10,2),
	`declared_value_ngn` decimal(12,2),
	`hs_code` varchar(50),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `shipment_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `shipments` (
	`id` varchar(36) NOT NULL,
	`tracking_number` varchar(50) NOT NULL,
	`customer_id` varchar(36),
	`partner_id` varchar(36),
	`status` varchar(36) DEFAULT 'draft',
	`sender_name` varchar(255) NOT NULL,
	`sender_phone` varchar(50) NOT NULL,
	`sender_email` varchar(255),
	`sender_address` text NOT NULL,
	`sender_city` varchar(100) NOT NULL,
	`sender_country` varchar(100) DEFAULT 'Nigeria',
	`receiver_name` varchar(255) NOT NULL,
	`receiver_phone` varchar(50) NOT NULL,
	`receiver_email` varchar(255),
	`receiver_address` text NOT NULL,
	`receiver_city` varchar(100) NOT NULL,
	`receiver_country` varchar(100) DEFAULT 'United Kingdom',
	`total_weight_kg` decimal(10,2),
	`total_volume_cbm` decimal(10,4),
	`declared_value_ngn` decimal(12,2),
	`declared_value_gbp` decimal(12,2),
	`shipping_cost_ngn` decimal(12,2),
	`shipping_cost_gbp` decimal(12,2),
	`insurance_cost` decimal(12,2) DEFAULT '0.00',
	`total_cost_ngn` decimal(12,2),
	`total_cost_gbp` decimal(12,2),
	`pickup_date` timestamp,
	`estimated_delivery` timestamp,
	`actual_delivery` timestamp,
	`special_instructions` text,
	`is_fragile` boolean DEFAULT false,
	`requires_insurance` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `shipments_id` PRIMARY KEY(`id`),
	CONSTRAINT `shipments_tracking_number_unique` UNIQUE(`tracking_number`)
);
--> statement-breakpoint
CREATE TABLE `system_settings` (
	`id` varchar(36) NOT NULL,
	`key` varchar(255) NOT NULL,
	`value` json NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `system_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `unique_key` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `tracking_events` (
	`id` varchar(36) NOT NULL,
	`shipment_id` varchar(36) NOT NULL,
	`status` varchar(30) NOT NULL,
	`location` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`notes` text,
	`created_by` varchar(36),
	`event_time` timestamp DEFAULT (now()),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `tracking_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`role` varchar(36) NOT NULL,
	`assigned_by` varchar(36),
	`assigned_at` timestamp DEFAULT (now()),
	CONSTRAINT `user_roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `unique_user_role` UNIQUE(`user_id`,`role`)
);
--> statement-breakpoint
ALTER TABLE `documents` ADD CONSTRAINT `documents_shipment_id_shipments_id_fk` FOREIGN KEY (`shipment_id`) REFERENCES `shipments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_shipment_id_shipments_id_fk` FOREIGN KEY (`shipment_id`) REFERENCES `shipments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partner_commissions` ADD CONSTRAINT `partner_commissions_shipment_id_shipments_id_fk` FOREIGN KEY (`shipment_id`) REFERENCES `shipments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_profiles_id_fk` FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_user_id_profiles_id_fk` FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON DELETE no action ON UPDATE no action;