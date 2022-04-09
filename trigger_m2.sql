-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  sam. 09 avr. 2022 à 07:23
-- Version du serveur :  5.7.24
-- Version de PHP :  7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `trigger_m2`
--

-- --------------------------------------------------------

--
-- Structure de la table `audit_employe`
--

DROP TABLE IF EXISTS `audit_employe`;
CREATE TABLE IF NOT EXISTS `audit_employe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quand` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `qui` varchar(30) DEFAULT NULL,
  `quoi` varchar(10) DEFAULT NULL,
  `ancien_salaire` int(11) DEFAULT NULL,
  `nouveau_salaire` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `employe`
--

DROP TABLE IF EXISTS `employe`;
CREATE TABLE IF NOT EXISTS `employe` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `salaire` int(11) NOT NULL,
  `service_id` int(10) UNSIGNED DEFAULT NULL,
  `nom` varchar(80) NOT NULL,
  `role` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_9d3050503aaca31b179f4a0546c` (`service_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déclencheurs `employe`
--
DROP TRIGGER IF EXISTS `audit_employe_delete`;
DELIMITER $$
CREATE TRIGGER `audit_employe_delete` AFTER DELETE ON `employe` FOR EACH ROW BEGIN
	DECLARE USER_COURANT varchar(25);
	SET USER_COURANT = (SELECT CURRENT_USER());
    INSERT INTO audit_employe (id,quand,qui,quoi,ancien_salaire,nouveau_salaire) VALUES(null,CURRENT_TIMESTAMP,USER_COURANT,"DELETE",OLD.salaire,0); 
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `audit_insert_employe`;
DELIMITER $$
CREATE TRIGGER `audit_insert_employe` BEFORE INSERT ON `employe` FOR EACH ROW BEGIN
	DECLARE USER_COURANT varchar(25);
	SET USER_COURANT = (SELECT CURRENT_USER());
    INSERT INTO audit_employe (id,quand,qui,quoi,ancien_salaire,nouveau_salaire) VALUES(null,CURRENT_TIMESTAMP,USER_COURANT,"INSERT",0,NEW.salaire); 
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `audit_update_employe`;
DELIMITER $$
CREATE TRIGGER `audit_update_employe` BEFORE UPDATE ON `employe` FOR EACH ROW BEGIN
	DECLARE USER_COURANT varchar(25);
	SET USER_COURANT = (SELECT CURRENT_USER());
    INSERT INTO audit_employe (id,quand,qui,quoi,ancien_salaire,nouveau_salaire) VALUES(null,CURRENT_TIMESTAMP,USER_COURANT,"UPDATE",OLD.salaire,NEW.salaire); 
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `employe_trigger_insert`;
DELIMITER $$
CREATE TRIGGER `employe_trigger_insert` BEFORE INSERT ON `employe` FOR EACH ROW BEGIN
    IF NEW.salaire < 1000 THEN
     SET NEW.salaire = 1000;
   	ELSEIF NEW.salaire > 5000 THEN SET NEW.salaire = 5000;
    END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `synthese_trigger_delete`;
DELIMITER $$
CREATE TRIGGER `synthese_trigger_delete` AFTER DELETE ON `employe` FOR EACH ROW BEGIN 
DECLARE effectifs,serviceId,somme,nombre_defini INTEGER;
DECLARE intitules varchar(30);
DECLARE increment,nbservice INT DEFAULT 1;
DECLARE listService CURSOR FOR SELECT * FROM service;
SELECT COUNT(id) INTO nbservice FROM service;
OPEN listService;
WHILE increment <= nbservice DO
FETCH listService INTO serviceId,intitules;
    SELECT COUNT(id) INTO effectifs FROM employe WHERE service_id = serviceId; 
    SELECT SUM(salaire) INTO somme FROM employe WHERE service_id = serviceId; 
    SELECT COUNT(*) INTO nombre_defini FROM employe WHERE service_id = serviceId AND salaire>0;
    IF somme IS NULL THEN 
    	SET somme = 0;
    END IF;
    UPDATE synthese SET effectif=effectifs,som_salaire=somme,nombre_sal_def=nombre_defini WHERE intitule=intitules;
    SET increment = increment+1;
