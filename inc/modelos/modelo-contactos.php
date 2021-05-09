<?php
if (array_key_exists ( 'accion' , $_POST ) && $_POST['accion']== 'Crear' ){
    // creara un nuevo registro a la base de datos 

    require_once('../funciones/bd.php');

    // validar las entradas 

    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
try {
    //code...
    $stnt = $conn->prepare("INSERT INTO contactos (nombre , empresa , telefono ) values(? , ? , ?) ");
    $stnt->bind_param("sss", $nombre, $empresa, $telefono);
    $stnt->execute();
   if($stnt -> affected_rows == 1 ){
    $respuesta = array(
        'respuesta' => 'correcto',
        
        'datos' => array(
            'nombre' => $nombre,
            'empresa' => $empresa,
            'telefono' => $telefono,
            'id_insertado' => $stnt-> insert_id
        )
    );
   }

    $stnt->close() ;
    $conn-> close();

} catch (Exception $e) {
    $respuesta = array (
        'error' => $e->getMessage()
    );
}
   
}
//echo json_encode($_POST); ?>

<?php if (array_key_exists ('accion' ,  $_GET ) && $_GET['accion']== 'borrar'){
    require_once('../funciones/bd.php');
    $Id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
    try {
        $stmt = $conn->prepare("DELETE FROM contactos WHERE id =?");
        if ($stmt === false) {
            /* Puedes hacer un return con ok a false o lanzar una excepción */
            /*throw new Exception('Error en prepare: ' . $stmt->error);*/
            $respuesta = [ 'ok' => 'false' ];
        }else {
            $stmt ->bind_param("i", $Id );
            $stmt ->execute();
            if ($stmt->affected_rows == 1) {
                $respuesta = array(
                    'respuesta' => 'correcto'
                );
            }
            $stmt ->close();
            $conn ->close();
        }

    } catch (Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()

        );

        
    }
    


}

if (array_key_exists ('accion' ,  $_POST ) && $_POST['accion']== 'Editar'){
    require_once('../funciones/bd.php');
   // echo json_encode($_POST);

    // validar las entradas 

    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
    $Id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);
    try {
        $stmt = $conn->prepare("UPDATE  contactos SET nombre = ?, telefono = ?, empresa = ?  WHERE id =?");
        if ($stmt === false) {
            /* Puedes hacer un return con ok a false o lanzar una excepción */
            /*throw new Exception('Error en prepare: ' . $stmt->error);*/
            $respuesta = [ 'ok' => 'false' ];
        }else{
            $stmt->bind_param("sssi", $nombre, $telefono, $empresa , $Id );
            $stmt->execute();
            if($stmt->affected_rows ==1){
                $respuesta = array(
                    'respuesta' => 'correcto'
                );
            }else{
                $respuesta = array(
                    'respuesta' => 'error',
                    'stmt' => $stmt,
                    'POST' => $_POST
                );
            }
            $stmt->close();
            $conn->close();
        }

    } catch (Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()

        );
    }

}
echo json_encode($respuesta);
?>