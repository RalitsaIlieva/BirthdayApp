-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.6.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for giftsdb
CREATE DATABASE IF NOT EXISTS `giftsdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `giftsdb`;

-- Dumping structure for table giftsdb.employees
CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL DEFAULT '',
  `password` varchar(60) NOT NULL DEFAULT '',
  `name` varchar(20) NOT NULL DEFAULT '',
  `date_of_birth` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table giftsdb.employees: ~6 rows (approximately)
INSERT INTO `employees` (`id`, `username`, `password`, `name`, `date_of_birth`) VALUES
	(1, 'batman', '$2a$04$1en3tXRaJuEIyynB/Xgs0ODkFCMV19OfcIbO/m76vKlasz8Bvws1i', 'Ivan Ivanov', '7th of March'),
	(2, 'superman', '$2a$04$CuaJyPU.WzS92Hs/rp7Xk.iI0U1fSvq/qTAawK/5ZmhuGcRbJ9cV6', 'Misho Todorov', '25th of June'),
	(3, 'wonder woman', '$2a$04$p4VGAJbSPZp2riYN896xJOBHBmRhMDPb1jmfmp33KEQjUuergn7we', 'Anita Petrova', '14th of September'),
	(4, 'cat woman', '$2a$04$YrJhQ6m8WXDSiC1WJTlD/uQMoSm2ewjMdT9DJopmm0tp/zHFDvITG', 'Suzana Ivanova', '17th of December'),
	(5, 'ironman', '$2a$04$rKi9tZwx/Dl7W3HE0CEENuewYDlghvquvelEiCXpFl03Ti7Hb/aAm', 'Anton Mihailov', '3rd of April'),
	(6, 'hulk', '$2a$04$Z3rgH0j7h3jsZjTe7IyvgOPR5dcKxqV63jp5mTmkK8tyg3H.DO3ni', 'Georgi Petrov', '30th of January');

-- Dumping structure for table giftsdb.gifts
CREATE TABLE IF NOT EXISTS `gifts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table giftsdb.gifts: ~8 rows (approximately)
INSERT INTO `gifts` (`id`, `name`) VALUES
	(1, 'mouse'),
	(2, 'airpods'),
	(3, 'headphones'),
	(4, 'joystick'),
	(5, 'microphone'),
	(6, 'sd card'),
	(7, 'memory card'),
	(8, 'usb stick'),
	(9, 'web camera'),
	(10, 'keyboard');

-- Dumping structure for table giftsdb.votes
CREATE TABLE IF NOT EXISTS `votes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `birthday_employee_id` int(11) NOT NULL,
  `created_by_employeeId` int(11) NOT NULL,
  `year` year(4) NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_votes_employees` (`created_by_employeeId`),
  KEY `FK_votes_employees_2` (`birthday_employee_id`),
  CONSTRAINT `FK_votes_employees` FOREIGN KEY (`created_by_employeeId`) REFERENCES `employees` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_votes_employees_2` FOREIGN KEY (`birthday_employee_id`) REFERENCES `employees` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table giftsdb.votes: ~9 rows (approximately)
INSERT INTO `votes` (`id`, `birthday_employee_id`, `created_by_employeeId`, `year`, `is_active`) VALUES
	(7, 3, 1, '2027', 0),
	(28, 2, 1, '2040', 0),
	(35, 4, 1, '2030', 0),
	(37, 4, 2, '2046', 1),
	(38, 5, 4, '2033', 0),
	(39, 2, 1, '2032', 0),
	(41, 2, 1, '2025', 0),
	(42, 2, 1, '2030', 0),
	(43, 2, 1, '2046', 1);

-- Dumping structure for table giftsdb.votes_participants
CREATE TABLE IF NOT EXISTS `votes_participants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vote_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `voted_for_gift_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_votes_participants_gifts` (`voted_for_gift_id`),
  KEY `FK_votes_participants_employees` (`employee_id`),
  KEY `FK_votes_participants_votes` (`vote_id`),
  CONSTRAINT `FK_votes_participants_employees` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_votes_participants_gifts` FOREIGN KEY (`voted_for_gift_id`) REFERENCES `gifts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_votes_participants_votes` FOREIGN KEY (`vote_id`) REFERENCES `votes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table giftsdb.votes_participants: ~8 rows (approximately)
INSERT INTO `votes_participants` (`id`, `vote_id`, `employee_id`, `voted_for_gift_id`) VALUES
	(25, 38, 1, 4),
	(26, 37, 1, 6),
	(27, 39, 6, 5),
	(28, 38, 4, 4),
	(29, 38, 2, 10),
	(30, 38, 3, 9),
	(31, 41, 1, 2),
	(32, 42, 1, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
