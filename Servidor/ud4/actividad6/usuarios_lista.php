<?php
require_once 'init.php';
require_login();
$pdo = getPDO();
$msg = $_GET['msg'] ?? '';

try {
    $stmt = $pdo->query("SELECT id, nombre_usuario, email FROM usuarios ORDER BY id DESC");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Error DB: " . e($e->getMessage()));
}
?>
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Usuarios - Gestor</title>
    <link rel="stylesheet" href="assets/styles.css">
</head>

<body>
    <div class="container">
        <?php include 'header.php'; ?>
        <div class="card">
            <?php if ($msg): ?><div class="msg success"><?php echo e($msg); ?></div><?php endif; ?>

            <div style="display:flex;justify-content:space-between;align-items:center">
                <h2>Lista de usuarios</h2>
                <a class="button" href="register.php">Crear usuario</a>
            </div>

            <?php if (empty($users)): ?>
                <p>No hay usuarios registrados.</p>
            <?php else: ?>
                <table class="table" role="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($users as $u): ?>
                            <tr>
                                <td><?php echo e($u['id']); ?></td>
                                <td><?php echo e($u['nombre_usuario']); ?></td>
                                <td><?php echo e($u['email']); ?></td>
                                <td class="actions">
                                    <a class="small" href="editar_usuario.php?id=<?php echo e($u['id']); ?>">Editar</a>
                                    <?php if ($u['id'] != $_SESSION['user_id']): // evitar autodestrucción sin confirmación extra 
                                    ?>
                                        <a class="small" href="eliminar_usuario.php?id=<?php echo e($u['id']); ?>" onclick="return confirm('¿Eliminar usuario? Esta acción no se puede deshacer.');">Eliminar</a>
                                    <?php else: ?>
                                        <span class="small" style="color:var(--muted)">Tu cuenta</span>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
        <?php include 'footer.php'; ?>
    </div>
</body>

</html>