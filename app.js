//Al cargar la pagina, ejecuta la función "obtenerDatos"
window.addEventListener('load',obtenerDatos);

//Obtener datos de fecha actual
function obtenerDatos(){
    const fecha = new Date();
    const añoActual = fecha.getFullYear();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
    
//Construir la url para la solicitud
    const Nasa_api = 'aMqBkUOnp8VsvVmUnPPUTLibkgl4yospSEg5s4wY';
    const ruta = `https://api.nasa.gov/planetary/apod?date=${añoActual}-${mesActual}-${hoy}&api_key=${Nasa_api}`;

//Enviar/ejecutar la solicitud
    fetch(ruta)
    .then(respuesta => respuesta.json())

//Llamar la función "mostrarDatos" para modifica el index con los datos recibidos
    .then(restultado => mostrarDatos(restultado))

//Hacer que la fecha maxima de consulta sea hasta el dia actual
    const elegirFecha = document.querySelector('#elegirFecha');
    mesActualString = mesActual.toString().padStart(2,0);
    hoyString = hoy.toString().padStart(2,0);
    elegirFecha.innerHTML = `<input id="fecha1" class="form-control" type="date" style="margin: 0px;padding: 10px;"
    min="2018-01-01" max="${añoActual}-${mesActualString}-${hoyString}">`;
}

//Recibimos un json y lo dividimos (esto de acuerdo a la documentación de Nasa)
function mostrarDatos({date,explanation,media_type,title,url}){

//Las partes divididas las asignamos en el html con el ID correspondiente
    const titulo = document.querySelector('#titulo');
    titulo.innerHTML = title;
    const fecha = document.querySelector('#fecha');
    fecha.innerHTML = date;
    const descripcion = document.querySelector('#descripcion');
    descripcion.innerHTML = explanation;
    const multimedia = document.querySelector('#c_multimedia');

//Si regresa video lo agregamos sino solamente imagen
    if (media_type == 'video') {
        multimedia.innerHTML =  `<iframe class="embed-responsive-item" src="${url}">`;
    }else{
        multimedia.innerHTML= `<img src="${url}" class="img-fluid" alt="Responsive image"></img>`;
    }

    
}

//Podemos buscar una imagen o video de determinada fecha y repetimos el proceso de mostrar datos pero con
//fecha personalizada
function buscarImagen(){
    const fechaOn = document.querySelector('#fecha1').value;
    console.log(fechaOn);

    const Nasa_api = 'aMqBkUOnp8VsvVmUnPPUTLibkgl4yospSEg5s4wY';
    const ruta = `https://api.nasa.gov/planetary/apod?date=${fechaOn}&api_key=${Nasa_api}`;

    fetch(ruta)
    .then(respuesta => respuesta.json())
    .then(restultado => mostrarDatos(restultado))
}