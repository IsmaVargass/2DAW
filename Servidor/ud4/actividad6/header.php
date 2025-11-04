<?php
require_once __DIR__ . '/init.php';
?>
<div class="card header">
    <div class="brand">
        <div class="logo">US</div>
        <div>
            <h1>Gestor de Usuarios</h1>
            <div class="small">Elaborado por Ismael Vargas Duque</div>
        </div>
    </div>

    <div class="nav">
        <?php if (isset($_SESSION['user_id'])): ?>
            <span class="small">Hola, <?php echo e($_SESSION['user_name']); ?></span>
            <a class="button ghost" href="usuarios_lista.php">Usuarios</a>
            <a class="button" href="logout.php">Cerrar sesión</a>
        <?php else: ?>
            <a class="button ghost" href="login.php">Iniciar sesión</a>
            <a class="button" href="register.php">Registro</a>
        <?php endif; ?>
    </div>
</div>