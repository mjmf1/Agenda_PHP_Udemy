const formulariocontactos = document.querySelector("#contacto"),
  listadoContactos = document.querySelector("#listado-contactos tbody");
    //<input type="text" id="buscar" class="buscador sombra" placeholder="Buscar contactos...">
    inputuBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners() {
  /*cuando el formulario de crear o editat se ejeucta*/

  formulariocontactos.addEventListener("submit", leerformulario);

  //listerner para elimnar el contacto
  if(listadoContactos){
    listadoContactos.addEventListener("click", eliminarContacto);

  }
// buscador
inputuBuscador.addEventListener('input', buscarContactos);

numeroContactos();
}

function leerformulario(e) {
  e.preventDefault();

  /* leer los datos de los inputs */
  const nombre = document.querySelector("#nombre").value,
    empresa = document.querySelector("#empresa").value,
    telefono = document.querySelector("#telefono").value,
    accion = document.querySelector("#accion").value;
  if (nombre === "" || empresa === "" || telefono === "") {
    mostrarNotificacion("Todos los campos son obligatorios ", "error");

    /*  mostrarNotificacion('contacto creado exitosamente', 'exitoso');*/
  } else {
    /*pasa la validacion crear llamado a ajax */
    const infContacto = new FormData();
    infContacto.append("nombre", nombre);
    infContacto.append("empresa", empresa);
    infContacto.append("telefono", telefono);
    infContacto.append("accion", accion);

     //console.log(...infContacto);

    if (accion === 'Crear') {
      /* crearemos un nuevo  contacto*/
      insertarBD(infContacto);
    } else {
      /* editar contacto */
      //leer el id
      const idRegistro =document.querySelector('#id').value;
      infContacto.append('id', idRegistro);
      actualizarRegistro(infContacto);
    }
  }
}
/** insertar en la base de datos via ajax */
function insertarBD(datos) {
  /* llamando ajax */

  /* crear en objeto*/
  const xhr = new XMLHttpRequest();

  /* abrir la conexion */
  xhr.open("POST", "inc/modelos/modelo-contactos.php", true);

  /* pasar los datos*/
  xhr.onload = function() {
    if (this.status === 200) {
     // console.log(JSON.parse(xhr.responseText));
      /*leemos la respuesta de php*/
      const respuesta = JSON.parse(xhr.responseText);

      //console.log(respuesta.empresa);

      //inserte un nuevo elemento a la tabla
      const nuevoContacto = document.createElement("tr");

      nuevoContacto.innerHTML = `
        <td>${respuesta.datos.nombre}</td>
        <td>${respuesta.datos.empresa}</td>
        <td>${respuesta.datos.telefono}</td>

        `;
      // crear contenedor para los botonoes
      const contenedorAcciones = document.createElement("td");

      // crear el icono de editar
      const iconoEditar = document.createElement("i");
      iconoEditar.classList.add("fas", "fa-pen-square");

      // crea el icono para editar
      const btnEditar = document.createElement("a");
      btnEditar.appendChild(iconoEditar);
      btnEditar.href = `editar.php?id=${respuesta.datos.insertado}`;
      btnEditar.classList.add("btn", "btn-editar");

      //agregarlo al padre
      contenedorAcciones.appendChild(btnEditar);

      // crear icono de eliminar
      const iconoEliminar = document.createElement("i");
      iconoEliminar.classList.add("fas", "fa-trash-alt");

      //crear  boton de eliminar

      const btnEliminar = document.createElement("button");
      btnEliminar.appendChild(iconoEliminar);
      btnEliminar.setAttribute("data-id", respuesta.datos.id_insertado);
      btnEliminar.classList.add("btn", "btn-borrar");

      // agregando al padre
      contenedorAcciones.appendChild(btnEliminar);

      // agregarlo al tr
      nuevoContacto.appendChild(contenedorAcciones);

      //agregarlo con los contactos
      listadoContactos.appendChild(nuevoContacto);

      // resetear el formulario
      document.querySelector("form").reset();

      //mostrar la notificacion
      mostrarNotificacion("Contacto creado correctamente", "correcto");

      //actualizar el numero 
      numeroContactos();
    }
  };

  /* enviar los datos*/
  xhr.send(datos);
}
function actualizarRegistro(datos){
  // crear el objeto
  const xhr = new XMLHttpRequest();
  //console.log(...datos); // comprobante 

  //abrir la conexion 
  xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);

  //leer la respuesta
  xhr.onload = function(){
    if(this.status === 200){
      const respuesta =JSON.parse(xhr.responseText);
      
     // console.log(respuesta);
    }
    setTimeout(() => {
      window.location.href = 'index.php';
    }, 4000);
  }

  //enviar la peticion
  xhr.send(datos);

}
// eliminar el contacto
function eliminarContacto(e) {
  if (e.target.parentElement.classList.contains("btn-borrar")) {
    //tomar el id
    const Id = e.target.parentElement.getAttribute("data-ide");

    //console.log(Id);
    //preguntar al usuario
    const respuesta = confirm("¿Estas seguo (a)?");
    if (respuesta) {
      //llamado ajax
      // crear el objeto
      const xhr = new XMLHttpRequest();
      // abrir la conexion
      xhr.open(
        "GET",
        `inc/modelos/modelo-contactos.php?id=${Id}&accion=borrar`,
        true
      );
      //leer la respuesta
      xhr.onload = function() {
        if (this.status === 200) {
          const resultado =JSON.parse(xhr.responseText);
          

          // console.log(resultado);

          if (resultado.respuesta === "correcto") {
            //eliminar registro del DOM
              console.log(e.target.parentElement.parentElement.parentElement);
              e.target.parentElement.parentElement.parentElement.remove();

            //mostrar notificacion
            mostrarNotificacion("contacto eliminado Correctamente", "correcto");
            
            //actualizar el numero 
            numeroContactos();
          } else {
            //hubo un error
            mostrarNotificacion("hubo un error...", "error");
          }
          setTimeout(() => {
            window.location.href = 'index.php';
          }, 4000);
        }
      };

      //enviar la peticin
      xhr.send();
    }
  }
}

/* notificacion en pantalla */

function mostrarNotificacion(mensaje, clase) {
  /* 2 parametros tex y clase */

  const notificacion = document.createElement("div");
  notificacion.classList.add(clase, "notificacion", "sombra");
  notificacion.textContent = mensaje;

  /* formulario */

  formulariocontactos.insertBefore(
    notificacion,
    document.querySelector("form legend")
  );

  /*ocultar y mostrar notificaciones */

  setTimeout(() => {
    notificacion.classList.add("visible");

    setTimeout(() => {
      notificacion.classList.remove("visible");
      setTimeout(() => {
        notificacion.remove();
      }, 500);
    }, 3000);
  }, 100);
}
// buscador de registros 

function buscarContactos(e){
  const expresion = new RegExp(e.target.value, "i"),
        registros = document.querySelectorAll('tbody tr');

        registros.forEach(registro => {
          registro.style.display = 'none';
          
          //comprobacion
          //console.log(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1);
          
          if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1){
            registro.style.display = 'table-row';

          }
          numeroContactos();

        })

}
// muestra el numero de contactos 
function numeroContactos(){
  const totalContactos = document.querySelectorAll('tbody tr'),
  contenedorNumero = document.querySelector('.total-contactos span');

  //console.log(totalContactos.length);

  let total = 0;

  totalContactos.forEach(contacto =>{
    if(contacto.style.display === '' || contacto.style.display === 'table-row'){
      total++;
    }
  });
 // console.log(total);
 contenedorNumero.textContent = total;
}

