//Direccion del EndPoint generado en Retool
const API_URL = "https://retoolapi.dev/bCZ50M/integrantes"

//Función que llama a la API y realiza una solicitud GET. Obtiene un JSON.
async function ObtenerRegistros(){
    //Hacemos GET a la API y obtendremos su respuesta (response)
    const respuesta = await fetch(API_URL);

    //Obtendremos los datos en formato JSON a partir de la respuesta
    const data = await respuesta.json();

    //Llamamos a MostrarRegistro y le enviamos el JSON
    MostrarRegistros(data);
}

//Funcion para generar las filas de la tabla
//"datos" representa al JSON
function MostrarRegistros(datos) {

    //Se llama al alemento tbody dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar código HTML utilizamos innerHTML
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.correo}</td>
                <td>
                    <button onclick="AbrirModalEditar('${persona.id}', '${persona.nombre}', '${persona.apellido}', '${persona.correo}')">Editar</button>
                    <button onclick= "EliminarRegistro(${persona.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}
ObtenerRegistros();

//Proceso para agregar resgistros
const modal = document.querySelector("#mdAgregar"); //Cuadro de diálogo
const btnAgregar = document.querySelector("#btnAgregar"); //Botón para abrir
const btnCerrar = document.querySelector("#btnCerrarModal"); //Botón para cerrar

btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //Abre el modal cuando a btnAgregar se le hace click
});

btnCerrar.addEventListener("click", ()=>{
    modal.close(); //Cierra el modal cuando a btnCerrar se le hace click
});


//Agregar un nuevo integrante desde el formulario
document.querySelector("#frmAgregar").addEventListener("submit", async e =>{
    e.preventDefault(); //Evita que los datos se envíen por defecto :o

    //Capturar los valores del formulario
    const nombre = document.querySelector("#txtNombre").value.trim();
    const apellido = document.querySelector("#txtApellido").value.trim();
    const correo = document.querySelector("#txtCorreo").value.trim();

    //Validación básica
    if(!nombre || !apellido || !correo){
        alert("Complete todos los campos por favor uwu onichan daiski");
        return; //Evita que el código se siga ejecutando
    }

    //Llamar a la API para enviar los datos
    const respuesta = await fetch(API_URL, {
        method : "POST", 
        headers : {'Content-Type' : 'application/json'}, //Content-Type es el tipo de dato que mandamos al JSON
        body : JSON.stringify({nombre,apellido,correo}) //Un JSON puro lo convierte en String
    });

    if(respuesta.ok){
        //Mensaje de confirmación
        alert("El registro fue agregado correctamente UWU");

        //Limpiar el formulario
        document.querySelector("#btnAgregar").reset();

        //Cerrar el modal (dialog)
        modal.close();

        //Recargar la tabla
        ObtenerRegistros();
    }else{
        alert("Hubo un error al guardar JASJASJASJAJSJA");
    }

});

//Función para borrar registros
async function EliminarRegistro(id){
    const confirmacion = confirm("¿Realmente quieres eliminar el registro? ¿O solamente es el sentimiento de que los problemas desaparezcan de tu vida sin siquiera enfrentarlos?");

    //Validamos si el usuario eligió "Aceptar"
    if(confirmacion){
        await fetch(`${API_URL}/${id}`,{
             method : "DELETE"
        }); //Llamada al EndPoint

        //Recargar la tabla para actualizar la vista
        ObtenerRegistros();
    }
}

//Función para editar registros
const modalEditar = document.querySelector("#mdEditar");
const btnCerrarEditar = document.querySelector("#btnCerrarEditar");

//Funcionalidad para cerrar el modal
btnCerrarEditar.addEventListener("click", ()=>{
    modalEditar.close(); //Cerrar modal de editar
})

//Función para abrir el modal
function AbrirModalEditar(id, nombre, apellido, correo){
    //Agregamos los valores a los input antes de abrir el modal
    document.querySelector("#txtIdEditar").value = id;
    document.querySelector("#txtNombreEditar").value = nombre;
    document.querySelector("#txtApellidoEditar").value = apellido;
    document.querySelector("#txtCorreoEditar").value = correo;

    //Modal se abre después de agregar los valores a los input
    modalEditar.showModal();
}

document.querySelector("#frmEditar").addEventListener("submit", async e => {
    e.preventDefault(); //Evita que el formulario se envíe de golpe

    //Capturamos los valores nuevos del formulario
    const id = document.querySelector("#txtIdEditar").value;
    const nombre = document.querySelector("#txtNombreEditar").value.trim();
    const apellido = document.querySelector("#txtApellidoEditar").value.trim();
    const correo = document.querySelector("#txtCorreoEditar").value.trim();

    //Validacion de los campos
    if(!id || !nombre || !apellido || !correo){
        alert("Estás seguro de no llenar algún campo? Complete todos los campos por favor.")
        return; //Evita que el código se siga ejecutando
    }

    //Llamada a la API
    const respuesta = await fetch(`${API_URL}/${id}`,{
        method : "PUT",
        headers : {'Content-Type' : 'application/json'}, //Content-Type es el tipo de dato que mandamos al JSON
        body : JSON.stringify({correo, nombre, apellido}) //Un JSON puro lo convierte en String
   });

   if(respuesta.ok){
    alert("Registro actualizado correctamente mi querido terricola"); //Confirmación
    modalEditar.close(); //Creamos el modal
    ObtenerRegistros(); //Recargamos la tabla
   }else{
    alert("Hubo un bendito error al actualizar, lo has hecho mal...")
   }
});
