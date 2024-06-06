-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2024 at 01:51 PM
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
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `login_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `receptionist_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `notes` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fees` int(7) NOT NULL,
  `appointment_date` varchar(50) NOT NULL,
  `appointment_time` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `receptionist_id`, `doctor_id`, `patient_id`, `notes`, `created_at`, `updated_at`, `fees`, `appointment_date`, `appointment_time`) VALUES
(65, 1, 1, 1, 'Follow-up checkup', '2024-06-07 03:15:00', '2024-06-07 03:15:00', 200, '2024-06-07', '09:00 AM'),
(66, 2, 1, 2, 'Regular checkup', '2024-06-07 04:15:00', '2024-06-07 04:15:00', 250, '2024-06-07', '10:00 AM'),
(67, 3, 1, 3, 'Consultation', '2024-06-07 05:15:00', '2024-06-07 05:15:00', 300, '2024-06-07', '11:00 AM'),
(68, 1, 2, 1, 'Follow-up checkup', '2024-06-07 03:45:00', '2024-06-07 03:45:00', 200, '2024-06-07', '09:30 AM'),
(69, 2, 2, 2, 'Regular checkup', '2024-06-07 04:45:00', '2024-06-07 04:45:00', 250, '2024-06-07', '10:30 AM'),
(70, 3, 2, 3, 'Consultation', '2024-06-07 05:45:00', '2024-06-07 05:45:00', 300, '2024-06-07', '11:30 AM'),
(71, 1, 3, 1, 'Follow-up checkup', '2024-06-07 04:00:00', '2024-06-07 04:00:00', 200, '2024-06-07', '09:45 AM'),
(72, 2, 3, 2, 'Regular checkup', '2024-06-07 05:00:00', '2024-06-07 05:00:00', 250, '2024-06-07', '10:45 AM'),
(73, 3, 3, 3, 'Consultation', '2024-06-07 06:00:00', '2024-06-07 06:00:00', 300, '2024-06-07', '11:45 AM');

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
  `doc_pic` varchar(255) NOT NULL,
  `hospital_loc` varchar(255) NOT NULL,
  `fees` int(7) NOT NULL,
  `education` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_id`, `login_id`, `name`, `email`, `password`, `role`, `age`, `gender`, `hospital`, `number`, `specialization`, `experience`, `created_at`, `updated_at`, `doc_pic`, `hospital_loc`, `fees`, `education`) VALUES
(1, 1, 'Dr. John Doe', 'johndoe@example.com', 'Password@1234', 'Doctor', 35, 'Male', 'City Hospital', '123-456-78', 'Cardiology', '10 years', '2024-05-22 11:09:36', '2024-06-03 07:11:53', 'path_to_doc_pic', '', 0, ''),
(2, 2, 'Dr. Jane Smith', 'janesmith@example.com', 'Password@456', 'Doctor', 42, 'Female', 'General Hospital', '987-654-32', 'Pediatrics', '15 years', '2024-05-22 11:09:36', '2024-05-30 05:02:26', 'path_to_doc_pic', '', 0, ''),
(3, 3, 'Dr. Michael Johnson', 'michaeljohnson@example.com', 'Password@789', 'Doctor', 40, 'Male', 'Community Clinic', '456-789-01', 'Orthopedics', '12 years', '2024-05-22 11:09:36', '2024-05-30 05:02:11', 'path_to_doc_pic', '', 0, '');

--
-- Triggers `doctor`
--
DELIMITER $$
CREATE TRIGGER `update_doctor1` BEFORE UPDATE ON `doctor` FOR EACH ROW BEGIN
    DECLARE v_ignore_trigger INT DEFAULT 0;
    SET v_ignore_trigger = (SELECT @TRIGGER_IGNORE := IFNULL(@TRIGGER_IGNORE, 0));

    IF v_ignore_trigger = 0 AND NEW.role = 'Doctor' THEN
        SET @TRIGGER_IGNORE = 1;
        UPDATE login
        SET
            name = NEW.name,
            email = NEW.email,
            password = NEW.password
        WHERE
            login_id = NEW.login_id;
        SET @TRIGGER_IGNORE = 0;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `help`
--

