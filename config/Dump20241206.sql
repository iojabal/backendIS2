CREATE DATABASE  IF NOT EXISTS `is2pr` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `is2pr`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: is2pr
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Antibióticos','2024-12-06 07:01:04','2024-12-06 07:01:04'),(2,'Analgésicos','2024-12-06 07:01:12','2024-12-06 07:01:12'),(3,'Antiinflamatorios','2024-12-06 07:01:18','2024-12-06 07:01:18'),(4,'Suplementos vitamínicos','2024-12-06 07:01:25','2024-12-06 07:01:25'),(5,'Clothing','2024-12-06 07:55:57','2024-12-06 07:55:57'),(6,'Antihistamínico','2024-12-06 16:04:05','2024-12-06 16:04:05');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lotes`
--

DROP TABLE IF EXISTS `lotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lotes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha_produccion` date NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `cantidad` int NOT NULL,
  `id_proveedor` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_proveedor` (`id_proveedor`),
  CONSTRAINT `lotes_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `providers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lotes`
--

LOCK TABLES `lotes` WRITE;
/*!40000 ALTER TABLE `lotes` DISABLE KEYS */;
INSERT INTO `lotes` VALUES (1,'2024-01-15','2026-01-15',1000,1,'2024-12-06 07:02:33','2024-12-06 07:02:33'),(2,'2024-03-10','2026-03-10',500,2,'2024-12-06 07:02:41','2024-12-06 07:02:41'),(3,'2024-05-20','2026-05-20',750,3,'2024-12-06 07:02:48','2024-12-06 07:02:48'),(4,'2024-07-05','2026-07-05',1200,4,'2024-12-06 07:02:53','2024-12-06 07:02:53'),(5,'2024-07-05','2026-07-05',1200,4,'2024-12-06 16:03:32','2024-12-06 16:03:32');
/*!40000 ALTER TABLE `lotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id_product` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `actual_stock` int NOT NULL,
  `minimal_stock` int NOT NULL,
  `buy_price` float NOT NULL,
  `sell_price` float NOT NULL,
  `metric_unit` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `id_category` int DEFAULT NULL,
  `loteId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_product`),
  KEY `id_category` (`id_category`),
  KEY `loteId` (`loteId`),
  CONSTRAINT `products_ibfk_41` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_ibfk_42` FOREIGN KEY (`loteId`) REFERENCES `lotes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Aspirina 500mg','Medicamento para el alivio del dolor y fiebre.',1890,500,15.5,20,'tabletas','activo',1,1,'2024-12-06 07:05:25','2024-12-06 08:24:38'),(2,'Ibuprofeno 400mg','Antiinflamatorio y analgésico.',1487,300,12.75,18,'tabletas','activo',2,2,'2024-12-06 07:05:33','2024-12-06 08:24:38'),(3,'Paracetamol 500mg','Alivio para el dolor y la fiebre.',2428,700,10,14.5,'tabletas','activo',1,3,'2024-12-06 07:05:38','2024-12-06 08:24:38'),(4,'Amoxicilina 250mg','Antibiótico para infecciones bacterianas.',933,200,18.5,25,'cápsulas','activo',3,4,'2024-12-06 07:05:43','2024-12-06 08:24:38'),(5,'Loratadina 10mg','Antihistamínico utilizado para aliviar los síntomas de alergias como rinitis alérgica y urticaria.',1200,300,8.5,12,'tabletas','activo',6,5,'2024-12-06 16:04:40','2024-12-06 16:04:40');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_categories`
--

DROP TABLE IF EXISTS `products_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_categories` (
  `productId` int NOT NULL,
  `categoryId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productId`,`categoryId`),
  UNIQUE KEY `products_categories_productId_categoryId_unique` (`productId`,`categoryId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_categories_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_categories_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_categories`
--

LOCK TABLES `products_categories` WRITE;
/*!40000 ALTER TABLE `products_categories` DISABLE KEYS */;
INSERT INTO `products_categories` VALUES (1,1,'2024-12-06 07:05:25','2024-12-06 07:05:25'),(2,2,'2024-12-06 07:05:33','2024-12-06 07:05:33'),(3,1,'2024-12-06 07:05:38','2024-12-06 07:05:38'),(4,3,'2024-12-06 07:05:43','2024-12-06 07:05:43'),(5,6,'2024-12-06 16:04:40','2024-12-06 16:04:40');
/*!40000 ALTER TABLE `products_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `providers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` int NOT NULL,
  `nit` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (1,'Proveedor A',123456789,'123456789012','proveedoraA@example.com','2024-12-06 06:59:27','2024-12-06 06:59:27'),(2,'Proveedor B',987654321,'987654321098','proveedoraB@example.com','2024-12-06 06:59:36','2024-12-06 06:59:36'),(3,'Proveedor C',555123456,'555123456789','proveedoraC@example.com','2024-12-06 06:59:44','2024-12-06 06:59:44'),(4,'Proveedor D',333987654,'333987654321','proveedoraD@example.com','2024-12-06 06:59:51','2024-12-06 06:59:51');
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_sales`
--

DROP TABLE IF EXISTS `report_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `dia` varchar(255) NOT NULL,
  `detalles` json NOT NULL,
  `total_dia` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_fecha` (`fecha`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_sales`
--

LOCK TABLES `report_sales` WRITE;
/*!40000 ALTER TABLE `report_sales` DISABLE KEYS */;
INSERT INTO `report_sales` VALUES (1,'2024-12-06','07:42:14','12/5/2024','[{\"hour\": \"2024-12-06T14:30:00.000Z\", \"id_sale\": 1, \"totalSale\": \"150.00\"}, {\"hour\": \"2024-12-06T14:30:00.000Z\", \"id_sale\": 2, \"totalSale\": \"150.00\"}, {\"hour\": \"2024-12-06T16:00:00.000Z\", \"id_sale\": 3, \"totalSale\": \"220.00\"}, {\"hour\": \"2024-12-06T16:00:00.000Z\", \"id_sale\": 4, \"totalSale\": \"220.00\"}]',740.00),(2,'2024-12-06','07:49:19','12/5/2024','[{\"hour\": \"2024-12-06T14:30:00.000Z\", \"id_sale\": 1, \"productos\": [], \"totalSale\": \"150.00\"}, {\"hour\": \"2024-12-06T14:30:00.000Z\", \"id_sale\": 2, \"productos\": [{\"name\": \"Amoxicilina 250mg\", \"price\": 0, \"quantity\": 1, \"id_product\": null}, {\"name\": \"Paracetamol 500mg\", \"price\": 0, \"quantity\": 3, \"id_product\": null}], \"totalSale\": \"150.00\"}, {\"hour\": \"2024-12-06T16:00:00.000Z\", \"id_sale\": 3, \"productos\": [], \"totalSale\": \"220.00\"}, {\"hour\": \"2024-12-06T16:00:00.000Z\", \"id_sale\": 4, \"productos\": [{\"name\": \"Amoxicilina 250mg\", \"price\": 0, \"quantity\": 1, \"id_product\": null}, {\"name\": \"Ibuprofeno 400mg\", \"price\": 0, \"quantity\": 2, \"id_product\": null}, {\"name\": \"Aspirina 500mg\", \"price\": 0, \"quantity\": 1, \"id_product\": null}], \"totalSale\": \"220.00\"}]',740.00),(3,'2024-12-06','07:50:10','12/5/2024','[{\"hour\": \"2024-12-06T14:30:00.000Z\", \"id_sale\": 1, \"productos\": [], \"totalSale\": \"150.00\"}, {\"hour\": \"2024-12-06T14:30:00.000Z\", \"id_sale\": 2, \"productos\": [{\"name\": \"Amoxicilina 250mg\", \"price\": 25, \"quantity\": 1, \"id_product\": null}, {\"name\": \"Paracetamol 500mg\", \"price\": 14.5, \"quantity\": 3, \"id_product\": null}], \"totalSale\": \"150.00\"}, {\"hour\": \"2024-12-06T16:00:00.000Z\", \"id_sale\": 3, \"productos\": [], \"totalSale\": \"220.00\"}, {\"hour\": \"2024-12-06T16:00:00.000Z\", \"id_sale\": 4, \"productos\": [{\"name\": \"Amoxicilina 250mg\", \"price\": 25, \"quantity\": 1, \"id_product\": null}, {\"name\": \"Ibuprofeno 400mg\", \"price\": 18, \"quantity\": 2, \"id_product\": null}, {\"name\": \"Aspirina 500mg\", \"price\": 20, \"quantity\": 1, \"id_product\": null}], \"totalSale\": \"220.00\"}]',740.00),(4,'2024-12-06','08:31:28','12/5/2024','[{\"hour\": \"2024-12-06T14:30:00.000Z\", \"id_sale\": 1, \"productos\": [], \"totalSale\": \"150.00\"}, {\"hour\": \"2024-12-06T14:30:00.000Z\", \"id_sale\": 2, \"productos\": [{\"name\": \"Paracetamol 500mg\", \"price\": 14.5, \"quantity\": 3, \"id_product\": null}, {\"name\": \"Amoxicilina 250mg\", \"price\": 25, \"quantity\": 1, \"id_product\": null}], \"totalSale\": \"150.00\"}, {\"hour\": \"2024-12-06T16:00:00.000Z\", \"id_sale\": 3, \"productos\": [], \"totalSale\": \"220.00\"}, {\"hour\": \"2024-12-06T16:00:00.000Z\", \"id_sale\": 4, \"productos\": [{\"name\": \"Aspirina 500mg\", \"price\": 20, \"quantity\": 1, \"id_product\": null}, {\"name\": \"Ibuprofeno 400mg\", \"price\": 18, \"quantity\": 2, \"id_product\": null}, {\"name\": \"Amoxicilina 250mg\", \"price\": 25, \"quantity\": 1, \"id_product\": null}], \"totalSale\": \"220.00\"}, {\"hour\": \"2024-12-06T08:14:32.000Z\", \"id_sale\": 5, \"productos\": [{\"name\": \"Aspirina 500mg\", \"price\": 20, \"quantity\": 3, \"id_product\": null}, {\"name\": \"Ibuprofeno 400mg\", \"price\": 18, \"quantity\": 4, \"id_product\": null}, {\"name\": \"Paracetamol 500mg\", \"price\": 14.5, \"quantity\": 5, \"id_product\": null}], \"totalSale\": \"204.50\"}, {\"hour\": \"2024-12-06T08:16:02.000Z\", \"id_sale\": 6, \"productos\": [{\"name\": \"Aspirina 500mg\", \"price\": 20, \"quantity\": 90, \"id_product\": null}], \"totalSale\": \"1800.00\"}, {\"hour\": \"2024-12-06T08:17:13.000Z\", \"id_sale\": 7, \"productos\": [{\"name\": \"Aspirina 500mg\", \"price\": 20, \"quantity\": 54, \"id_product\": null}, {\"name\": \"Ibuprofeno 400mg\", \"price\": 18, \"quantity\": 6, \"id_product\": null}, {\"name\": \"Paracetamol 500mg\", \"price\": 14.5, \"quantity\": 64, \"id_product\": null}], \"totalSale\": \"2116.00\"}, {\"hour\": \"2024-12-06T08:24:38.000Z\", \"id_sale\": 8, \"productos\": [{\"name\": \"Aspirina 500mg\", \"price\": 20, \"quantity\": 56, \"id_product\": null}, {\"name\": \"Ibuprofeno 400mg\", \"price\": 18, \"quantity\": 7, \"id_product\": null}, {\"name\": \"Paracetamol 500mg\", \"price\": 14.5, \"quantity\": 8, \"id_product\": null}, {\"name\": \"Amoxicilina 250mg\", \"price\": 25, \"quantity\": 67, \"id_product\": null}], \"totalSale\": \"3037.00\"}]',7897.50),(5,'2024-12-06','08:33:29','12/5/2024','[{\"hour\": \"2024-12-06T14:30:00.000Z\", \"id_sale\": 1, \"productos\": [], \"totalSale\": \"150.00\"}, {\"hour\": \"2024-12-06T14:30:00.000Z\", \"id_sale\": 2, \"productos\": [{\"name\": \"Paracetamol 500mg\", \"price\": 14.5, \"quantity\": 3, \"id_product\": null}, {\"name\": \"Amoxicilina 250mg\", \"price\": 25, \"quantity\": 1, \"id_product\": null}], \"totalSale\": \"150.00\"}, {\"hour\": \"2024-12-06T16:00:00.000Z\", \"id_sale\": 3, \"productos\": [], \"totalSale\": \"220.00\"}, {\"hour\": \"2024-12-06T16:00:00.000Z\", \"id_sale\": 4, \"productos\": [{\"name\": \"Aspirina 500mg\", \"price\": 20, \"quantity\": 1, \"id_product\": null}, {\"name\": \"Ibuprofeno 400mg\", \"price\": 18, \"quantity\": 2, \"id_product\": null}, {\"name\": \"Amoxicilina 250mg\", \"price\": 25, \"quantity\": 1, \"id_product\": null}], \"totalSale\": \"220.00\"}, {\"hour\": \"2024-12-06T08:14:32.000Z\", \"id_sale\": 5, \"productos\": [{\"name\": \"Aspirina 500mg\", \"price\": 20, \"quantity\": 3, \"id_product\": null}, {\"name\": \"Ibuprofeno 400mg\", \"price\": 18, \"quantity\": 4, \"id_product\": null}, {\"name\": \"Paracetamol 500mg\", \"price\": 14.5, \"quantity\": 5, \"id_product\": null}], \"totalSale\": \"204.50\"}, {\"hour\": \"2024-12-06T08:16:02.000Z\", \"id_sale\": 6, \"productos\": [{\"name\": \"Aspirina 500mg\", \"price\": 20, \"quantity\": 90, \"id_product\": null}], \"totalSale\": \"1800.00\"}, {\"hour\": \"2024-12-06T08:17:13.000Z\", \"id_sale\": 7, \"productos\": [{\"name\": \"Aspirina 500mg\", \"price\": 20, \"quantity\": 54, \"id_product\": null}, {\"name\": \"Ibuprofeno 400mg\", \"price\": 18, \"quantity\": 6, \"id_product\": null}, {\"name\": \"Paracetamol 500mg\", \"price\": 14.5, \"quantity\": 64, \"id_product\": null}], \"totalSale\": \"2116.00\"}, {\"hour\": \"2024-12-06T08:24:38.000Z\", \"id_sale\": 8, \"productos\": [{\"name\": \"Aspirina 500mg\", \"price\": 20, \"quantity\": 56, \"id_product\": null}, {\"name\": \"Ibuprofeno 400mg\", \"price\": 18, \"quantity\": 7, \"id_product\": null}, {\"name\": \"Paracetamol 500mg\", \"price\": 14.5, \"quantity\": 8, \"id_product\": null}, {\"name\": \"Amoxicilina 250mg\", \"price\": 25, \"quantity\": 67, \"id_product\": null}], \"totalSale\": \"3037.00\"}]',7897.50);
/*!40000 ALTER TABLE `report_sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'supervisor','2024-12-06 16:24:15','2024-12-06 16:24:15'),(2,'empleado','2024-12-06 16:24:27','2024-12-06 16:24:27');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `totalSale` decimal(10,2) NOT NULL,
  `hour` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fecha` (`fecha`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`fecha`) REFERENCES `report_sales` (`fecha`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,150.00,'2024-12-06 14:30:00','2024-12-06 07:08:29','2024-12-06 07:08:29',NULL),(2,150.00,'2024-12-06 14:30:00','2024-12-06 07:08:49','2024-12-06 07:08:49',NULL),(3,220.00,'2024-12-06 16:00:00','2024-12-06 07:09:01','2024-12-06 07:09:01',NULL),(4,220.00,'2024-12-06 16:00:00','2024-12-06 07:09:50','2024-12-06 07:09:50',NULL),(5,204.50,'2024-12-06 08:14:32','2024-12-06 08:14:32','2024-12-06 08:14:32',NULL),(6,1800.00,'2024-12-06 08:16:02','2024-12-06 08:16:02','2024-12-06 08:16:02',NULL),(7,2116.00,'2024-12-06 08:17:13','2024-12-06 08:17:13','2024-12-06 08:17:13',NULL),(8,3037.00,'2024-12-06 08:24:38','2024-12-06 08:24:38','2024-12-06 08:24:38',NULL);
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_products`
--

DROP TABLE IF EXISTS `sales_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `saleId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sales_products_saleId_productId_unique` (`saleId`,`productId`),
  KEY `productId` (`productId`),
  CONSTRAINT `sales_products_ibfk_39` FOREIGN KEY (`saleId`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sales_products_ibfk_40` FOREIGN KEY (`productId`) REFERENCES `products` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_products`
--

LOCK TABLES `sales_products` WRITE;
/*!40000 ALTER TABLE `sales_products` DISABLE KEYS */;
INSERT INTO `sales_products` VALUES (1,2,3,3,90.00),(2,2,4,1,60.00),(6,4,1,1,50.00),(7,4,2,2,100.00),(8,4,4,1,70.00),(9,5,3,5,72.50),(10,5,2,4,72.00),(11,5,1,3,60.00),(12,6,1,90,1800.00),(13,7,3,64,928.00),(14,7,2,6,108.00),(15,7,1,54,1080.00),(16,8,4,67,1675.00),(17,8,3,8,116.00),(18,8,2,7,126.00),(19,8,1,56,1120.00);
/*!40000 ALTER TABLE `sales_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ci` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_10` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_11` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_12` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_13` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_14` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_15` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_16` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_17` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_18` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_19` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_20` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_21` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_4` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_5` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_6` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_7` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_8` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_9` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'12345678','Juan','Pérez','juanperez','$2b$10$7jQEdtJWeMGavFEsBmyYVei48KXyq3PTLkKBPdCWeH9b2z4.jvK9K',2,'2024-12-06 16:24:57','2024-12-06 16:24:57');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-06 14:07:08
