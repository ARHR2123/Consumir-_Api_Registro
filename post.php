
<?php

header('Content-Type: application/json');  // Asegura que la respuesta es en formato JSON

$name = $_POST['name'];
$apellido = $_POST['apellido'];
$dia_hora = $_POST['dia_hora'];
$age = $_POST['age'];

// Verifica que todos los campos estén llenos
if ($name === '' || $apellido === '' || $dia_hora === '' || $age === '') {
    echo json_encode(['status' => 'error', 'message' => 'Llena todos los campos']);
} else {
    // Crea un array con los datos ingresados
    $data = [
        [
            'id' => 1,  // Puedes cambiar esto por un ID dinámico si es necesario
            'nombre' => $name,
            'apellido' => $apellido,
            'dia_hora' => $dia_hora,
            'age' => $age
        ]
    ];
    echo json_encode(['status' => 'success', 'data' => $data]);
}