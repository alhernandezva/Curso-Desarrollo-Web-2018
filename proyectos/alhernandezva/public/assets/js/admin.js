// Referencias a elementos HTML
var btnAbrirModal = document.getElementById('btn-abrir-modal');
var btnCerrarModal = document.getElementById('btn-cerrar-modal');
var modalCargarActividad = document.getElementById('modal-cargar-actividad');

var formCargarActividad = document.getElementById('form-cargar-actividad');
var tablaActividades = document.getElementById('tabla-actividades');

var csrfName = document.getElementById('csrfname');
var csrfValue = document.getElementById('csrfvalue');

// Asociación de funciones a eventos
btnAbrirModal.addEventListener("click", mostrarModal);
btnCerrarModal.addEventListener("click", cerrarModal);

// cargarActividad.submit

// Definición de funciones personalizadas
function mostrarModal() {
    modalCargarActividad.classList.add("mostrar");
}

function cerrarModal() {
    modalCargarActividad.classList.remove("mostrar");
    reiniciarFormCargarActividad();
}

// function cargarActividad

function mostrarErroresFormCargarActividad(form, errores) {
    if (errores.nombre) {
        form.elements.nombre.nextElementSibling.textContent = errores.nombre;
        form.elements.nombre.parentElement.classList.add("error");
    }
    if (errores.instruccion) {
        form.elements.instruccion.nextElementSibling.textContent = errores.instruccion;
        form.elements.instruccion.parentElement.classList.add("error");
    }
    if (errores.descripcion) {
        form.elements.descripcion.nextElementSibling.textContent = errores.descripcion;
        form.elements.descripcion.parentElement.classList.add("error");
    }
    if (errores.categoria) {
        form.elements.categoria.nextElementSibling.textContent = errores.categoria;
        form.elements.categoria.parentElement.classList.add("error");
    }
    if (errores.archivo) {
        form.elements.archivo.nextElementSibling.textContent = errores.archivo;
        form.elements.archivo.parentElement.classList.add("error");
    }
}

function reiniciarFormCargarActividad() {
    formCargarActividad.reset();
    var items = formCargarActividad.querySelectorAll(".controles li");
    items.forEach(function (item) {
        item.classList.remove("error");
    });
}

function agregarActividadTabla(actividad) {
    var tbody = tablaActividades.querySelector("tbody");

    var celdaIndice = document.createElement("td");
    var celdaNombre = document.createElement("td");
    var celdaInstruccion = document.createElement("td");
    var celdaDescripcion = document.createElement("td");
    var celdaCategoria = document.createElement("td");
    var celdaRuta = document.createElement("td");
    var celdaEliminar = document.createElement("td");

    var indiceActual = tbody.querySelectorAll("tr").length + 1;
    celdaIndice.textContent = indiceActual;
    celdaNombre.textContent = actividad.nombre;
    celdaInstruccion.textContent = actividad.instruccion;
    celdaDescripcion.textContent = actividad.descripcion;
    celdaCategoria.textContent = actividad.categoriaId;
    celdaRuta.textContent = actividad.rutaArchivo;

    var btnEliminar = document.createElement("button");
    btnEliminar.classList = "btn rojo btn-eliminar";
    btnEliminar.addEventListener("click", eliminarActividad.bind(null, btnEliminar, actividad.id));
    btnEliminar.innerHTML = '<i class="fe fe-trash"></i></button>';
    celdaEliminar.appendChild(btnEliminar);

    var fila = document.createElement("tr");
    fila.appendChild(celdaIndice);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaInstruccion);
    fila.appendChild(celdaDescripcion);
    fila.appendChild(celdaCategoria);
    fila.appendChild(celdaRuta);
    fila.appendChild(celdaEliminar);

    tbody.appendChild(fila);
    tablaActividades.parentNode.querySelector(".tabla-vacia").classList.remove("mostrar");
}

function eliminarActividad(elemento, actividadId) {
    var continuar = confirm("¿Estás seguro que deseas eliminar esta actividad?");
    if (continuar) {
        var url = tablaActividades.dataset.urleliminar;
        var params = {
            'accion': 'ELIMINAR',
            'id': actividadId
        };
        axios.get(url, {params: params})
            .then(function (res) {
                if(res.data.eliminado) {
                    quitarActividadTabla(elemento);
                }
            }).catch(function (err) {
                console.log(err.response);
            });
    }
}

function quitarActividadTabla(elemento) {
    var fila = elemento.closest("tr");
    fila.parentNode.removeChild(fila);
}