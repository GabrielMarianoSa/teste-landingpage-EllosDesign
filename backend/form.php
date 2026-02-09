<?php
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
	http_response_code(405);
	echo json_encode([
		"success" => false,
		"message" => "Metodo nao permitido.",
	]);
	exit;
}

require_once __DIR__ . "/connection.php";

$honeypot = trim($_POST["website"] ?? "");
if ($honeypot !== "") {
	echo json_encode([
		"success" => true,
		"message" => "Enviado com sucesso.",
	]);
	exit;
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$company = trim($_POST["company"] ?? "");
$message = trim($_POST["message"] ?? "");

$errors = [];
if ($name === "") {
	$errors[] = "Informe o nome.";
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	$errors[] = "Informe um e-mail valido.";
}
if ($phone === "") {
	$errors[] = "Informe o telefone.";
}
if ($company === "") {
	$errors[] = "Informe a empresa.";
}

if (!empty($errors)) {
	http_response_code(422);
	echo json_encode([
		"success" => false,
		"message" => implode(" ", $errors),
	]);
	exit;
}

$name = mb_substr($name, 0, 120);
$email = mb_substr($email, 0, 160);
$phone = mb_substr($phone, 0, 40);
$company = mb_substr($company, 0, 120);
$message = mb_substr($message, 0, 1000);

$stmt = $mysqli->prepare(
	"INSERT INTO leads (name, email, phone, company, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())"
);

if (!$stmt) {
	http_response_code(500);
	echo json_encode([
		"success" => false,
		"message" => "Erro ao preparar o envio.",
	]);
	exit;
}

$stmt->bind_param("sssss", $name, $email, $phone, $company, $message);

if (!$stmt->execute()) {
	http_response_code(500);
	echo json_encode([
		"success" => false,
		"message" => "Erro ao salvar o lead.",
	]);
	$stmt->close();
	exit;
}

$stmt->close();

echo json_encode([
	"success" => true,
	"message" => "Lead registrado com sucesso.",
]);
