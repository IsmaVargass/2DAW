<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); // Añadido OPTIONS
header('Access-Control-Allow-Headers: Content-Type');

// Si la petición es OPTIONS, se responde inmediatamente (necesario para CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'conexion.php';
// Asegúrate de que 'conexion.php' establece la variable $pdo

$metodo = $_SERVER['REQUEST_METHOD'];
$recurso = $_GET['recurso'] ?? '';

switch ($metodo) {
    case 'GET':
        // ... Lógica GET existente ...
        if ($recurso === 'empleados') {
            try {
                // Si se pide un ID específico (para editar)
                $id = $_GET['id'] ?? null; 
                if ($id) {
                    $stmt = $pdo->prepare("SELECT * FROM empleados WHERE id = :id");
                    $stmt->execute([':id' => $id]);
                    $empleado = $stmt->fetch();
                    if ($empleado) {
                        echo json_encode($empleado);
                    } else {
                        http_response_code(404);
                        echo json_encode(['error' => 'Empleado no encontrado']);
                    }
                } else {
                    // Si se piden todos los empleados
                    $stmt = $pdo->query("SELECT * FROM empleados ORDER BY id ASC");
                    $empleados = $stmt->fetchAll();
                    echo json_encode($empleados);
                }
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Error al obtener empleados: ' . $e->getMessage()]);
            }
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Recurso no encontrado']);
        }
        break;

    case 'POST':
        // ... Lógica POST existente ...
        if ($recurso === 'empleados') {
            $data = json_decode(file_get_contents('php://input'), true);

            if (isset($data['nombre']) && isset($data['puesto']) && isset($data['salario'])) {
                try {
                    $stmt = $pdo->prepare("INSERT INTO empleados (nombre, puesto, salario) VALUES (:nombre, :puesto, :salario)");
                    $stmt->execute([
                        ':nombre' => $data['nombre'],
                        ':puesto' => $data['puesto'],
                        ':salario' => $data['salario']
                    ]);

                    $nuevoId = $pdo->lastInsertId();
                    http_response_code(201);
                    echo json_encode([
                        'status' => 'ok',
                        'id' => $nuevoId
                    ]);
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Error al insertar: ' . $e->getMessage()]);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Datos incompletos o en formato incorrecto.']);
            }
        }
        break;
        
    case 'PUT':
        if ($recurso === 'empleados' && isset($_GET['id'])) {
            $id = $_GET['id'];
            $data = json_decode(file_get_contents('php://input'), true);

            if (isset($data['nombre']) && isset($data['puesto']) && isset($data['salario'])) {
                try {
                    $stmt = $pdo->prepare("UPDATE empleados SET nombre = :nombre, puesto = :puesto, salario = :salario WHERE id = :id");
                    $resultado = $stmt->execute([
                        ':nombre' => $data['nombre'],
                        ':puesto' => $data['puesto'],
                        ':salario' => $data['salario'],
                        ':id' => $id
                    ]);

                    if ($resultado && $stmt->rowCount() > 0) {
                        echo json_encode(['status' => 'ok', 'message' => "Empleado ID $id actualizado."]);
                    } else {
                        http_response_code(404);
                        echo json_encode(['error' => 'Empleado no encontrado o no se realizaron cambios.']);
                    }
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Error al actualizar: ' . $e->getMessage()]);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Datos incompletos para actualizar.']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Falta el ID del empleado para actualizar.']);
        }
        break;

    case 'DELETE':
        if ($recurso === 'empleados' && isset($_GET['id'])) {
            $id = $_GET['id'];
            
            try {
                $stmt = $pdo->prepare("DELETE FROM empleados WHERE id = :id");
                $resultado = $stmt->execute([':id' => $id]);

                if ($resultado && $stmt->rowCount() > 0) {
                    echo json_encode(['status' => 'ok', 'message' => "Empleado ID $id eliminado correctamente."]);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Empleado no encontrado para eliminar.']);
                }
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Error al eliminar: ' . $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Falta el ID del empleado para eliminar.']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}