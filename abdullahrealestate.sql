-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2025 at 04:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abdullahrealestate`
--

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `price` bigint(20) NOT NULL,
  `location` varchar(255) NOT NULL,
  `measurement` float NOT NULL,
  `unit` varchar(20) NOT NULL,
  `rooms` int(11) DEFAULT NULL,
  `bath` int(11) DEFAULT NULL,
  `front` float DEFAULT NULL,
  `back` float DEFAULT NULL,
  `description` text DEFAULT NULL,
  `media` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `type` varchar(20) NOT NULL,
  `soldout` tinyint(1) DEFAULT 0,
  `soldByUs` tinyint(1) DEFAULT 0,
  `buyerName` varchar(100) DEFAULT NULL,
  `sellerName` varchar(100) DEFAULT NULL,
  `soldAmount` bigint(20) DEFAULT NULL,
  `soldAt` date DEFAULT NULL,
  `rentedOut` tinyint(1) DEFAULT 0,
  `rentedByUs` tinyint(1) DEFAULT 0,
  `tenantName` varchar(100) DEFAULT NULL,
  `landlordName` varchar(100) DEFAULT NULL,
  `rentAmount` bigint(20) DEFAULT NULL,
  `rentedAt` date DEFAULT NULL,
  `commission` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `createdAt`, `price`, `location`, `measurement`, `unit`, `rooms`, `bath`, `front`, `back`, `description`, `media`, `type`, `soldout`, `soldByUs`, `buyerName`, `sellerName`, `soldAmount`, `soldAt`, `rentedOut`, `rentedByUs`, `tenantName`, `landlordName`, `rentAmount`, `rentedAt`, `commission`) VALUES
(26, '2025-07-10', 2600000, 'Bahria Town - Block C', 22, 'marla', 5, 3, 44, 44, 'This is very beautigul house made of like French house wooden floor with all the cabuds check it for sale.', '[{\"type\":\"image\",\"src\":\"1752240071033-blog14.png\"},{\"type\":\"image\",\"src\":\"1752240071038-blog15.png\"},{\"type\":\"image\",\"src\":\"1752240071040-blog16.png\"},{\"type\":\"image\",\"src\":\"1752240071045-blog17.png\"},{\"type\":\"video\",\"src\":\"1752240095811-video.mp4\"}]', 'sale', 0, 0, ' ', ' ', 0, '1899-11-29', 0, 0, 'null', 'null', 0, '0000-00-00', 0),
(27, '2025-07-11', 2700000, 'Wapda Town - Block N2', 10, 'marla', 5, 2, 30, 34, 'House for Sale', '[{\"type\":\"image\",\"src\":\"1752240221910-blog29.png\"},{\"type\":\"image\",\"src\":\"1752240221914-blog30.png\"},{\"type\":\"image\",\"src\":\"1752240221924-blog31.png\"},{\"type\":\"image\",\"src\":\"1752240221927-blog36.png\"},{\"type\":\"image\",\"src\":\"1752240221930-blog37.png\"},{\"type\":\"image\",\"src\":\"1752240221937-blog38.png\"},{\"type\":\"video\",\"src\":\"1752240221939-video.mp4\"}]', 'sale', 0, 0, ' ', ' ', NULL, '0000-00-00', 0, 0, NULL, NULL, NULL, NULL, 0),
(28, '2025-07-11', 90000000, 'Wapda Town - Block N2', 2, 'kanal', 7, 5, 53, 44, 'Also for sale', '[{\"type\":\"image\",\"src\":\"1752240286076-blog18.png\"},{\"type\":\"image\",\"src\":\"1752240286080-blog19.png\"},{\"type\":\"image\",\"src\":\"1752240286096-blog20.png\"},{\"type\":\"image\",\"src\":\"1752240286108-blog21.png\"},{\"type\":\"video\",\"src\":\"1752240286111-video.mp4\"}]', 'sale', 0, 0, ' ', ' ', NULL, '0000-00-00', 0, 0, NULL, NULL, NULL, NULL, 0),
(29, '2025-07-11', 90000000, 'Lake City - Sector M7', 22, 'marla', 3, 3, 25, 25, 'Thi is is meium sized House ', '[{\"type\":\"image\",\"src\":\"1752240438799-blog4.png\"},{\"type\":\"image\",\"src\":\"1752240438801-blog5.jpg\"},{\"type\":\"image\",\"src\":\"1752240438801-blog6.webp\"},{\"type\":\"image\",\"src\":\"1752240438802-blog7.webp\"},{\"type\":\"image\",\"src\":\"1752240438802-blog8.png\"}]', 'sale', 0, 0, ' ', ' ', NULL, '0000-00-00', 0, 0, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Abdullah', 'abdullah@gmail.com', '12345678');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
