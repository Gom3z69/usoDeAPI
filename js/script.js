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
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `;
    });
}
ObtenerRegistros();