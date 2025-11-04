<?php
require_once __DIR__ . '/../actividad1/config.php';
$id = $_GET['id'] ?? null;
if (!$id) die("ID no proporcionado");

try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=$DB_CHARSET", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $del = $pdo->prepare("DELETE FROM empleados WHERE id = :id");
    $del->execute([':id' => $id]);
    header('Location: lista.php');
    exit;
} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}
