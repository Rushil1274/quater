-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2024 at 01:55 PM
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
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `receptionist_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `notes` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `age` varchar(50) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `hospital` varchar(50) NOT NULL,
  `number` varchar(10) NOT NULL,
  `specialization` varchar(50) NOT NULL,
  `experience` varchar(50) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`name`, `email`, `password`, `role`, `age`, `gender`, `hospital`, `number`, `specialization`, `experience`, `doctor_id`, `created_at`) VALUES
('Dr. John Doe', 'johndoe@example.com', 'password123', 'doctor', '35', 'Male', 'City Hospital', '123-456-78', 'Cardiology', '10 years', 1, '2024-05-22 16:39:36'),
('Dr. Jane Smith', 'janesmith@example.com', 'password456', 'doctor', '42', 'Female', 'General Hospital', '987-654-32', 'Pediatrics', '15 years', 2, '2024-05-22 16:39:36'),
('Dr. Michael Johnson', 'michaeljohnson@example.com', 'password789', 'doctor', '40', 'Male', 'Community Clinic', '456-789-01', 'Orthopedics', '12 years', 3, '2024-05-22 16:39:36');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`name`, `email`, `password`, `role`) VALUES
('Panchal Rushil', 'rushil@gmail.com', 'Rrp@123456789', ''),
('jay', 'jay@gmail.com', 'Jay@12345', ''),
('jy', 'jay123@gmail.com', 'Jayj@123', 'Patient'),
('kush', 'kush123@gmail.com', 'Kushal@1123', 'Doctor'),
('jdbcu', 'jaj123@gmail.com', 'Abcd@123', 'Patient'),
('Patel Dhruv', 'dhruv13042001@gmail.com', 'Dhruv@1303', 'Doctor'),
('Devraj Rajput', 'devrajrajput18@gmail.com', 'dEVRAJ@18', 'Doctor'),
('abc', 'abc@gmail.com', 'Abc@1234', 'Patient'),
('def', 'def@gmail.com', 'deF@1234', 'Doctor'),
('ghi', 'ghi@gmail.com', 'Ghi@1234', 'Patient');

--
-- Triggers `login`
--
DELIMITER $$
CREATE TRIGGER `doctor` AFTER INSERT ON `login` FOR EACH ROW BEGIN
    IF NEW.role = 'Doctor' THEN
        INSERT INTO doctor (name, email,password) VALUES (NEW.name, NEW.email, NEW.password);
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `patient` AFTER INSERT ON `login` FOR EACH ROW BEGIN
    IF NEW.role = 'Patient' THEN
        INSERT INTO patient (name, email, password) VALUES (NEW.name, NEW.email, NEW.password);
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `receptionist` AFTER INSERT ON `login` FOR EACH ROW BEGIN
    IF NEW.role = 'Receptionist' THEN
        INSERT INTO receptionist (name, email, password) VALUES (NEW.name, NEW.email, NEW.password);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `age` varchar(50) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `number` varchar(10) NOT NULL,
  `insurance` varchar(50) NOT NULL,
  `adhar_no` varchar(12) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `patient_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`email`, `password`, `role`, `age`, `gender`, `address`, `number`, `insurance`, `adhar_no`, `created_at`, `patient_id`, `name`) VALUES
('john@example.com', 'password123', 'patient', '30', 'Male', '123 Main St', '987-654-32', 'XYZ Insurance', '1234-5678-90', '2024-05-22 16:44:14', 1, 'John Doe'),
('jane@example.com', 'password456', 'patient', '25', 'Female', '456 Elm St', '123-456-78', 'ABC Insurance', '9876-5432-10', '2024-05-22 16:44:14', 2, 'Jane Smith'),
('alex@example.com', 'password789', 'patient', '40', 'Male', '789 Oak St', '456-789-01', 'DEF Insurance', '5678-9012-34', '2024-05-22 16:44:14', 3, 'Alex Brown');

-- --------------------------------------------------------

--
-- Table structure for table `receptionist`
--

CREATE TABLE `receptionist` (
  `receptionist_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` int(10) NOT NULL,
  `address` varchar(100) NOT NULL,
  `salary` int(10) NOT NULL,
  `employment` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receptionist`
--

INSERT INTO `receptionist` (`receptionist_id`, `name`, `email`, `phone`, `address`, `salary`, `employment`, `created_at`, `password`) VALUES
(1, 'Alice Johnson', 'alice@example.com', 1234567890, '123 Main St', 35000, 'Full-Time', '2024-05-22 16:48:27', ''),
(2, 'Bob Smith', 'bob@example.com', 2147483647, '456 Elm St', 30000, 'Part-Time', '2024-05-22 16:48:27', ''),
(3, 'Charlie Brown', 'charlie@example.com', 2147483647, '789 Oak St', 40000, 'Full-Time', '2024-05-22 16:48:27', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `receptionist_id` (`receptionist_id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `receptionist`
--
ALTER TABLE `receptionist`
  ADD PRIMARY KEY (`receptionist_id`),
  ADD KEY `receptionist_id` (`receptionist_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `receptionist`
--
ALTER TABLE `receptionist`
  MODIFY `receptionist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`receptionist_id`) REFERENCES `receptionist` (`receptionist_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
