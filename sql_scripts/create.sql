CREATE DATABASE d1;

USE d1;

CREATE TABLE
  Accounts (
    id INT NOT NULL AUTO_INCREMENT,
    name TEXT NOT NULL,
    comment TEXT,
    PRIMARY KEY (id)
  ) ENGINE = InnoDB;
CREATE TABLE
  Records (
    id INT NOT NULL AUTO_INCREMENT,
    account_id INT NOT NULL,
    value INT NOT NULL,
    datetime DATETIME NOT NULL,
    category TEXT NOT NULL,
    comment TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (account_id) REFERENCES Accounts (id)
  ) ENGINE = InnoDB;