END WHILE;
CLOSE listService;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `synthese_trigger_insert`;
DELIMITER $$
CREATE TRIGGER `synthese_trigger_insert` AFTER INSERT ON `employe` FOR EACH ROW BEGIN 
DECLARE effectifs,serviceId,somme,nombre_defini INTEGER;
DECLARE intitules varchar(30);
DECLARE increment,nbservice INT DEFAULT 1;
DECLARE listService CURSOR FOR SELECT * FROM service;
SELECT COUNT(id) INTO nbservice FROM service;
OPEN listService;
WHILE increment <= nbservice DO
FETCH listService INTO serviceId,intitules;
    SELECT COUNT(id) INTO effectifs FROM employe WHERE service_id = serviceId; 
    SELECT SUM(salaire) INTO somme FROM employe WHERE service_id = serviceId; 
    SELECT COUNT(*) INTO nombre_defini FROM employe WHERE service_id = serviceId AND salaire>0;
    IF somme IS NULL THEN 
    	SET somme = 0;
    END IF;
    UPDATE synthese SET effectif=effectifs,som_salaire=somme,nombre_sal_def=nombre_defini WHERE intitule=intitules;
    SET increment = increment+1;
END WHILE;
CLOSE listService;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `synthese_trigger_update`;
DELIMITER $$
CREATE TRIGGER `synthese_trigger_update` AFTER UPDATE ON `employe` FOR EACH ROW BEGIN 
DECLARE effectifs,serviceId,somme,nombre_defini INTEGER;
DECLARE intitules varchar(30);
DECLARE increment,nbservice INT DEFAULT 1;
DECLARE listService CURSOR FOR SELECT * FROM service;
SELECT COUNT(id) INTO nbservice FROM service;
OPEN listService;
WHILE increment <= nbservice DO
FETCH listService INTO serviceId,intitules;
    SELECT COUNT(id) INTO effectifs FROM employe WHERE service_id = serviceId; 
    SELECT SUM(salaire) INTO somme FROM employe WHERE service_id = serviceId; 
    SELECT COUNT(*) INTO nombre_defini FROM employe WHERE service_id = serviceId AND salaire>0;
    IF somme IS NULL THEN 
    	SET somme = 0;
    END IF;
    UPDATE synthese SET effectif=effectifs,som_salaire=somme,nombre_sal_def=nombre_defini WHERE intitule=intitules;
    SET increment = increment+1;
END WHILE;
CLOSE listService;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

DROP TABLE IF EXISTS `service`;
CREATE TABLE IF NOT EXISTS `service` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `intitule` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déclencheurs `service`
--
DROP TRIGGER IF EXISTS `synthese_trigger_insert_service`;
DELIMITER $$
CREATE TRIGGER `synthese_trigger_insert_service` AFTER INSERT ON `service` FOR EACH ROW BEGIN 
DECLARE effectifs,serviceId,somme,nombre_defini INTEGER;
DECLARE intitule varchar(30);
DECLARE increment,nbservice INT DEFAULT 1;
DECLARE listService CURSOR FOR SELECT * FROM service;
SELECT COUNT(id) INTO nbservice FROM service;
OPEN listService;
WHILE increment <= nbservice DO
FETCH listService INTO serviceId,intitule;
    SELECT COUNT(id) INTO effectifs FROM employe WHERE service_id = serviceId; 
    SELECT SUM(salaire) INTO somme FROM employe WHERE service_id = serviceId; 
    SELECT COUNT(*) INTO nombre_defini FROM employe WHERE service_id = serviceId AND salaire>0;
    IF somme IS NULL THEN SET somme=0;
    END IF;
    SET increment = increment+1;
END WHILE;
CLOSE listService;
INSERT INTO synthese(id,intitule,effectif,som_salaire,nombre_sal_def)VALUES(NULL,intitule,effectifs,somme,nombre_defini);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `synthese`
--

DROP TABLE IF EXISTS `synthese`;
CREATE TABLE IF NOT EXISTS `synthese` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `effectif` int(1) NOT NULL,
  `som_salaire` int(11) NOT NULL,
  `nombre_sal_def` int(11) NOT NULL,
  `intitule` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
