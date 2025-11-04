<?php
require_once __DIR__ . '/../actividad1/config.php';
$mensaje = '';
try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=$DB_CHARSET", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nombre_usuario = trim($_POST['nombre_usuario']);
        $email = trim($_POST['email']);
        $password = $_POST['password'];

        // Validaciones básicas
        if (empty($nombre_usuario) || empty($email) || empty($password)) {
            $mensaje = "Rellena todos los campos.";
        } else {
            // Comprobar duplicado por email
            $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = :email");
            $stmt->execute([':email' => $email]);
            if ($stmt->fetch()) {
                $mensaje = "El email ya está registrado.";
            } else {
                // Hasheamos la contraseña
                $hash = password_hash($password, PASSWORD_DEFAULT);
                $insert = $pdo->prepare("INSERT INTO usuarios (nombre_usuario, email, password) VALUES (:nom, :email, :pass)");
                $insert->bindValue(':nom', $nombre_usuario);
                $insert->bindValue(':email', $email);
                $insert->bindValue(':pass', $hash);
                $insert->execute();
                $mensaje = "Usuario registrado correctamente ✅";
            }
        }
    }
} catch (PDOException $e) {
    $mensaje = "Error: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Registro de Usuario</title>
</head>

<body>
    <h1>Registro</h1>
    <?php if ($mensaje) echo "<p>" . htmlspecialchars($mensaje) . "</p>"; ?>
    <form method="post">
        <label>Nombre de usuario: <input type="text" name="nombre_usuario" required></label><br>
        <label>Email: <input type="email" name="email" required></label><br>
        <label>Contraseña: <input type="password" name="password" required></label><br>
        <button>Registrar</button>
    </form>
</body>

</html>