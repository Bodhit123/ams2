-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2024 at 02:30 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `attandance`
--

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `Id` int(11) DEFAULT NULL,
  `roleName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`Id`, `roleName`) VALUES
(1, 'Teacher'),
(2, 'Admin'),
(3, 'Student');

-- --------------------------------------------------------

--
-- Table structure for table `tbladmin`
--

CREATE TABLE `tbladmin` (
  `Id` int(10) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `emailAddress` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(50) DEFAULT 'admin'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbladmin`
--

INSERT INTO `tbladmin` (`Id`, `firstName`, `lastName`, `emailAddress`, `password`, `role`) VALUES
(1, 'Admin', '', 'admin@mail.com', 'D00F5D5217896FB7FD601412CB890830', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `tblattendance`
--

CREATE TABLE `tblattendance` (
  `Id` int(10) NOT NULL,
  `admissionNo` varchar(255) NOT NULL,
  `classId` varchar(10) NOT NULL,
  `classArmId` varchar(10) NOT NULL,
  `sessionTermId` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `dateTimeTaken` varchar(20) NOT NULL,
  `subjectId` varchar(10) NOT NULL,
  `TimeTaken` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblattendance`
--

INSERT INTO `tblattendance` (`Id`, `admissionNo`, `classId`, `classArmId`, `sessionTermId`, `status`, `dateTimeTaken`, `subjectId`, `TimeTaken`) VALUES
(162, 'ASDFLKJ', '1', '2', '1', '1', '2020-11-01', '', ''),
(163, 'HSKSDD', '1', '2', '1', '1', '2020-11-01', '', ''),
(164, 'JSLDKJ', '1', '2', '1', '1', '2020-11-01', '', ''),
(172, 'HSKDS9EE', '1', '4', '1', '1', '2020-11-01', '', ''),
(171, 'JKADA', '1', '4', '1', '0', '2020-11-01', '', ''),
(170, 'JSFSKDJ', '1', '4', '1', '1', '2020-11-01', '', ''),
(173, 'ASDFLKJ', '1', '2', '1', '1', '2020-11-19', '6', '11am-12am'),
(174, 'HSKSDD', '1', '2', '1', '1', '2020-11-19', '6', '11am-12am'),
(175, 'JSLDKJ', '1', '2', '1', '1', '2020-11-19', '6', '11am-12am'),
(176, 'JSFSKDJ', '1', '4', '1', '0', '2021-07-15', '6', '11am-12am'),
(177, 'JKADA', '1', '4', '1', '0', '2021-07-15', '6', '11am-12am'),
(178, 'HSKDS9EE', '1', '4', '1', '0', '2021-07-15', '6', '11am-12am'),
(179, 'ASDFLKJ', '1', '2', '1', '1', '2021-09-27', '', ''),
(180, 'HSKSDD', '1', '2', '1', '1', '2021-09-27', '', ''),
(181, 'JSLDKJ', '1', '2', '1', '1', '2021-09-27', '', ''),
(182, 'ASDFLKJ', '1', '2', '1', '1', '2021-10-06', '', ''),
(183, 'HSKSDD', '1', '2', '1', '0', '2021-10-06', '', ''),
(184, 'JSLDKJ', '1', '2', '1', '1', '2021-10-06', '', ''),
(185, 'ASDFLKJ', '1', '2', '1', '1', '2021-10-07', '', ''),
(186, 'HSKSDD', '1', '2', '1', '0', '2021-10-07', '', ''),
(187, 'JSLDKJ', '1', '2', '1', '0', '2021-10-07', '', ''),
(188, 'AMS110', '4', '6', '1', '1', '2021-10-07', '', ''),
(189, 'AMS133', '4', '6', '1', '1', '2021-10-07', '1', '8am-9am'),
(190, 'AMS135', '4', '6', '1', '0', '2021-10-07', '', ''),
(191, 'AMS144', '4', '6', '1', '1', '2021-10-07', '', ''),
(192, 'AMS148', '4', '6', '1', '0', '2021-10-07', '', ''),
(193, 'AMS151', '4', '6', '1', '1', '2021-10-07', '', ''),
(194, 'AMS159', '4', '6', '1', '1', '2021-10-07', '', ''),
(195, 'AMS161', '4', '6', '1', '1', '2021-10-07', '', ''),
(196, 'AMS110', '4', '6', '1', '1', '2022-06-06', '', ''),
(197, 'AMS133', '4', '6', '1', '1', '2022-06-06', '', ''),
(198, 'AMS135', '4', '6', '1', '0', '2022-06-06', '', ''),
(199, 'AMS144', '4', '6', '1', '1', '2022-06-06', '', ''),
(200, 'AMS148', '4', '6', '1', '0', '2022-06-06', '', ''),
(201, 'AMS151', '4', '6', '1', '1', '2022-06-06', '', ''),
(202, 'AMS159', '4', '6', '1', '1', '2022-06-06', '', ''),
(203, 'AMS161', '4', '6', '1', '1', '2022-06-06', '', ''),
(204, 'AMS110', '4', '6', '4', '1', '2023-04-29', '', ''),
(205, 'AMS133', '4', '6', '4', '1', '2023-04-29', '', ''),
(206, 'AMS135', '4', '6', '4', '0', '2023-04-29', '', ''),
(207, 'AMS144', '4', '6', '4', '1', '2023-04-29', '', ''),
(208, 'AMS148', '4', '6', '4', '0', '2023-04-29', '', ''),
(209, 'AMS151', '4', '6', '4', '1', '2023-04-29', '', ''),
(210, 'AMS159', '4', '6', '4', '0', '2023-04-29', '', ''),
(211, 'AMS161', '4', '6', '4', '1', '2023-04-29', '', ''),
(216, 'AMS007', '1', '2', '4', '1', '2023-04-30', '', ''),
(215, 'AMS005', '1', '2', '4', '1', '2023-04-30', '', ''),
(214, 'ASDFLKJ', '1', '2', '4', '1', '2023-04-30', '', ''),
(217, 'AMS005', '1', '2', '1', '1', '2023-05-01', '', ''),
(218, 'AMS007', '1', '2', '1', '1', '2023-05-01', '', ''),
(219, 'ASDFLKJ', '1', '2', '1', '1', '2023-05-01', '5', '10am-11am'),
(220, 'AMS005', '1', '2', '1', '1', '2023-05-03', '5', '10am-11am'),
(221, 'AMS007', '1', '2', '1', '1', '2023-05-03', '5', '10am-11am'),
(222, 'ASDFLKJ', '1', '2', '1', '1', '2023-05-03', '6', '11am-12am'),
(223, 'AMS687', '3', '5', '4', '1', '2023-05-04', '6', '11am-12am'),
(224, 'AMS019', '3', '5', '1', '1', '2023-05-04', '3', '11am-12am'),
(225, 'AMS021', '3', '5', '1', '1', '2023-05-04', '3', '11am-12am'),
(226, 'AMS005', '1', '2', '1', '1', '2023-05-04', '6', '7am-8am'),
(227, 'AMS007', '1', '2', '1', '1', '2023-05-04', '6', '7am-8am'),
(228, 'ASDFLKJ', '1', '2', '1', '1', '2023-05-04', '6', '7am-8am'),
(229, 'AMS005', '1', '2', '1', '1', '2023-05-05', '5', '10am-11am'),
(230, 'AMS007', '1', '2', '1', '1', '2023-05-05', '5', '10am-11am'),
(231, 'ASDFLKJ', '1', '2', '1', '1', '2023-05-05', '5', '8am-9am'),
(246, 'AMS021', '3', '5', '4', '1', '2023-05-06', '', ''),
(245, 'AMS019', '3', '5', '4', '1', '2023-05-06', '', ''),
(244, 'AMS687', '3', '5', '4', '1', '2023-05-06', '', ''),
(243, 'ASDFLKJ', '1', '2', '4', '1', '2023-05-06', '', ''),
(242, 'AMS007', '1', '2', '4', '1', '2023-05-06', '', ''),
(241, 'AMS005', '1', '2', '4', '1', '2023-05-06', '', ''),
(279, 'AMS021', '3', '5', '4', '1', '2023-05-12', '', ''),
(278, 'AMS019', '3', '5', '4', '1', '2023-05-12', '3', '11am-12am'),
(277, 'AMS687', '3', '5', '4', '1', '2023-05-12', '', ''),
(264, 'AMS005', '1', '2', '4', '1', '2023-05-08', '5', '10am-11am'),
(263, 'ASDFLKJ', '1', '2', '4', '1', '2023-05-08', '5', '10am-11am'),
(262, 'AMS007', '1', '2', '4', '1', '2023-05-08', '5', '10am-11am'),
(276, 'AMS019', '3', '5', '4', '1', '2023-05-09', '3', '10am-11am'),
(275, 'AMS687', '3', '5', '4', '1', '2023-05-09', '3', '10am-11am'),
(274, 'AMS021', '3', '5', '4', '1', '2023-05-09', '3', '10am-11am'),
(280, 'AMS005', '1', '2', '4', '1', '2023-05-12', '', ''),
(281, 'AMS007', '1', '2', '4', '1', '2023-05-12', '', ''),
(282, 'ASDFLKJ', '1', '2', '4', '1', '2023-05-12', '', ''),
(283, 'AMS012', '1', '4', '4', '1', '2023-05-16', '5', '10am-11am'),
(284, 'AMS015', '1', '4', '4', '1', '2023-05-16', '5', '10am-11am'),
(285, 'AMS017', '1', '4', '4', '1', '2023-05-16', '5', '10am-11am'),
(291, 'AMS021', '3', '5', '4', '1', '2023-05-18', '3', '11am-12am'),
(290, 'AMS019', '3', '5', '4', '1', '2023-05-18', '3', '11am-12am'),
(289, 'AMS687', '3', '5', '4', '1', '2023-05-18', '3', '11am-12am'),
(300, 'AMS019', '3', '5', '4', '0', '2023-05-18', '3', '10am-11am'),
(299, 'AMS021', '3', '5', '4', '0', '2023-05-18', '3', '10am-11am'),
(298, 'AMS687', '3', '5', '4', '0', '2023-05-18', '3', '10am-11am'),
(328, 'AMS007', '1', '2', '4', '0', '2023-06-04', '5', '8am-9am'),
(329, 'ASDFLKJ', '1', '2', '4', '0', '2023-06-04', '5', '8am-9am'),
(327, 'AMS005', '1', '2', '4', '0', '2023-06-04', '5', '8am-9am'),
(326, 'AMS017', '1', '4', '4', '0', '2023-06-04', '5', '8am-9am'),
(325, 'AMS015', '1', '4', '4', '0', '2023-06-04', '5', '8am-9am'),
(324, 'AMS012', '1', '4', '4', '0', '2023-06-04', '5', '8am-9am'),
(320, 'ASDFLKJ', '1', '2', '4', '1', '2023-06-01', '5', '8am-9am'),
(319, 'AMS005', '1', '2', '4', '1', '2023-06-01', '5', '8am-9am'),
(318, 'AMS007', '1', '2', '4', '1', '2023-06-01', '5', '8am-9am'),
(338, 'AMS007', '1', '2', '4', '1', '2024-01-05', '5', '10am-11am'),
(339, 'ASDFLKJ', '1', '2', '4', '1', '2024-01-05', '5', '10am-11am'),
(340, 'AMS007', '1', '2', '4', '1', '2024-01-05', '6', '11am-12am'),
(341, 'ASDFLKJ', '1', '2', '4', '1', '2024-01-05', '6', '11am-12am');

-- --------------------------------------------------------

--
-- Table structure for table `tblclass`
--

CREATE TABLE `tblclass` (
  `Id` int(10) NOT NULL,
  `className` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblclass`
--

INSERT INTO `tblclass` (`Id`, `className`) VALUES
(1, 'Seven'),
(3, 'Eight'),
(4, 'Nine'),
(5, 'Five');

-- --------------------------------------------------------

--
-- Table structure for table `tblclassarms`
--

CREATE TABLE `tblclassarms` (
  `Id` int(10) NOT NULL,
  `classId` varchar(10) NOT NULL,
  `classArmName` varchar(255) NOT NULL,
  `isAssigned` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblclassarms`
--

INSERT INTO `tblclassarms` (`Id`, `classId`, `classArmName`, `isAssigned`) VALUES
(2, '1', 'S1', '1'),
(4, '1', 'S2', '1'),
(5, '3', 'E1', '1'),
(6, '4', 'N1', '1'),
(7, '4', 'section-a', '0'),
(9, '5', 'F1', '0'),
(10, '5', 'F2', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tblclassteacher`
--

CREATE TABLE `tblclassteacher` (
  `Id` int(10) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `emailAddress` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNo` varchar(50) NOT NULL,
  `classId` varchar(10) NOT NULL,
  `classArmId` varchar(10) NOT NULL,
  `dateCreated` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'teacher'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblclassteacher`
--

INSERT INTO `tblclassteacher` (`Id`, `firstName`, `lastName`, `emailAddress`, `password`, `phoneNo`, `classId`, `classArmId`, `dateCreated`, `role`) VALUES
(1, 'Will', 'Kibagendi', 'teacher2@mail.com', '32250170a0dca92d53ec9624f336ca24', '09089898999', '1', '2', '2022-10-31', 'teacher'),
(4, 'Demola', 'Ade', 'teacher3@gmail.com', '32250170a0dca92d53ec9624f336ca24', '09672002882', '1', '4', '2022-11-01', 'teacher'),
(5, 'Ryan', 'Mbeche', 'teacher4@mail.com', '32250170a0dca92d53ec9624f336ca24', '7014560000', '3', '5', '2022-10-07', 'teacher'),
(6, 'John', 'Keroche', 'teacher@mail.com', '32250170a0dca92d53ec9624f336ca24', '0100000030', '4', '6', '2022-10-07', 'teacher');

-- --------------------------------------------------------

--
-- Table structure for table `tblsessionterm`
--

CREATE TABLE `tblsessionterm` (
  `Id` int(10) NOT NULL,
  `sessionName` varchar(50) NOT NULL,
  `termId` varchar(50) NOT NULL,
  `isActive` varchar(10) NOT NULL,
  `dateCreated` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblsessionterm`
--

INSERT INTO `tblsessionterm` (`Id`, `sessionName`, `termId`, `isActive`, `dateCreated`) VALUES
(1, '2021/2022', '1', '0', '2022-10-31'),
(3, '2021/2022', '2', '0', '2022-10-31'),
(4, '2022/2023', '2', '1', '2022-4-30');

-- --------------------------------------------------------

--
-- Table structure for table `tblstudents`
--

CREATE TABLE `tblstudents` (
  `Id` int(10) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `otherName` varchar(255) NOT NULL,
  `admissionNumber` varchar(255) NOT NULL,
  `password` varchar(50) NOT NULL DEFAULT '12345',
  `classId` varchar(10) NOT NULL,
  `classArmId` varchar(10) NOT NULL,
  `dateCreated` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblstudents`
--

INSERT INTO `tblstudents` (`Id`, `firstName`, `lastName`, `otherName`, `admissionNumber`, `password`, `classId`, `classArmId`, `dateCreated`) VALUES
(1, 'Thomas', 'Omari', 'none', 'AMS005', '', '', '', '2024-1-4'),
(3, 'Samuel', 'Ondieki', 'none', 'AMS007', '12345', '1', '2', '2023-4-26'),
(4, 'Mila', 'Ol', 'none', 'AMS687', '12345', '3', '5', '2023-3-25'),
(5, 'Luis', 'Ayo', 'none', 'AMS012', '12345', '1', '4', '2022-10-31'),
(6, 'Sandra', 'Sagero', 'none', 'AMS015', '12345', '1', '4', '2022-10-31'),
(7, 'Smith', 'Makori', 'Mack', 'AMS017', '12345', '1', '4', '2022-10-31'),
(8, 'Juliana', 'Kerubo', 'none', 'AMS019', '12345', '3', '5', '2022-10-31'),
(9, 'Richard', 'Semo', 'none', 'AMS021', '12345', '3', '5', '2022-10-31'),
(10, 'Jon', 'Mbeeka', 'none', 'AMS110', '12345', '4', '6', '2022-10-07'),
(11, 'Aida', 'Moraa', 'none', 'AMS133', '12345', '4', '6', '2022-10-07'),
(12, 'Miguel', 'Bush', 'none', 'AMS135', '12345', '4', '6', '2022-10-07'),
(13, 'Sergio', 'Hammons', 'none', 'AMS144', '12345', '4', '6', '2022-10-07'),
(14, 'Lyn', 'Rogers', 'none', 'AMS148', '12345', '4', '6', '2022-10-07'),
(15, 'James', 'Dominick', 'none', 'AMS151', '12345', '4', '6', '2022-10-07'),
(16, 'Ethel', 'Quin', 'none', 'AMS159', '12345', '4', '6', '2022-10-07'),
(17, 'Roland', 'Estrada', 'none', 'AMS161', '12345', '4', '6', '2022-10-07'),
(21, 'Vivian', 'richard', 'none', 'ASDFLKJ', '12345', '1', '2', '2023-4-30');

-- --------------------------------------------------------

--
-- Table structure for table `tblsubjects`
--

CREATE TABLE `tblsubjects` (
  `Id` int(10) NOT NULL,
  `subjectName` varchar(50) NOT NULL,
  `classId` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblsubjects`
--

INSERT INTO `tblsubjects` (`Id`, `subjectName`, `classId`) VALUES
(1, 'Physics', '4'),
(2, 'Maths', '4'),
(3, 'Science', '3'),
(4, 'English', '3'),
(5, 'Science', '1'),
(6, 'Social Science', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tblterm`
--

CREATE TABLE `tblterm` (
  `Id` int(10) NOT NULL,
  `termName` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblterm`
--

INSERT INTO `tblterm` (`Id`, `termName`) VALUES
(1, 'First'),
(2, 'Second'),
(3, 'Third');

-- --------------------------------------------------------

--
-- Table structure for table `timetable`
--

CREATE TABLE `timetable` (
  `Id` int(10) NOT NULL,
  `classId` varchar(10) DEFAULT NULL,
  `classArmId` varchar(10) DEFAULT NULL,
  `subjectId` varchar(10) DEFAULT NULL,
  `Day` varchar(10) DEFAULT NULL,
  `Time` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `timetable`
--

INSERT INTO `timetable` (`Id`, `classId`, `classArmId`, `subjectId`, `Day`, `Time`) VALUES
(1, '1', '2', '5', 'Monday', '10am-11am'),
(2, '1', '2', '6', 'Monday', '11am-12am'),
(3, '1', '4', '5', 'Monday', '11am-12am'),
(4, '1', '4', '6', 'Monday', '10am-11am'),
(5, '3', '5', '3', 'Monday', '7am-8am'),
(6, '3', '5', '4', 'Monday', '10am-11am'),
(7, '1', '2', '5', 'Tuesday', '7am-8am'),
(8, '1', '2', '6', 'Tuesday', '8am-9am'),
(9, '1', '4', '5', 'Tuesday', '10am-11am'),
(10, '1', '4', '6', 'Tuesday', '11am-12am'),
(11, '3', '5', '3', 'Tuesday', '10am-11am'),
(12, '3', '5', '4', 'Tuesday', '11am-12am'),
(13, '1', '2', '5', 'Wednesday', '10am-11am'),
(14, '1', '2', '6', 'Wednesday', '11am-12am'),
(15, '1', '2', '6', 'Wednesday', '7am-8am'),
(16, '1', '2', '5', 'Wednesday', '8am-9am'),
(17, '1', '4', '6', 'Wednesday', '11am-12am'),
(18, '1', '4', '5', 'Wednesday', '7am-8am'),
(19, '3', '5', '3', 'Wednesday', '11am-12am'),
(20, '3', '5', '4', 'Wednesday', '10am-11am'),
(21, '1', '2', '6', 'Thursday', '7am-8am'),
(22, '1', '2', '5', 'Thursday', '8am-9am'),
(23, '1', '4', '6', 'Thursday', '11am-12am'),
(24, '1', '4', '5', 'Thursday', '7am-8am'),
(25, '3', '5', '3', 'Thursday', '11am-12am'),
(26, '3', '5', '4', 'Thursday', '10am-11am'),
(27, '1', '2', '5', 'Friday', '10am-11am'),
(28, '1', '2', '5', 'Friday', '8am-9am'),
(29, '1', '2', '6', 'Friday', '11am-12am'),
(30, '1', '4', '6', 'Friday', '8am-9am'),
(33, '1', '4', '5', 'Friday', '7am-8am'),
(34, '3', '5', '3', 'Friday', '11am-12am'),
(35, '3', '5', '4', 'Friday', '10am-11am'),
(36, '3', '5', '3', 'Saturday', '8am-9am'),
(37, '3', '5', '4', 'Saturday', '9am-10am'),
(38, '1', '2', '5', 'Saturday', '11am-12am'),
(39, '1', '2', '6', 'Saturday', '10am-11am'),
(40, '1', '4', '5', 'Saturday', '8am-9am'),
(41, '1', '4', '6', 'Saturday', '11am-12am'),
(42, '4', '6', '1', 'Thursday', '8am-9am');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbladmin`
--
ALTER TABLE `tbladmin`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `tblattendance`
--
ALTER TABLE `tblattendance`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `tblclass`
--
ALTER TABLE `tblclass`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `tblclassarms`
--
ALTER TABLE `tblclassarms`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `tblclassteacher`
--
ALTER TABLE `tblclassteacher`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `tblsessionterm`
--
ALTER TABLE `tblsessionterm`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `tblstudents`
--
ALTER TABLE `tblstudents`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `tblterm`
--
ALTER TABLE `tblterm`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `timetable`
--
ALTER TABLE `timetable`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbladmin`
--
ALTER TABLE `tbladmin`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tblattendance`
--
ALTER TABLE `tblattendance`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=342;

--
-- AUTO_INCREMENT for table `tblclass`
--
ALTER TABLE `tblclass`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tblclassarms`
--
ALTER TABLE `tblclassarms`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tblclassteacher`
--
ALTER TABLE `tblclassteacher`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tblsessionterm`
--
ALTER TABLE `tblsessionterm`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tblstudents`
--
ALTER TABLE `tblstudents`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tblterm`
--
ALTER TABLE `tblterm`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `timetable`
--
ALTER TABLE `timetable`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
