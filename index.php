<?php
include 'inc/funciones/funciones.php';
include 'inc/layout/header.php';
?>

<div class="contenedor-barra">
  <h1>Agenda de Contactos</h1>
</div>

<div class="bg-amarillo contenedor sombra">
  <form id="contacto" action="#">
    <legend>Añada un contacto <span>Todos los campos son obligatorios</span> </legend>

    <?php include 'inc/layout/formulario.php'; ?>
    <div class="campos">

      <div class="campo">
        <label for="nombre">Nombre</label>
        <input type="text" placeholder="Nombre contacto" id="nombre">
      </div>
      <div class="campo">
        <label for="empresa">Empresa</label>
        <input type="text" placeholder="Nombre empresa" id="empresa">
      </div>
      <div class="campo">
        <label for="nombre">Telefono</label>
        <input type="tel" placeholder="numero de telefono" id="nombre">
      </div>


    </div>
    <div class=" campo enviar">
      <input type="submit" value="añadir">


    </div>
  </form>
</div>
<div class="bg-blanco contenedor sombra contactos"> 
  <div class="contenedor-contactos">
    <h2>contactos</h2>

    <input type="text" id="buscar" class="buscador sombra" placeholder="Buscar contactos...">
    <p class="total-contactos"><span>2</span> Contactos</p>
    <div class="contenedor-tabla"> 
      <table id="listado-contactos" class="listado-contactos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Empresa</th>
            <th>Telefono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Marlon</td>
            <td>Udemy</td>
            <td>3145695</td>
            <td>
              <a  class="btn-editar btn"href="#">
                <i class="fas fa-pen-square"></i>
              </a>
              <button data-ide="1" type="button" class="btn-borrar btn">
              <i class="fas fa-trash-alt"></i>

              </button>
            </td>
          </tr>
          <tr>
            <td>Marlon</td>
            <td>Udemy</td>
            <td>3145695</td>
            <td>
              <a  class="btn-editar btn"href="#">
                <i class="fas fa-pen-square"></i>
              </a>
              <button data-ide="1" type="button" class="btn-borrar btn">
              <i class="fas fa-trash-alt"></i>

              </button>
            </td>
          </tr>
          <tr>
            <td>Marlon</td>
            <td>Udemy</td>
            <td>3145695</td>
            <td>
              <a  class="btn-editar btn"href="#">
                <i class="fas fa-pen-square"></i>
              </a>
              <button data-ide="1" type="button" class="btn-borrar btn">
              <i class="fas fa-trash-alt"></i>

              </button>
            </td>
          </tr>
        </tbody>

      </table>

    </div>

  </div>


</div>





<?php include 'inc/layout/footer.php'; ?>