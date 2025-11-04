<?php
require_once 'init.php';
$pdo = getPDO();
$errors = [];
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['_csrf']) || !csrf_check($_POST['_csrf'])) $errors[] = 'Token inválido.';

    $nombre = trim($_POST['nombre_usuario'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $password2 = $_POST['password2'] ?? '';

    if ($nombre === '') $errors[] = 'Nombre de usuario obligatorio.';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Email no válido.';
    if (strlen($password) < 6) $errors[] = 'Contraseña: mínimo 6 caracteres.';
    if ($password !== $password2) $errors[] = 'Las contraseñas no coinciden.';

    if (empty($errors)) {
        try {
            $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = :email");
            $stmt->execute([':email' => $email]);
            if ($stmt->fetch()) {
                $errors[] = 'Email ya registrado.';
            } else {
                $hash = password_hash($password, PASSWORD_DEFAULT);
                $ins = $pdo->prepare("INSERT INTO usuarios (nombre_usuario, email, password) VALUES (:nom, :email, :pass)");
                $ins->execute([':nom' => $nombre, ':email' => $email, ':pass' => $hash]);
                $success = 'Registro correcto. Ya puedes iniciar sesión.';
                // limpiar campos
                $_POST = [];
            }
        } catch (PDOException $e) {
            $errors[] = 'Error en la base de datos: ' . $e->getMessage();
        }
    }
}
$token = csrf_token();
?>
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Registro - Gestor Usuarios</title>
    <link rel="stylesheet" href="assets/styles.css">
</head>

<body>
    <div class="container">
        <?php include 'header.php'; ?>
        <div class="card">
            <?php if ($errors): ?>
                <div class="msg error"><?php echo e(implode('<br>', $errors)); ?></div>
            <?php endif; ?>
            <?php if ($success): ?>
                <div class="msg success"><?php echo e($success); ?></div>
            <?php endif; ?>

            <form method="post" novalidate>
                <input type="hidden" name="_csrf" value="<?php echo e($token); ?>">
                <div class="form-2cols">
                    <div>
                        <label>Nombre de usuario
                            <input type="text" name="nombre_usuario" value="<?php echo e($_POST['nombre_usuario'] ?? ''); ?>" required>
                        </label>
                    </div>
                    <div>
                        <label>Email
                            <input type="email" name="email" value="<?php echo e($_POST['email'] ?? ''); ?>" required>
                        </label>
                    </div>
                </div>

                <div class="form-row" style="margin-top:12px">
                    <div style="flex:1">
                        <label>Contraseña
                            <input type="password" name="password" required>
                        </label>
                    </div>
                    <div style="flex:1">
                        <label>Repetir contraseña
                            <input type="password" name="password2" required>
                        </label>
                    </div>
                </div>

                <div style="margin-top:12px">
                    <button class="button">Registrar</button>
                    <a class="button ghost" href="login.php">Ir a login</a>
                </div>
            </form>
        </div>

        <?php include 'footer.php'; ?>
    </div>
</body>

</html>