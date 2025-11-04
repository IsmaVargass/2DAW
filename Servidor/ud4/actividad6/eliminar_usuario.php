<?php
require_once 'init.php';
require_login();
$pdo = getPDO();

$id = intval($_GET['id'] ?? 0);
if (!$id) die('ID inválido.');

if ($id == $_SESSION['user_id']) {
    header('Location: usuarios_lista.php?msg=' . urlencode('No puedes eliminar tu propia cuenta desde aquí.'));
    exit;
}

try {
    $del = $pdo->prepare("DELETE FROM usuarios WHERE id = :id");
    $del->execute([':id' => $id]);
    header('Location: usuarios_lista.php?msg=' . urlencode('Usuario eliminado.'));
    exit;
} catch (PDOException $e) {
    die('Error en la base de datos: ' . e($e->getMessage()));
}
