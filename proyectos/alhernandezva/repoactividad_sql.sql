-- -----------------------------------------------------
-- Schema repoactividades
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `repoactividades` ;

-- -----------------------------------------------------
-- Schema repoactividades
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `repoactividades` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `repoactividades` ;

-- -----------------------------------------------------
-- Table `repoactividades`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `repoactividades`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `repoactividades`.`actividad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `repoactividades`.`actividad` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `instruccion` VARCHAR(150) NOT NULL,
  `descripcion` VARCHAR(150) NOT NULL,
  `ruta_archivo` VARCHAR(255) NOT NULL,
  `categoria_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_actividad_categoria_idx` (`categoria_id` ASC),
  CONSTRAINT `fk_actividad_categoria`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `repoactividades`.`categoria` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `repoactividades`.`administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `repoactividades`.`administrador` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(25) NOT NULL,
  `apellido` VARCHAR(25) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `fecha_creacion` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Insertar Administrador por defecto
-- -----------------------------------------------------
INSERT INTO repoactividades.administrador (nombre, apellido, email, password, fecha_creacion)
VALUES ('Administrador', 'Sistema', 'admin@repoactividades.com', '$2y$10$kRlPD4bO3/iysAYZA.nv2.2PJ1SjNTdT4A3HiG.d9CIErzeR8yCDC', CURDATE());
-- password: 12345 -> $2y$10$5DEQduae6YZ8CC7bssCB0Otgp2Vyy5Wtz6JL1ZpMfv5EMkIeE2oUS

-- -----------------------------------------------------
-- Insertar Categorias iniciales
-- -----------------------------------------------------
INSERT INTO repoactividades.categoria (nombre)
VALUES ('Matemáticas'), ('Química'), ('Biología'), ('Lenguaje'), ('Ciencias Sociales');