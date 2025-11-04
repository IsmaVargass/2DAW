<?php
require_once __DIR__ . '/../actividad1/config.php';
$results = [];
$error = null;

try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=$DB_CHARSET", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Tomamos el nombre del formulario y añadimos % para LIKE
        $nombre = '%' . $_POST['nombre'] . '%';
        $sql = "SELECT * FROM empleados WHERE nombre LIKE :nombre";
        $stmt = $pdo->prepare($sql);
        // bindParam permite enlazar la variable (por seguridad)
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
} catch (PDOException $e) {
    $error = $e->getMessage();
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Buscar Empleado</title>
</head>

<body>
    <h1>Buscar empleado por nombre</h1>
    <form method="post">
        <input type="text" name="nombre" placeholder="Escribe nombre o parte" required>
        <button>Buscar</button>
    </form>

    <?php if ($error): ?>
        <p>Error: <?php echo htmlspecialchars($error); ?></p>
    <?php endif; ?>

    <?php if ($_SERVER['REQUEST_METHOD'] === 'POST'): ?>
        <?php if (count($results) === 0): ?>
            <p>No se encontraron empleados.</p>
        <?php else: ?>
            <table border="1" cellpadding="6">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Puesto</th>
                    <th>Salario</th>
                </tr>
                <?php foreach ($results as $r): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($r['id']); ?></td>
                        <td><?php echo htmlspecialchars($r['nombre']); ?></td>
                        <td><?php echo htmlspecialchars($r['puesto']); ?></td>
                        <td><?php echo htmlspecialchars($r['salario']); ?></td>
                    </tr>
                <?php endforeach; ?>
            </table>
        <?php endif; ?>
    <?php endif; ?>
</body>

</html>