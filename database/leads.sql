-- EngageFlow - Script de criacao do banco
--
-- Como importar:
--   1. Abra o phpMyAdmin (http://localhost/phpmyadmin)
--   2. Va em Importar, selecione este arquivo e execute
--   Ou pelo terminal: mysql -u root < database/leads.sql
--
-- Depois de importar, envie um lead pelo formulario e confira:
--   SELECT * FROM leads;

CREATE DATABASE IF NOT EXISTS engageflow
	CHARACTER SET utf8mb4
	COLLATE utf8mb4_unicode_ci;

USE engageflow;

CREATE TABLE IF NOT EXISTS leads (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(120) NOT NULL,
	email VARCHAR(160) NOT NULL,
	phone VARCHAR(40) NOT NULL,
	company VARCHAR(120) NOT NULL,
	message TEXT,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
