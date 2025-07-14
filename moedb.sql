-- Create the 'users' table to store both regular users and admins.
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user',
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create the 'contacts' table for contact form submissions.
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `message` text NOT NULL,
  `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Optional: Create a default admin user so you can log in immediately.
-- The password for this user is 'adminpass'
INSERT INTO `users` (`username`, `email`, `password_hash`, `first_name`, `last_name`, `role`, `approved`) VALUES
('admin', 'admin@cloudpros.com', '$2y$10$I0jH.2nZg5L8g8UaV.1x3eYd.L2.pG5sV1bZ2jX4kL9wT7yS6kC/C', 'Admin', 'User', 'admin', 1);