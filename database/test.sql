-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2024 at 11:47 AM
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
  `status` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
  `notes` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `appointment_time` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `receptionist_id`, `doctor_id`, `patient_id`, `status`, `notes`, `created_at`, `appointment_time`, `updated_at`) VALUES
(1, 1, 1, 1, 'confirmed', 'Please arrive 15 minutes early', '2024-05-24 04:48:37', '2024-05-24 10:00:00', '2024-05-24 04:48:37'),
(2, 1, 2, 2, 'pending', '', '2024-05-24 04:48:37', '2024-05-24 14:30:00', '2024-05-24 04:48:37'),
(3, 2, 1, 3, 'confirmed', 'Bring previous medical records', '2024-05-24 04:48:37', '2024-05-24 11:00:00', '2024-05-24 04:48:37');

--
-- Triggers `appointments`
--
DELIMITER $$
CREATE TRIGGER `add_time_slot_after_appointment_insert` BEFORE INSERT ON `appointments` FOR EACH ROW BEGIN
    DECLARE duration INT DEFAULT 60; -- Assuming each appointment has a duration of 60 minutes

    -- Checking if the appointment time overlaps with existing time slots
    IF EXISTS (
        SELECT 1
        FROM time_slots
        WHERE doctor_id = NEW.doctor_id
        AND start_time <= DATE_ADD(NEW.appointment_time, INTERVAL duration MINUTE)
        AND end_time >= NEW.appointment_time
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Appointment time overlaps with existing time slot';
    ELSE
        -- Inserting the appointment time into the time_slots table
        INSERT INTO time_slots (doctor_id, start_time, end_time, status)
        VALUES (NEW.doctor_id, NEW.appointment_time, DATE_ADD(NEW.appointment_time, INTERVAL duration MINUTE), 'booked');
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `doctor_id` int(11) NOT NULL,
  `login_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `hospital` varchar(100) NOT NULL,
  `number` varchar(20) NOT NULL,
  `specialization` varchar(100) NOT NULL,
  `experience` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `doc_pic` longblob NOT NULL,
  `hospital_loc` varchar(255) NOT NULL,
  `fees` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_id`, `login_id`, `name`, `email`, `password`, `role`, `age`, `gender`, `hospital`, `number`, `specialization`, `experience`, `created_at`, `updated_at`, `doc_pic`, `hospital_loc`, `fees`) VALUES
