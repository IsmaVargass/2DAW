<?php
require_once 'init.php';
require_login();
$pdo = getPDO();
$id = intval($_GET['id'] ?? 0);
if (!$id) die('ID inválido.');

$errors = [];
$success = '';

try {
    // obtener usuario
    $stmt = $pdo->prepare("SELECT id, nombre_usuario, email FROM usuarios WHERE id = :id");
    $stmt->execute([':id' => $id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user) die('Usuario no encontrado.');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!isset($_POST['_csrf']) || !csrf_check($_POST['_csrf'])) $errors[] = 'Token inválido.';
        $nombre = trim($_POST['nombre_usuario'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        $password2 = $_POST['password2'] ?? '';

        if ($nombre === '') $errors[] = 'Nombre obligatorio.';
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Email no válido.';
        if ($password !== '' && strlen($password) < 6) $errors[] = 'Si cambias la contraseña, mínimo 6 caracteres.';
        if ($password !== $password2) $errors[] = 'Las contraseñas no coinciden.';

        if (empty($errors)) {
            // comprobar si el email está usado por otro id
            $chk = $pdo->prepare("SELECT id FROM usuarios WHERE email = :email AND id != :id");
            $chk->execute([':email' => $email, ':id' => $id]);
            if ($chk->fetch()) {
                $errors[] = 'El email está en uso por otro usuario.';
            } else {
                if ($password !== '') {
                    $hash = password_hash($password, PASSWORD_DEFAULT);
                    $upd = $pdo->prepare("UPDATE usuarios SET nombre_usuario = :nom, email = :email, password = :pass WHERE id = :id");
                    $upd->execute([':nom' => $nombre, ':email' => $email, ':pass' => $hash, ':id' => $id]);
                } else {
                    $upd = $pdo->prepare("UPDATE usuarios SET nombre_usuario = :nom, email = :email WHERE id = :id");
                    $upd->execute([':nom' => $nombre, ':email' => $email, ':id' => $id]);
                }
                $success = 'Usuario actualizado correctamente.';
                // si el usuario editado es el actual, actualizar sesión
                if ($id == $_SESSION['user_id']) $_SESSION['user_name'] = $nombre;
                // recargar datos
                $stmt = $pdo->prepare("SELECT id, nombre_usuario, email FROM usuarios WHERE id = :id");
                $stmt->execute([':id' => $id]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
            }
        }
    }
} catch (PDOException $e) {
    $errors[] = 'Error DB: ' . $e->getMessage();
}
$token = csrf_token();
?>
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Editar usuario</title>
    <link rel="stylesheet" href="assets/styles.css">
</head>

<body>
    <div class="container">
        <?php include 'header.php'; ?>
        <div class="card" style="max-width:760px;margin:auto">
            <h2>Editar usuario #<?php echo e($user['id']); ?></h2>

            <?php if ($errors): ?><div class="msg error"><?php echo e(implode('<br>', $errors)); ?></div><?php endif; ?>
            <?php if ($success): ?><div class="msg success"><?php echo e($success); ?></div><?php endif; ?>

            <form method="post" novalidate>
                <input type="hidden" name="_csrf" value="<?php echo e($token); ?>">
                <label>Nombre de usuario
                    <input type="text" name="nombre_usuario" value="<?php echo e($user['nombre_usuario']); ?>" required>
                </label>
                <label style="margin-top:8px">Email
                    <input type="email" name="email" value="<?php echo e($user['email']); ?>" required>
                </label>

                <div style="margin-top:10px" class="small">Dejar vacíos los campos de contraseña para no cambiarla.</div>
                <div class="form-2cols" style="margin-top:8px">
                    <div>
                        <label>Nueva contraseña
                            <input type="password" name="password" placeholder="Opcional">
                        </label>
                    </div>
                    <div>
                        <label>Repetir contraseña
                            <input type="password" name="password2" placeholder="Opcional">
                        </label>
                    </div>
                </div>

                <div style="margin-top:12px">
                    <button class="button">Guardar</button>
                    <a class="button ghost" href="usuarios_lista.php">Volver</a>
                </div>
            </form>
        </div>
        <?php include 'footer.php'; ?>
    </div>
</body>

</html>