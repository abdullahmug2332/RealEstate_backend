-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2025 at 09:47 PM
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
(25, NULL, 32323, 'dsds', 23, 'marla', 2, 2, 3, 3, 'hello', NULL, 'sale', 0, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