CREATE TABLE `help` (
  `user_id` int(50) NOT NULL,
  `number` varchar(10) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `message` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Dr. John Doe', 'johndoe@example.com', 'Password@1234', 'Doctor'),
(2, 'Dr. Jane Smith', 'janesmith@example.com', 'Password@456', 'Doctor'),
(3, 'Dr. Michael Johnson', 'michaeljohnson@example.com', 'Password@789', 'Doctor'),
(4, 'John Potter', 'john@example.com', 'Password@123', 'Patient'),
(5, 'Jane Smith', 'jane@example.com', 'Password@456', 'Patient'),
(6, 'Alex Brown', 'alex@example.com', 'Password@789', 'Patient'),
(7, 'Alice Johnson', 'alice@example.com', 'Alice@1234', 'Receptionist'),
(8, 'Bob Smith', 'bob@example.com', 'Bob@123456', 'Receptionist'),
(9, 'Charlie Brown', 'charlie@example.com', 'Charlie@123', 'Receptionist');

--
-- Triggers `login`
--
DELIMITER $$
CREATE TRIGGER `admin` AFTER INSERT ON `login` FOR EACH ROW BEGIN
    IF NEW.role = 'Admin' THEN
        INSERT INTO admin (name, email, password, role, login_id) VALUES (NEW.name, NEW.email, NEW.password, NEW.role, NEW.login_id);
    END IF;
END
$$
DELIMITER ;
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
CREATE TRIGGER `update-admin` AFTER UPDATE ON `login` FOR EACH ROW BEGIN
    IF NEW.role = 'Admin' THEN
        UPDATE admin
        SET
            name = NEW.name,
            email = NEW.email,
            password = NEW.password
        WHERE
            login_id = NEW.login_id; -- Assuming there's an email field in your table
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_doctor` BEFORE UPDATE ON `login` FOR EACH ROW BEGIN
    DECLARE v_ignore_trigger INT DEFAULT 0;
    SET v_ignore_trigger = (SELECT @TRIGGER_IGNORE := IFNULL(@TRIGGER_IGNORE, 0));

    IF v_ignore_trigger = 0 AND NEW.role = 'Doctor' THEN
        SET @TRIGGER_IGNORE = 1;
        UPDATE doctor
        SET
            name = NEW.name,
            email = NEW.email,
            password = NEW.password
        WHERE
            login_id = NEW.login_id;
        SET @TRIGGER_IGNORE = 0;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_patient` BEFORE UPDATE ON `login` FOR EACH ROW BEGIN
    DECLARE v_ignore_trigger INT DEFAULT 0;
    SET v_ignore_trigger = (SELECT @TRIGGER_IGNORE := IFNULL(@TRIGGER_IGNORE, 0));

    IF v_ignore_trigger = 0 AND NEW.role = 'Patient' THEN
        SET @TRIGGER_IGNORE = 1;
        UPDATE patient
        SET
            name = NEW.name,
            email = NEW.email,
            password = NEW.password
        WHERE
            login_id = NEW.login_id;
        SET @TRIGGER_IGNORE = 0;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_receptionist` BEFORE UPDATE ON `login` FOR EACH ROW BEGIN
    DECLARE v_ignore_trigger INT DEFAULT 0;
    SET v_ignore_trigger = (SELECT @TRIGGER_IGNORE := IFNULL(@TRIGGER_IGNORE, 0));

    IF v_ignore_trigger = 0 AND NEW.role = 'Receptionist' THEN
        SET @TRIGGER_IGNORE = 1;
        UPDATE receptionist
        SET
            name = NEW.name,
            email = NEW.email,
            password = NEW.password
        WHERE
            login_id = NEW.login_id;
        SET @TRIGGER_IGNORE = 0;
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
  `age` varchar(50) DEFAULT NULL,
  `gender` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `number` int(10) NOT NULL,
  `insurance` varchar(50) NOT NULL,
  `adhar_no` int(12) NOT NULL,
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
(1, 4, 'john@example.com', 'Password@123', 'Patient', '30', 'Male', '123 Main St', 987, 'Yes', 2147483647, '2024-05-22 16:44:14', '2024-06-03 07:12:43', 'John Potter', '2001-12-31', ''),
(2, 5, 'jane@example.com', 'Password@456', 'Patient', '25', 'Female', '456 Elm St', 123, 'Yes', 2147483647, '2024-05-22 16:44:14', '2024-05-30 11:03:48', 'Jane Smith', '2001-12-31', ''),
(3, 6, 'alex@example.com', 'Password@789', 'Patient', '40', 'Male', '789 Oak St', 2147483647, 'No', 5678, '2024-05-22 16:44:14', '2024-05-30 11:03:29', 'Alex Brown', '2001-12-31', '');

--
-- Triggers `patient`
--
DELIMITER $$
CREATE TRIGGER `calculate_age_trigger` BEFORE UPDATE ON `patient` FOR EACH ROW BEGIN
    IF NEW.dob <> OLD.dob THEN
        SET NEW.age = TIMESTAMPDIFF(YEAR, NEW.dob, CURDATE());
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_patient1` BEFORE UPDATE ON `patient` FOR EACH ROW BEGIN
    DECLARE v_ignore_trigger INT DEFAULT 0;
    SET v_ignore_trigger = (SELECT @TRIGGER_IGNORE := IFNULL(@TRIGGER_IGNORE, 0));

    IF v_ignore_trigger = 0 AND NEW.role = 'Patient' THEN
        SET @TRIGGER_IGNORE = 1;
        UPDATE login
        SET
            name = NEW.name,
            email = NEW.email,
            password = NEW.password
        WHERE
            login_id = NEW.login_id;
        SET @TRIGGER_IGNORE = 0;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `ratings_reviews`
--

CREATE TABLE `ratings_reviews` (
  `rating_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `rating` int(1) NOT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `review` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `ratings_reviews`
--
DELIMITER $$
CREATE TRIGGER `before_insert_rating` BEFORE INSERT ON `ratings_reviews` FOR EACH ROW BEGIN
    IF NEW.rating < 1 OR NEW.rating > 5 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rating must be between 1 and 5';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_update_rating` BEFORE UPDATE ON `ratings_reviews` FOR EACH ROW BEGIN
    IF NEW.rating < 1 OR NEW.rating > 5 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Rating must be between 1 and 5';
    END IF;
END
$$
DELIMITER ;

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
(1, 7, 'Alice Johnson', 'alice@example.com', 1234567890, '123 Main St', 35000, 'Full-Time', '2024-05-22 16:48:27', '2024-06-03 06:56:43', 'Alice@1234', 'Receptionist', ''),
(2, 8, 'Bob Smith', 'bob@example.com', 2147483647, '456 Elm St', 30000, 'Part-Time', '2024-05-22 16:48:27', '2024-06-03 06:45:39', 'Bob@123456', 'Receptionist', ''),
(3, 9, 'Charlie Brown', 'charlie@example.com', 2147483647, '789 Oak St', 40000, 'Full-Time', '2024-05-22 16:48:27', '2024-06-03 07:10:14', 'Charlie@123', 'Receptionist', '');

--
-- Triggers `receptionist`
--
DELIMITER $$
CREATE TRIGGER `update_receptionist1` BEFORE UPDATE ON `receptionist` FOR EACH ROW BEGIN
    DECLARE v_ignore_trigger INT DEFAULT 0;
    SET v_ignore_trigger = (SELECT @TRIGGER_IGNORE := IFNULL(@TRIGGER_IGNORE, 0));

    IF v_ignore_trigger = 0 AND NEW.role = 'Receptionist' THEN
        SET @TRIGGER_IGNORE = 1;
        UPDATE login
        SET
            name = NEW.name,
            email = NEW.email,
            password = NEW.password
        WHERE
            login_id = NEW.login_id;
        SET @TRIGGER_IGNORE = 0;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `slot_id` int(11) NOT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `time_period` varchar(2) DEFAULT 'am',
  `appointment_date` varchar(50) NOT NULL,
  `appointment_start_time` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `time_slots`
--

INSERT INTO `time_slots` (`slot_id`, `doctor_id`, `time_period`, `appointment_date`, `appointment_start_time`) VALUES
(48, 1, 'am', '2024-06-07', '09:00 AM'),
(49, 1, 'am', '2024-06-07', '10:00 AM'),
(50, 1, 'am', '2024-06-07', '11:00 AM'),
(51, 1, 'am', '2024-06-07', '01:00 PM'),
(52, 1, 'am', '2024-06-07', '02:00 PM'),
(53, 1, 'am', '2024-06-07', '03:00 PM'),
(54, 2, 'am', '2024-06-07', '09:30 AM'),
(55, 2, 'am', '2024-06-07', '10:30 AM'),
(56, 2, 'am', '2024-06-07', '11:30 AM'),
(57, 2, 'am', '2024-06-07', '01:30 PM'),
(58, 2, 'am', '2024-06-07', '02:30 PM'),
(59, 2, 'am', '2024-06-07', '03:30 PM'),
(60, 3, 'am', '2024-06-07', '09:45 AM'),
(61, 3, 'am', '2024-06-07', '10:45 AM'),
(62, 3, 'am', '2024-06-07', '11:45 AM'),
(63, 3, 'am', '2024-06-07', '01:45 PM'),
(64, 3, 'am', '2024-06-07', '02:45 PM'),
(65, 3, 'am', '2024-06-07', '03:45 PM');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login_id` (`login_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `login_id_2` (`login_id`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `receptionist_id` (`receptionist_id`),
  ADD KEY `appointment_date` (`appointment_date`),
  ADD KEY `appointment_time` (`appointment_time`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `login_id` (`login_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `help`
--
ALTER TABLE `help`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`login_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `login_id` (`login_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `login_id` (`login_id`);

--
-- Indexes for table `ratings_reviews`
--
ALTER TABLE `ratings_reviews`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `idx_doctor_id` (`doctor_id`),
  ADD KEY `idx_patient_id` (`patient_id`),
  ADD KEY `idx_appointment_id` (`appointment_id`);

--
-- Indexes for table `receptionist`
--
ALTER TABLE `receptionist`
  ADD PRIMARY KEY (`receptionist_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `receptionist_id` (`receptionist_id`),
  ADD KEY `login_id` (`login_id`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`slot_id`),
  ADD KEY `fk_doctor_id` (`doctor_id`),
  ADD KEY `appointment_date` (`appointment_date`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `help`
--
ALTER TABLE `help`
  MODIFY `user_id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ratings_reviews`
--
ALTER TABLE `ratings_reviews`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `receptionist`
--
ALTER TABLE `receptionist`
  MODIFY `receptionist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `slot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `login` (`login_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `ratings_reviews`
--
ALTER TABLE `ratings_reviews`
  ADD CONSTRAINT `ratings_reviews_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ratings_reviews_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ratings_reviews_ibfk_3` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `receptionist`
--
ALTER TABLE `receptionist`
  ADD CONSTRAINT `receptionist_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `login` (`login_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD CONSTRAINT `time_slots_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
