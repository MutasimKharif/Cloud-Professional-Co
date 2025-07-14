-- SQL script for creating tables in the 'moedb' database.
-- Run this script in your MySQL admin tool (like phpMyAdmin).

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `moedb`;
USE `moedb`;

-- Table structure for `users`
-- This table will store all registered users, including admins.
-- `approved` field is crucial: 0 for pending requests, 1 for approved users.
-- `role` field distinguishes between 'user' and 'admin'.
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for `contacts`
-- This table stores messages submitted through the contact form.
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `message` text NOT NULL,
  `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert a default admin user for initial login.
-- The password is 'adminpassword'. You should change this immediately.
INSERT INTO `users` (`username`, `email`, `password_hash`, `first_name`, `last_name`, `approved`, `role`) VALUES
('admin', 'admin@cloudpros.com', '$2y$10$Ifg.fA1.L4lE0Lp/5KzD7.EaG28jL9d8J4V.BCG.FzYg3i5v5gZ.6', 'Admin', 'User', 1, 'admin');

