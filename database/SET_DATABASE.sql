/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : localhost:3306
 Source Schema         : applicationtrackingsystem

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 22/10/2021 00:50:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for application
-- ----------------------------
DROP TABLE IF EXISTS `application`;
CREATE TABLE `application` (
  `userId` int NOT NULL,
  `jobId` int NOT NULL,
  `updateTime` date DEFAULT NULL,
  `applyStatus` int NOT NULL COMMENT '1: Wish list 2: Waiting 3:Applied 4: Rejected',
  PRIMARY KEY (`userId`,`jobId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of application
-- ----------------------------
BEGIN;
INSERT INTO `application` VALUES (1, 1, '2021-09-01', 1);
INSERT INTO `application` VALUES (1, 2, '2021-09-02', 1);
INSERT INTO `application` VALUES (1, 3, '2021-07-10', 3);
INSERT INTO `application` VALUES (1, 4, '2021-08-01', 2);
INSERT INTO `application` VALUES (1, 5, '2021-08-20', 4);
INSERT INTO `application` VALUES (1, 6, '2021-08-30', 4);
INSERT INTO `application` VALUES (1, 7, '2021-08-10', 2);
COMMIT;

-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `itemId` int NOT NULL,
  `userId` int NOT NULL,
  `jobId` int NOT NULL,
  `commentTime` datetime DEFAULT NULL,
  `itemContent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`itemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of item
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for job
-- ----------------------------
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `jobId` int NOT NULL,
  `jobName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `jobCompany` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `jobReleaseDate` date DEFAULT NULL,
  `jobClass` int DEFAULT NULL,
  `jobUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`jobId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of job
-- ----------------------------
BEGIN;
INSERT INTO `job` VALUES (1, 'Backend Engineer', 'Facebook', '2020-10-01', 1, NULL);
INSERT INTO `job` VALUES (2, 'Frontend Engineer', 'Roblox', '2020-10-02', 2, NULL);
INSERT INTO `job` VALUES (3, 'Software Engineer', 'Cisco', '2020-10-03', 3, NULL);
INSERT INTO `job` VALUES (4, 'Software Engineer', 'Roblox', '2020-10-09', 4, NULL);
INSERT INTO `job` VALUES (5, 'Software Engineer', 'Google', '2020-10-08', 3, NULL);
INSERT INTO `job` VALUES (6, 'Frontend Intern', 'Google', '2020-10-07', 1, NULL);
INSERT INTO `job` VALUES (7, 'Software Engineer', 'Red Hat', '2020-10-06', 2, NULL);
INSERT INTO `job` VALUES (8, 'Software Engineer', 'Red Hat', '2020-10-05', 3, NULL);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userId` int NOT NULL,
  `userName` varchar(255) NOT NULL,
  `registerTime` datetime DEFAULT NULL,
  `userPassword` varchar(255) DEFAULT NULL,
  `userEmail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1, 'admin', NULL, NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
