<?php 
// crendendiales de la base de datos

define('DB_USUARIO', 'root');
define('DB_PASSWORD', '9432964');
define('DB_HOST', 'localhost');
define('DB_NOMBRE', 'agendaphp');

$conn = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE , 3306);

//echo $conn->ping();

