<?php

$name = $_POST['name'];
$apellido = $_POST['apellido'];
$dia_hora = $_POST['dia_hora'];
$age = $_POST['age'];

if ($name === '' || $apellido === '' || $dia_hora === '' || $age === ''){
    echo json_encode('error');
}
else{
    echo json_encode('Correcto');
    echo json_encode('Los datos ingresados son: ');
    echo json_encode('Nombre:'.$name.'<br>Apellido:'.$apellido.'<br>Día y Hora:'.$dia_hora.'<br>Edad:'.$age);
}

?>