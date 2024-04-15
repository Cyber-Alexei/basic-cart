//Extraer la informacion de un card que a su vez es un curso para llevar al carrito


//creamos variables a partir de algunos elementos, para referirnos a ellos despues
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];


//Al dar click se ejecuta la funcion agregarCurso
cargarEventListener();

function cargarEventListener() {
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar cursos
    carrito.addEventListener('click', eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        carritoHTML ();
    });

    document.addEventListener('DOMContentLoaded', cargarLocalStorage = () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })
}


//Si el usuario da click en agrregar curso, extraemos la informacion del mismo
function agregarCurso(e) {

    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        //Mandamos a llamar otra funcion, creada mas adelante
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Eliminar del arreglo iterando sobre todos los cursos
        articulosCarrito = articulosCarrito.filter(cursoSeleccionado => cursoSeleccionado.id !== cursoId)
    
        console.log(articulosCarrito);
        
        carritoHTML();
    }
}



//Esta funcion crea un objeto que nos desglosa la info del curso seleccionado
function leerDatosCurso(cursoSeleccionado) {

    const infoCurso = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //Revisa si un elemento ya existe en el carrito

    const existe = articulosCarrito.some(cursoSeleccionado => 
        cursoSeleccionado.id === infoCurso.id);
    if(existe) {
        //actualizamos la cantidad
        let cursos = articulosCarrito.map( cursoSeleccionado => {
            if(cursoSeleccionado.id === infoCurso.id) {
                cursoSeleccionado.cantidad++;
                return infoCurso //Retorna el objeto duplicado
            }
            else{
                return infoCurso; //Retorna los objetos no duplicados
            }
        })
    }
    else {
        //Agrega el objeto al array del carrito con spread operator
        //se puede usar .push tambien ;)
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //Imprimimos el HTML
    carritoHTML();
}

//Muestra el carrito de compra en el HTML

function carritoHTML () {


    //Limpiamos el HTML previo, por tener DUPLICADOS 
    limpiarCart ();

    //Volvemos a generar el HTML (mantine la referencia del array)
    //Se limpio el HTML pero no el Array
    articulosCarrito.forEach( cursoSeleccionado => {
    const {imagen, titulo, precio, cantidad, id,} = cursoSeleccionado
    const row = document.createElement('tr');
    row.innerHTML = `

    <td><img src="${imagen}" width="150px"</td>

    <td>${titulo}</td>

    <td>${precio}</td>

    <td>${cantidad}</td>

    <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>

    `;

    //agregar el HTML del carrito en el tbody
    listaCarrito.appendChild(row)

    });
    //Agregar a local storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

//Elimina los cursos del tbody 
function limpiarCart () {

    //Forma lenta
    //listaCarrito.innerHTML = '';

    //Forma rapida
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}