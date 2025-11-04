<?php
require_once 'init.php';
$pdo = getPDO();
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['_csrf']) || !csrf_check($_POST['_csrf'])) {
        $error = 'Token inválido.';
    } else {
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error = 'Email no válido.';
        } else {
            try {
                $stmt = $pdo->prepare("SELECT id, nombre_usuario, password FROM usuarios WHERE email = :email");
                $stmt->execute([':email' => $email]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($user && password_verify($password, $user['password'])) {
                    session_regenerate_id(true);
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['user_name'] = $user['nombre_usuario'];
                    header('Location: usuarios_lista.php');
                    exit;
                } else {
                    $error = 'Credenciales incorrectas.';
                }
            } catch (PDOException $e) {
                $error = 'Error en la base de datos: ' . $e->getMessage();
            }
        }
    }
}
$token = csrf_token();
?>
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Login - Gestor Usuarios</title>
    <link rel="stylesheet" href="assets/styles.css">
</head>

<body>
    <div class="container">
        <?php include 'header.php'; ?>
        <div class="card" style="max-width:640px;margin:auto">
            <h2>Iniciar sesión</h2>
            <?php if ($error): ?><div class="msg error"><?php echo e($error); ?></div><?php endif; ?>

            <form method="post" novalidate>
                <input type="hidden" name="_csrf" value="<?php echo e($token); ?>">
                <label>Email
                    <input type="email" name="email" value="<?php echo e($_POST['email'] ?? ''); ?>" required>
                </label>
                <label style="margin-top:8px">Contraseña
                    <input type="password" name="password" required>
                </label>

                <div style="margin-top:12px">
                    <button class="button">Entrar</button>
                    <a class="button ghost" href="register.php">Registro</a>
                </div>
            </form>
        </div>
        <?php include 'footer.php'; ?>
    </div>
</body>

</html>