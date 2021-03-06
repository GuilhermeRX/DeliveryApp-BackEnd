CREATE DATABASE IF NOT EXISTS deliveryApp;

CREATE TABLE IF NOT EXISTS deliveryApp.products (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  value INT NOT NULL,
  image VARCHAR(100) NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT NOW(),
  updateAt DATETIME NULL ON UPDATE NOW()
);

CREATE TABLE IF NOT EXISTS deliveryApp.adress (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  cep VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  road VARCHAR(100) NOT NULL,
  number VARCHAR(100) NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT NOW(),
  updateAt DATETIME NULL ON UPDATE NOW()
);

CREATE TABLE IF NOT EXISTS deliveryApp.users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  adress_id INT NOT NULL,
  image VARCHAR(100) NOT NULL,
  FOREIGN KEY (adress_id) REFERENCES deliveryApp.adress (id),
  createdAt DATETIME NOT NULL DEFAULT NOW(),
  updateAt DATETIME NULL ON UPDATE NOW()
);

CREATE TABLE IF NOT EXISTS deliveryApp.request_status (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

INSERT INTO deliveryApp.request_status (name)
  VALUES 
	('waiting'),
	('confirmed'),
  ('production'),
  ('delivery'),
  ('finished');

CREATE TABLE IF NOT EXISTS deliveryApp.requests (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  adress_id INT NOT NULL,
  status_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES deliveryApp.products (id),
  FOREIGN KEY (user_id) REFERENCES deliveryApp.users (id),
  FOREIGN KEY (adress_id) REFERENCES deliveryApp.adress (id),
  FOREIGN KEY (status_id) REFERENCES deliveryApp.request_status (id),
  createdAt DATETIME NOT NULL DEFAULT NOW()
);