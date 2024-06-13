-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for RasaGram
CREATE DATABASE IF NOT EXISTS `RasaGram` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `RasaGram`;

-- Dumping structure for table RasaGram.dishes
CREATE TABLE IF NOT EXISTS `dishes` (
  `dishes_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `foods_id` int DEFAULT NULL,
  `cooking_time` time(6) DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`dishes_id`) USING BTREE,
  KEY `foods_id` (`foods_id`),
  CONSTRAINT `dishes_ibfk_1` FOREIGN KEY (`foods_id`) REFERENCES `foods` (`foods_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table RasaGram.dishes: ~2 rows (approximately)
INSERT INTO `dishes` (`dishes_id`, `name`, `description`, `foods_id`, `cooking_time`, `price`) VALUES
	(1, 'Margherita Pizza', 'Classic pizza with tomato, cheese, and basil', 1, '00:30:00.000000', 15000),
	(2, 'Spaghetti Carbonara', 'Delicious spaghetti with creamy carbonara sauce', 2, '02:00:00.000000', 13);

-- Dumping structure for table RasaGram.dish_ingredients
CREATE TABLE IF NOT EXISTS `dish_ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dish_id` int DEFAULT NULL,
  `ingredient_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dish_id` (`dish_id`),
  KEY `ingredient_id` (`ingredient_id`),
  CONSTRAINT `dish_ingredients_ibfk_1` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`dishes_id`),
  CONSTRAINT `dish_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table RasaGram.dish_ingredients: ~3 rows (approximately)
INSERT INTO `dish_ingredients` (`id`, `dish_id`, `ingredient_id`) VALUES
	(1, 1, 1),
	(2, 1, 2),
	(3, 1, 3);

-- Dumping structure for table RasaGram.foods
CREATE TABLE IF NOT EXISTS `foods` (
  `foods_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`foods_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table RasaGram.foods: ~3 rows (approximately)
INSERT INTO `foods` (`foods_id`, `name`, `type`) VALUES
	(1, 'Pizza Dough', 'Base'),
	(2, 'Tomato Sauce', 'Sauce'),
	(3, 'Nasi Goreng', 'Makanan Utama');

-- Dumping structure for table RasaGram.ingredients
CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `unit` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table RasaGram.ingredients: ~3 rows (approximately)
INSERT INTO `ingredients` (`id`, `name`, `quantity`, `unit`) VALUES
	(1, 'Tomato', 2.00, 'pieces'),
	(2, 'Cheese', 100.00, 'grams'),
	(3, 'Basil', 10.00, 'leaves');

-- Dumping structure for table RasaGram.photo
CREATE TABLE IF NOT EXISTS `photo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `photo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table RasaGram.photo: ~1 rows (approximately)
INSERT INTO `photo` (`id`, `user_id`, `filename`, `path`, `created_at`, `url`, `description`) VALUES
	(1, 1, 'image-1718256891897-823774718.jpg', 'E:\\kuliah\\TAHUN 3\\semester 2\\MSIB Bangkit - Cloud computing\\projek\\RasaGram\\src\\uploads\\image-1718256891897-823774718.jpg', '2024-06-13 05:34:52', '/uploads/image-1718256891897-823774718.jpg', 'enak beutt');

-- Dumping structure for table RasaGram.recommendations
CREATE TABLE IF NOT EXISTS `recommendations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `photo_id` int DEFAULT NULL,
  `dish_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `photo_id` (`photo_id`),
  KEY `dish_id` (`dish_id`),
  CONSTRAINT `recommendations_ibfk_1` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`),
  CONSTRAINT `recommendations_ibfk_2` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`dishes_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table RasaGram.recommendations: ~0 rows (approximately)

-- Dumping structure for table RasaGram.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table RasaGram.users: ~0 rows (approximately)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
	(1, 'john_doe', 'john@example.com', 'password123', '2024-06-10 15:12:58'),
	(3, 'john_doe', 'john.doe@example.com', 'SecureP@ssword123', '2024-06-11 06:38:11');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
