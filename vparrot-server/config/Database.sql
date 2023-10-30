/*DATABASE CREATION*/
CREATE DATABASE IF NOT EXISTS vparrot_garage;
USE vparrot_garage;


/*CREATION USER ROLE TABLE */
CREATE TABLE IF NOT EXISTS roles
(
  id_role INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(20) NOT NULL UNIQUE
);

/*CREATION USERS TABLE*/
CREATE TABLE IF NOT EXISTS users
(
  id_user INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  user_email VARCHAR(250) NOT NULL UNIQUE,
  user_password VARCHAR(250) NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id_role)
);

/*CREATION TESTIMONIES TABLE*/
CREATE TABLE IF NOT EXISTS testimonies
(
  id_testimony INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  content VARCHAR(250) NOT NULL,
  rating INT NOT NULL,
  is_moderated BOOLEAN NOT NULL
);

/*CREATION REJECTED TESTIMONIES TABLE*/
CREATE TABLE IF NOT EXISTS rejected_testimonies
(
  id_rejected_testimony INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_testimony INT NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  content VARCHAR(250) NOT NULL,
  rating INT NOT NULL
);

/*CREATION SCHEDULES TABLE */
CREATE TABLE IF NOT EXISTS schedules
(
  id_opening_day INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  day_of_week ENUM('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche') NOT NULL,
  morning_opening TIME NOT NULL,
  morning_closing TIME NOT NULL,
  afternoon_opening TIME NOT NULL,
  afternoon_closing TIME NOT NULL
);

/*CREATION SERVICES TYPE TABLE*/
CREATE TABLE IF NOT EXISTS services_type
(
  id_type INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  type_name VARCHAR(50) NOT NULL
);

/*CREATION SERVICES TABLE*/
CREATE TABLE IF NOT EXISTS services
(
  id_service INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  type_id INT NOT NULL,
  service_name VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  price VARCHAR(20) NOT NULL,
  path_img VARCHAR(250) NOT NULL,
  FOREIGN KEY (type_id) REFERENCES services_type(id_type)
);

/*CREATION CONTACT TABLE*/
CREATE TABLE IF NOT EXISTS contact
(
  id_contact INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(250) NOT NULL,
  contact_subject VARCHAR(250) NOT NULL,
  content TEXT NOT NULL,
  is_treated BOOLEAN NOT NULL,
  treatment_date DATETIME,
  treatment_methode VARCHAR(20)
);

/*CREATION CAR TABLE*/
CREATE TABLE IF NOT EXISTS cars
(
  id_car INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  brand VARCHAR(20) NOT NULL,
  model VARCHAR(20) NOT NULL,
  trade_name VARCHAR(50) NOT NULL,
  price INT NOT NULL
);

/*CREATION PHOTO GALLERY TABLE*/
CREATE TABLE IF NOT EXISTS cars_images
(
  id_images INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  file_path VARCHAR(250) NOT NULL,
  is_main BOOLEAN NOT NULL,
  car_id INT NOT NULL,
  FOREIGN KEY (car_id) REFERENCES cars(id_car)
);




