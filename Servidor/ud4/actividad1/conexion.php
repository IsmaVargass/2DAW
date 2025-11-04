<?php
require_once 'config.php';

$dsn = "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=$DB_CHARSET";

try {
    // Crear instancia PDO
    $pdo = new PDO($dsn, $DB_USER, $DB_PASS);
    // Forzar excepciones en errores
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión establecida correctamente a la base de datos.";
} catch (PDOException $e) {
    // Capturamos y mostramos el error (en producción no mostrar el mensaje completo)
    echo "Error al conectar a la base de datos, el error es: " . htmlspecialchars($e->getMessage());
}
