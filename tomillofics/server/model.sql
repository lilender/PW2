DROP DATABASE IF EXISTS tomillofics;
CREATE DATABASE IF NOT EXISTS tomillofics;

USE tomillofics;

DROP TABLE IF EXISTS `tomillofics`.`User` ;

CREATE TABLE IF NOT EXISTS `tomillofics`.`User` (
  `iduser` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(25) NOT NULL UNIQUE,
  `password` CHAR(64) NOT NULL,
  `email` VARCHAR(254) NOT NULL UNIQUE,
  `profile_image` BLOB NULL,
  `mode_pref` BOOLEAN NOT NULL,
  `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`iduser`)
);

DROP TABLE IF EXISTS `tomillofics`.`Fic` ;

CREATE TABLE IF NOT EXISTS `tomillofics`.`Fic` (
  `idfic` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `iduser` INT UNSIGNED NOT NULL,
  `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` VARCHAR(50) NOT NULL,
  `description` VARCHAR(254) NOT NULL,
  `completed` BOOLEAN NOT NULL,
  `img_route` VARCHAR(254),
  `img_type` VARCHAR(10),
  PRIMARY KEY (`idfic`, `iduser`),
  CONSTRAINT `fk_Fic_User`
    FOREIGN KEY (`iduser`)
    REFERENCES `tomillofics`.`User` (`iduser`)
);

DROP TABLE IF EXISTS `tomillofics`.`Favorites` ;

CREATE TABLE IF NOT EXISTS `tomillofics`.`Favorites` (
  `iduser` INT UNSIGNED NOT NULL,
  `idfic` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`iduser`, `idfic`),
  CONSTRAINT `fk_User_has_Fic_User1`
    FOREIGN KEY (`iduser`)
    REFERENCES `tomillofics`.`User` (`iduser`),
  CONSTRAINT `fk_User_has_Fic_Fic1`
    FOREIGN KEY (`idfic`)
    REFERENCES `tomillofics`.`Fic` (`idfic`)
);

DROP TABLE IF EXISTS `tomillofics`.`Chapter` ;

CREATE TABLE IF NOT EXISTS `tomillofics`.`Chapter` (
  `idfic` INT UNSIGNED NOT NULL,
  `idchapter` INT UNSIGNED NOT NULL,
  `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` VARCHAR(65535) NOT NULL,
  PRIMARY KEY (`idfic`, `idchapter`),
  CONSTRAINT `fk_Chapter_Fic1`
    FOREIGN KEY (`idfic`)
    REFERENCES `tomillofics`.`Fic` (`idfic`)
);

DROP TABLE IF EXISTS `tomillofics`.`Views` ;

CREATE TABLE IF NOT EXISTS `tomillofics`.`Views` (
  `iduser` INT UNSIGNED NOT NULL,
  `idfic` INT UNSIGNED NOT NULL,
  `lastread` INT UNSIGNED NOT NULL,
  `time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`iduser`, `idfic`),
  CONSTRAINT `fk_User_has_Fic_User2`
    FOREIGN KEY (`iduser`)
    REFERENCES `tomillofics`.`User` (`iduser`),
  CONSTRAINT `fk_Views_Chapter1`
    FOREIGN KEY (`idfic`, `lastread`)
    REFERENCES `tomillofics`.`Chapter` (`idfic` , `idchapter`)
);

DROP TABLE IF EXISTS `tomillofics`.`Comment` ;

CREATE TABLE IF NOT EXISTS `tomillofics`.`Comment` (
  `idfic` INT UNSIGNED NOT NULL,
  `idchapter` INT UNSIGNED NOT NULL,
  `idcomment` INT UNSIGNED NOT NULL,
  `iduser` INT UNSIGNED NOT NULL,
  `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` VARCHAR(254) NOT NULL,
  PRIMARY KEY (`idfic`, `idchapter`, `idcomment`, `iduser`),
  CONSTRAINT `fk_Comment_Chapter1`
    FOREIGN KEY (`idfic` , `idchapter`)
    REFERENCES `tomillofics`.`Chapter` (`idfic` , `idchapter`),
  CONSTRAINT `fk_Comment_User1`
    FOREIGN KEY (`iduser`)
    REFERENCES `tomillofics`.`User` (`iduser`)
);

DROP TABLE IF EXISTS `tomillofics`.`Tag` ;

CREATE TABLE IF NOT EXISTS `tomillofics`.`Tag` (
  `idtag` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL UNIQUE,
  `erasable` BOOLEAN NOT NULL,
  PRIMARY KEY (`idtag`)
);

DROP TABLE IF EXISTS `tomillofics`.`FicTag` ;

CREATE TABLE IF NOT EXISTS `tomillofics`.`FicTag` (
  `idtag` INT UNSIGNED NOT NULL,
  `idfic` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idtag`, `idfic`),
  CONSTRAINT `fk_Tag_has_Fic_Tag1`
    FOREIGN KEY (`idtag`)
    REFERENCES `tomillofics`.`Tag` (`idtag`),
  CONSTRAINT `fk_Tag_has_Fic_Fic1`
    FOREIGN KEY (`idfic`)
    REFERENCES `tomillofics`.`Fic` (`idfic`)
);