<?php
require_once __DIR__ . '/../actividad1/config.php';
$msg = '';
try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=$DB_CHARSET", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nombre = $_POST['nombre'];
        $puesto = $_POST['puesto'];
        $salario = $_POST['salario'];

        $stmt = $pdo->prepare("INSERT INTO empleados (nombre, puesto, salario) VALUES (:n, :p, :s)");
        $stmt->execute([':n' => $nombre, ':p' => $puesto, ':s' => $salario]);
        $msg = "Empleado creado.";
    }
} catch (PDOException $e) {
    $msg = "Error: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Crear</title>
</head>

<body>
    <h1>Crear empleado</h1>
    <?php if ($msg) echo "<p>" . htmlspecialchars($msg) . "</p>"; ?>
    <form method="post">
        <input name="nombre" required placeholder="Nombre"><br>
        <input name="puesto" placeholder="Puesto"><br>
        <input name="salario" placeholder="Salario" type="number" step="0.01"><br>
        <button>Crear</button>
    </form>
    <p><a href="lista.php">Volver</a></p>
</body>

</html>