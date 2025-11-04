<?php
// init.php
// Ajusta la ruta si tu config.php está en otro sitio
require_once __DIR__ . '/../actividad6/config.php';

session_start();

// Conexión PDO reutilizable
function getPDO()
{
    global $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS, $DB_CHARSET;
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host={$DB_HOST};dbname={$DB_NAME};charset={$DB_CHARSET}";
        $pdo = new PDO($dsn, $DB_USER, $DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    return $pdo;
}

// Escape para salida segura
function e($v)
{
    return htmlspecialchars($v ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

// CSRF simple
function csrf_token()
{
    if (empty($_SESSION['_csrf'])) $_SESSION['_csrf'] = bin2hex(random_bytes(16));
    return $_SESSION['_csrf'];
}
function csrf_check($token)
{
    return isset($_SESSION['_csrf']) && hash_equals($_SESSION['_csrf'], $token);
}

// Protect page
function require_login()
{
    if (!isset($_SESSION['user_id'])) {
        header('Location: login.php');
        exit;
    }
}
