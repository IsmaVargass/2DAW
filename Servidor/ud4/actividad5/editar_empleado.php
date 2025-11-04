<?php
require_once __DIR__ . '/../actividad1/config.php';
$id = $_GET['id'] ?? null;
if (!$id) die("ID no proporcionado");

try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=$DB_CHARSET", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Actualizar
        $nombre = $_POST['nombre'];
        $puesto = $_POST['puesto'];
        $salario = $_POST['salario'];

        $update = $pdo->prepare("UPDATE empleados SET nombre = :n, puesto = :p, salario = :s WHERE id = :id");
        $update->execute([':n' => $nombre, ':p' => $puesto, ':s' => $salario, ':id' => $id]);
        header('Location: lista.php');
        exit;
    } else {
        // Cargar datos actuales
        $stmt = $pdo->prepare("SELECT * FROM empleados WHERE id = :id");
        $stmt->execute([':id' => $id]);
        $empleado = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$empleado) die("Empleado no encontrado");
    }
} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Editar</title>
</head>

<body>
    <h1>Editar empleado</h1>
    <form method="post">
        <input name="nombre" value="<?php echo htmlspecialchars($empleado['nombre']); ?>" required><br>
        <input name="puesto" value="<?php echo htmlspecialchars($empleado['puesto']); ?>"><br>
        <input name="salario" value="<?php echo htmlspecialchars($empleado['salario']); ?>" type="number" step="0.01"><br>
        <button>Guardar</button>
    </form>
    <p><a href="lista.php">Volver</a></p>
</body>

</html>