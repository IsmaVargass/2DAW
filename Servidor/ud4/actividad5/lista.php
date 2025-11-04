<?php
require_once __DIR__ . '/../actividad1/config.php';
try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=$DB_CHARSET", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->query("SELECT * FROM empleados");
    $empleados = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Error: " . htmlspecialchars($e->getMessage()));
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Listado Empleados</title>
</head>

<body>
    <h1>Empleados</h1>
    <table border="1" cellpadding="6">
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Puesto</th>
            <th>Salario</th>
            <th>Acciones</th>
        </tr>
        <?php foreach ($empleados as $e): ?>
            <tr>
                <td><?php echo htmlspecialchars($e['id']); ?></td>
                <td><?php echo htmlspecialchars($e['nombre']); ?></td>
                <td><?php echo htmlspecialchars($e['puesto']); ?></td>
                <td><?php echo htmlspecialchars($e['salario']); ?></td>
                <td>
                    <a href="editar_empleado.php?id=<?php echo $e['id']; ?>">Editar</a>
                    |
                    <a href="#" onclick="if(confirm('¿Seguro que quieres eliminar?')){ window.location='eliminar_empleado.php?id=<?php echo $e['id']; ?>' }">Eliminar</a>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
    <p><a href="crear_empleado.php">Crear nuevo empleado</a></p>
</body>

</html>