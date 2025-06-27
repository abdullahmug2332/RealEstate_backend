-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2025 at 09:38 PM
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
  `price` bigint(20) NOT NULL,
  `location` varchar(255) NOT NULL,
  `type` varchar(20) NOT NULL,
  `measurement` float NOT NULL,
  `unit` varchar(20) NOT NULL,
  `rooms` int(11) DEFAULT NULL,
  `bath` int(11) DEFAULT NULL,
  `front` float DEFAULT NULL,
  `back` float DEFAULT NULL,
  `description` text DEFAULT NULL,
  `media` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`media`)),
  `soldout` tinyint(1) DEFAULT 0,
  `soldByUs` tinyint(1) DEFAULT 0,
  `buyerName` varchar(100) DEFAULT NULL,
  `sellerName` varchar(100) DEFAULT NULL,
  `commission` bigint(20) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `soldAt` date DEFAULT NULL,
  `status` varchar(50) DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `price`, `location`, `type`, `measurement`, `unit`, `rooms`, `bath`, `front`, `back`, `description`, `media`, `soldout`, `soldByUs`, `buyerName`, `sellerName`, `commission`, `createdAt`, `soldAt`, `status`) VALUES
(1, 95000000, 'Bahria Town - Block A', 'rent', 6, 'kanal', 4, 3, 30, 50, 'Affordable and beautifully constructed...', '[\n  { \"type\": \"image\", \"src\": \"pro1.png\" },\n  { \"type\": \"image\", \"src\": \"pro2.png\" },\n\n  { \"type\": \"image\", \"src\": \"pro2.png\" },\n  { \"type\": \"image\", \"src\": \"pro3.png\" },\n  { \"type\": \"video\", \"src\": \"video.mp4\" }\n]', 0, 0, '', 'Ali', 0, '2025-06-26', '0000-00-00', 'available'),
(2, 4800000, 'Lake City - Sector M7', 'sale', 10, 'marla', 5, 4, 30, 32, 'Located in one of the most desirable neighborhoods...', '[\n  { \"type\": \"image\", \"src\": \"pro1.png\" },\n  { \"type\": \"image\", \"src\": \"pro2.png\" },\n  { \"type\": \"image\", \"src\": \"pro3.png\" },\n  { \"type\": \"video\", \"src\": \"video.mp4\" }\n]', 0, 0, NULL, 'Ahmed', 25000, '2025-01-15', NULL, 'available'),
(3, 2600000, 'Wapda Town - Block N2', 'sale', 6, 'marla', 3, 2, 24, 34, 'Affordable and beautifully constructed...', '[\n  { \"type\": \"image\", \"src\": \"pro1.png\" },\n  { \"type\": \"image\", \"src\": \"pro2.png\" },\n  { \"type\": \"image\", \"src\": \"pro3.png\" },\n  { \"type\": \"video\", \"src\": \"video.mp4\" }\n]', 1, 1, 'Zain', 'Ali', 20000, '2025-02-10', '2025-03-20', 'sold'),
(4, 90000000, 'Bahria Town - Sector B', 'sale', 5, 'marla', 3, 2, 25, 40, 'Spacious house with lawn and garage.', '[\n  { \"type\": \"image\", \"src\": \"pro1.png\" },\n  { \"type\": \"image\", \"src\": \"pro2.png\" },\n  { \"type\": \"image\", \"src\": \"pro3.png\" },\n  { \"type\": \"video\", \"src\": \"video.mp4\" }\n]', 0, 0, '', 'Ali', 0, '2025-06-26', '0000-00-00', 'available');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
