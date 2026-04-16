-- Ejecuta esto en phpMyAdmin → pestaña SQL
CREATE DATABASE IF NOT EXISTS `banco pichincha`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `banco pichincha`;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  usuario    VARCHAR(100) NOT NULL,
  password   VARCHAR(255) NOT NULL,
  fecha      DATETIME DEFAULT CURRENT_TIMESTAMP
);
