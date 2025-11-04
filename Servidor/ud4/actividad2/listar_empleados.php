<?php
require_once __DIR__ . '/../actividad1/config.php';
try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=$DB_CHARSET", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM empleados");
    $empleados = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Error en la consulta: " . htmlspecialchars($e->getMessage()));
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Lista de Empleados</title>
    <style>
        table {
            border-collapse: collapse;
            width: 80%
        }

        th,
        td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left
        }
    </style>
</head>

<body>
    <h1>Empleados</h1>
    <?php if (count($empleados) === 0): ?>
        <p>No hay empleados registrados.</p>
    <?php else: ?>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Puesto</th>
                    <th>Salario</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($empleados as $e): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($e['id']); ?></td>
                        <td><?php echo htmlspecialchars($e['nombre']); ?></td>
                        <td><?php echo htmlspecialchars($e['puesto']); ?></td>
                        <td><?php echo htmlspecialchars($e['salario']); ?> €</td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</body>

</html>