(1, 1, 'Dr. John Doe', 'johndoe@example.com', 'Password@123', 'doctor', 35, 'Male', 'City Hospital', '123-456-78', 'Cardiology', '10 years', '2024-05-22 11:09:36', '2024-05-24 05:45:25', 0x706174685f746f5f646f635f706963, '', 0),
(2, 2, 'Dr. Jane Smith', 'janesmith@example.com', 'Password@456', 'doctor', 42, 'Female', 'General Hospital', '987-654-32', 'Pediatrics', '15 years', '2024-05-22 11:09:36', '2024-05-24 05:45:25', 0x706174685f746f5f646f635f706963, '', 0),
(3, 3, 'Dr. Michael Johnson', 'michaeljohnson@example.com', 'Password@789', 'doctor', 40, 'Male', 'Community Clinic', '456-789-01', 'Orthopedics', '12 years', '2024-05-22 11:09:36', '2024-05-24 05:45:25', 0x706174685f746f5f646f635f706963, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `login_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`login_id`, `name`, `email`, `password`, `role`) VALUES
(1, 'Dr. John Doe', 'johndoe@example.com', 'Password@123', 'doctor'),
(2, 'Dr. Jane Smith', 'janesmith@example.com', 'Password@456', 'doctor'),
(3, 'Dr. Michael Johnson', 'michaeljohnson@example.com', 'Password@789', 'doctor'),
(4, 'John Doe', 'john@example.com', 'Password@123', 'patient'),
(5, 'Jane Smith', 'jane@example.com', 'Password@456', 'patient'),
(6, 'Alex Brown', 'alex@example.com', 'Password@789', 'patient'),
(7, 'Alice Johnson', 'alice@example.com', 'Alice@123', 'receptionist'),
(8, 'Bob Smith', 'bob@example.com', 'Bob@123', 'receptionist'),
(9, 'Charlie Brown', 'charlie@example.com', 'Charlie@123', 'receptionist');

--
-- Triggers `login`
--
DELIMITER $$
CREATE TRIGGER `doctor` AFTER INSERT ON `login` FOR EACH ROW BEGIN
    IF NEW.role = 'Doctor' THEN
        INSERT INTO doctor (name, email, password, role, login_id) VALUES (NEW.name, NEW.email, NEW.password, NEW.role, NEW.login_id);
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `patient` AFTER INSERT ON `login` FOR EACH ROW BEGIN
    IF NEW.role = 'Patient' THEN
        INSERT INTO patient (name, email, password, role, login_id) VALUES (NEW.name, NEW.email, NEW.password, NEW.role, NEW.login_id);
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `receptionist` AFTER INSERT ON `login` FOR EACH ROW BEGIN
    IF NEW.role = 'Receptionist' THEN
        INSERT INTO receptionist (name, email, password, role, login_id) VALUES (NEW.name, NEW.email, NEW.password, NEW.role, NEW.login_id);
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update-doctor` AFTER UPDATE ON `login` FOR EACH ROW BEGIN
    IF NEW.role = 'Doctor' THEN
        UPDATE doctor
        SET
            name = NEW.name,
            email = NEW.email,
            password = NEW.password
        WHERE
            email = NEW.email; -- Assuming there's an email field in your table
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update-patient` AFTER UPDATE ON `login` FOR EACH ROW BEGIN
    IF NEW.role = 'Patient' THEN
        UPDATE patient
        SET
            name = NEW.name,
            email = NEW.email,
            password = NEW.password
        WHERE
            email = NEW.email; -- Assuming there's an id field in your table
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update-receptionist` AFTER UPDATE ON `login` FOR EACH ROW BEGIN
    IF NEW.role = 'Receptionist' THEN
        UPDATE receptionist
        SET
            name = NEW.name,
            email = NEW.email,
            password = NEW.password
        WHERE
            email = NEW.email; -- Assuming there's an id field in your table
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patient_id` int(11) NOT NULL,
  `login_id` int(11) NOT NULL,
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `name` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `patient_pic` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`patient_id`, `login_id`, `email`, `password`, `role`, `age`, `gender`, `address`, `number`, `insurance`, `adhar_no`, `created_at`, `updated_at`, `name`, `dob`, `patient_pic`) VALUES
(1, 4, 'john@example.com', 'Password@123', 'patient', '30', 'Male', '123 Main St', '987-654-32', 'XYZ Insurance', '1234-5678-90', '2024-05-22 16:44:14', '2024-05-24 05:52:09', 'John Doe', '2001-12-31', ''),
(2, 5, 'jane@example.com', 'Password@456', 'patient', '25', 'Female', '456 Elm St', '123-456-78', 'ABC Insurance', '9876-5432-10', '2024-05-22 16:44:14', '2024-05-24 05:52:09', 'Jane Smith', '2001-12-31', ''),
(3, 6, 'alex@example.com', 'Password@789', 'patient', '40', 'Male', '789 Oak St', '456-789-01', 'DEF Insurance', '5678-9012-34', '2024-05-22 16:44:14', '2024-05-24 05:52:09', 'Alex Brown', '2001-12-31', '');

-- --------------------------------------------------------

--
-- Table structure for table `receptionist`
--

CREATE TABLE `receptionist` (
  `receptionist_id` int(11) NOT NULL,
  `login_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` int(10) NOT NULL,
  `address` varchar(100) NOT NULL,
  `salary` int(10) NOT NULL,
  `employment` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `password` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `rec_pic` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receptionist`
--

INSERT INTO `receptionist` (`receptionist_id`, `login_id`, `name`, `email`, `phone`, `address`, `salary`, `employment`, `created_at`, `updated_at`, `password`, `role`, `rec_pic`) VALUES
(1, 7, 'Alice Johnson', 'Alice@example.com', 1234567890, '123 Main St', 35000, 'Full-Time', '2024-05-22 16:48:27', '2024-05-24 05:59:32', 'Alice@123', 'receptionist', ''),
(2, 8, 'Bob Smith', 'Bob@example.com', 2147483647, '456 Elm St', 30000, 'Part-Time', '2024-05-22 16:48:27', '2024-05-24 05:59:53', 'Bob@1234', 'receptionist', ''),
(3, 9, 'Charlie Brown', 'Charlie@example.com', 2147483647, '789 Oak St', 40000, 'Full-Time', '2024-05-22 16:48:27', '2024-05-24 05:59:32', 'Charlie@123', 'receptionist', '');

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `slot_id` int(11) NOT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `status` enum('available','booked') DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `time_slots`
--

INSERT INTO `time_slots` (`slot_id`, `doctor_id`, `start_time`, `end_time`, `status`) VALUES
(1, 1, '2024-05-24 10:00:00', '2024-05-24 10:30:00', 'available'),
(2, 2, '2024-05-24 14:30:00', '2024-05-24 15:00:00', 'available'),
(3, 1, '2024-05-24 11:00:00', '2024-05-24 11:30:00', 'available');

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
  ADD KEY `receptionist_id` (`receptionist_id`),
  ADD KEY `appointment_time` (`appointment_time`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_id`),
  ADD KEY `login_id` (`login_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`login_id`),
  ADD KEY `login_id` (`login_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `login_id` (`login_id`);

--
-- Indexes for table `receptionist`
--
ALTER TABLE `receptionist`
  ADD PRIMARY KEY (`receptionist_id`),
  ADD KEY `receptionist_id` (`receptionist_id`),
  ADD KEY `login_id` (`login_id`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`slot_id`),
  ADD KEY `start_time` (`start_time`),
  ADD KEY `fk_doctor_id` (`doctor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `receptionist`
--
ALTER TABLE `receptionist`
  MODIFY `receptionist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `slot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`receptionist_id`) REFERENCES `receptionist` (`receptionist_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `doctor`
--
ALTER TABLE `doctor`
  ADD CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `login` (`login_id`);

--
-- Constraints for table `patient`
--
ALTER TABLE `patient`
  ADD CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `login` (`login_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `receptionist`
--
ALTER TABLE `receptionist`
  ADD CONSTRAINT `receptionist_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `login` (`login_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD CONSTRAINT `fk_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `appointments` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `time_slots_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
