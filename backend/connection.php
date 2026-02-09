<?php
$DB_HOST = "localhost";
$DB_NAME = "engageflow";
$DB_USER = "root";
$DB_PASS = "";
$DB_PORT = 3306;

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, $DB_PORT);

if ($mysqli->connect_errno) {
	http_response_code(500);
	echo json_encode([
		"success" => false,
		"message" => "Erro ao conectar com o banco de dados.",
	]);
	exit;
}

$mysqli->set_charset("utf8mb4");
