-- CloudPros website database (MySQL 8 / MariaDB 10.5+).
-- Create the database and a dedicated user first, for example:
--   CREATE DATABASE cloudpros CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
--   CREATE USER 'cloudpros_web'@'%' IDENTIFIED BY '<a long random password>';
--   GRANT SELECT, INSERT, UPDATE, DELETE ON cloudpros.* TO 'cloudpros_web'@'%';
-- Then: mysql -u <admin> -p cloudpros < database/schema.sql
-- Create the first administrator with: php database/create-admin.php

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  middle_name VARCHAR(50) DEFAULT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  approved TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_username (username),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contacts (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  company_name VARCHAR(100) DEFAULT NULL,
  phone VARCHAR(30) DEFAULT NULL,
  message TEXT NOT NULL,
  lang CHAR(2) NOT NULL DEFAULT 'en',
  ip_address VARCHAR(45) DEFAULT NULL,
  submission_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contacts_ip_date (ip_address, submission_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL,
  lang CHAR(2) NOT NULL DEFAULT 'en',
  ip_address VARCHAR(45) DEFAULT NULL,
  subscribed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_newsletter_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS login_attempts (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  ip_address VARCHAR(45) NOT NULL,
  username VARCHAR(50) DEFAULT NULL,
  attempted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_login_attempts_ip_time (ip_address, attempted_at),
  KEY idx_login_attempts_user_time (username, attempted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Already created the tables before November 2026? Add the per-username sign-in index with:
--   ALTER TABLE login_attempts ADD KEY idx_login_attempts_user_time (username, attempted_at);

-- Upgrading from the old `moedb` schema? The old `contacts` table is compatible;
-- add the new columns with:
--   ALTER TABLE contacts ADD COLUMN phone VARCHAR(30) NULL AFTER company_name,
--     ADD COLUMN lang CHAR(2) NOT NULL DEFAULT 'en' AFTER message,
--     ADD COLUMN ip_address VARCHAR(45) NULL AFTER lang,
--     ADD KEY idx_contacts_ip_date (ip_address, submission_date);
-- and delete the old sample admin account that used a published password:
--   DELETE FROM users WHERE username = 'admin' AND email = 'admin@cloudpros.com';
