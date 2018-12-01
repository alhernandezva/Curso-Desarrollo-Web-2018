var _btnContinuar = document.getElementById("btn-continuar");
var _btnAudio = document.getElementById("btn-audio");
_btnContinuar.addEventListener("click", procesarPuntaje, false);
_btnAudio.addEventListener("click", reproducirAudio, false);

// Iniciar el Canvas cuando se haya cargado la página
window.onload = function() {
    iniciarCanvas();
}

var _puntajes = [];

var _contenedores;
var _objetos;
var _tipos;

var _indiceObjetoSeleccionado;
var _arrastrando;
var _mouseX;
var _mouseY;
var _mouseArrastrandoX;
var _mouseArrastrandoY;

function iniciarCanvas() {
    var canvas = document.getElementById("lienzo");
    var ctx = canvas.getContext("2d");

    iniciar();

    // Cargar los recursos iniciales dentro del Canvas
    function iniciar() {
        /* =====> 1. Definir variables a conveniencia <===== */
        var posYContenedores = 50;
        var posYObjetos = 250;
        var anchoContenedor = 250;
        var altoContenedor = 145;
        var anchoObjeto = 50;
        var altoObjeto = 71;

        /* =====> 2. Definir tipos (para comparar contenedores y objetos) <===== */
        _tipos = ['A', 'B'];

        /* =====> 3. Definir contenedores <===== */
        _contenedores = [
            {
                nombre: 'JAULA A',
                src: 'jaula_a.png',
                ancho: anchoContenedor,
                alto: altoContenedor,
                img: null,
                posX: 40,
                posY: posYContenedores,
                tipo: _tipos[0]
            },
            {
                nombre: 'JAULA B',
                src: 'jaula_b.png',
                ancho: anchoContenedor,
                alto: altoContenedor,
                img: null,
                posX: 310,
                posY: posYContenedores,
                tipo: _tipos[1]
            },
        ];

        /* =====> 4. Definir objetos interactuables (que se pueden arrastrar) <===== */
        _objetos = [
            {
                nombre: 'PERICO AZUL 1',
                src: 'perico_azul.png',
                ancho: anchoObjeto,
                alto: altoObjeto,
                img: null,
                posX: 55,
                posY: posYObjetos,
                tipo: _tipos[0]
            },
            {
                nombre: 'PERICO BLANCO 1',
                src: 'perico_blanco.png',
                ancho: anchoObjeto,
                alto: altoObjeto,
                img: null,
                posX: 135,
                posY: posYObjetos,
                tipo: _tipos[1]
            },
            {
                nombre: 'PERICO AZUL 2',
                src: 'perico_azul.png',
                ancho: anchoObjeto,
                alto: altoObjeto,
                img: null,
                posX: 215,
                posY: posYObjetos,
                tipo: _tipos[0]
            },
            {
                nombre: 'PERICO BLANCO 2',
                src: 'perico_blanco.png',
                ancho: anchoObjeto,
                alto: altoObjeto,
                img: null,
                posX: 325,
                posY: posYObjetos,
                tipo: _tipos[1]
            },
        ];

        // Crear sub-puntajes según la cantidad de Objetos
        _objetos.forEach(function(obj) {
            _puntajes.push(null);
        });

        cargarImagenes(dibujarCanvas);

        canvas.addEventListener("mousedown", clickPresionado, false);
    }

    // Cargar las imágenes. Cuando se han cargado todas, las dibuja en el Canvas
    function cargarImagenes(callback) {
        var objetosCargados = 0;
        var contenedoresCargados = 0;
        _objetos.forEach(function(obj) {
            var img = new Image(obj.ancho, obj.alto);
            img.src = obj.src;

            img.onload = function() {
                obj.img = img;
                objetosCargados++;
                if(objetosCargados >= _objetos.length) {
                    _contenedores.forEach(function(cont) {
                        var imgJ = new Image(cont.ancho, cont.alto);
                        imgJ.src = cont.src;

                        imgJ.onload = function() {
                            cont.img = imgJ;
                            contenedoresCargados++;
                            if(contenedoresCargados >= _contenedores.length) {
                                callback();
                            }
                        }
                    });
                }
            }
        });
    }

    // Preparar el Canvas
    function dibujarCanvas() {
        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        dibujarImagenes();
    }

    // Dibujar todas las imágenes en el Canvas
    function dibujarImagenes() {
        _contenedores.forEach(function(cont){
            ctx.drawImage(cont.img, cont.posX, cont.posY, cont.ancho, cont.alto);
        });
        _objetos.forEach(function(obj){
            ctx.drawImage(obj.img, obj.posX, obj.posY, obj.ancho, obj.alto);
        });
    }

    // Determina si un objeto ha sido seleccionado según las posiciones indicadas
    function objetoSeleccionado(objeto, mx, my) {
        if(
            mx >= (objeto.posX) &&
            mx <= (objeto.posX + objeto.ancho) &&
            my >= (objeto.posY) &&
            my <= (objeto.posY + objeto.alto)
        ) {
            return true;
        }

        return false;
    }

    // Evento cuando se presiona el click
    function clickPresionado(evento) {
        var i;

        var indiceMasCercano = -1;

        // Obtener posición precisa del mouse
        var bRect = canvas.getBoundingClientRect();
        _mouseX = (evento.clientX - bRect.left) * (canvas.width / bRect.width);
        _mouseY = (evento.clientY - bRect.top) * (canvas.height / bRect.height);

        for(i = 0; i < _objetos.length; i++) {
            if(objetoSeleccionado(_objetos[i], _mouseX, _mouseY)) {
                _arrastrando = true;
                if(i > indiceMasCercano) {
                    // Tenedremos en cuenta el punto del cual el mouse está sosteniendo el objeto
                    _mouseArrastrandoX = _mouseX - _objetos[i].posX;
                    _mouseArrastrandoY = _mouseY - _objetos[i].posY;
                    indiceMasCercano = i;
                    _indiceObjetoSeleccionado = i;
                }
            }
        }

        if(_arrastrando) {
            window.addEventListener("mousemove", mouseMoviendose, false);
        }

        canvas.removeEventListener("mousedown", clickPresionado, false);
        window.addEventListener("mouseup", clickSuelto, false);

        // Evita que el evento del click presionado tenga efecto fuera de la ventana principal del navegador
        if(evento.preventDefault) {
            evento.preventDefault();
        }else if(evento.returnValue) {
            evento.returnValue = false;
        }

        return false;
    }

    // Evento cuando se mueve el mouse
    function mouseMoviendose(evento) {
        var posX;
        var posY;
        var ancho = _objetos[_indiceObjetoSeleccionado].ancho;
        var alto = _objetos[_indiceObjetoSeleccionado].alto;
        var minX = 0;
        var maxX = canvas.width - ancho;
        var minY = 0;
        var maxY = canvas.height - alto;

        // Obtener posición precisa del mouse
        var bRect = canvas.getBoundingClientRect();
        _mouseX = (evento.clientX - bRect.left) * (canvas.width / bRect.width);
        _mouseY = (evento.clientY - bRect.top) * (canvas.height / bRect.height);

        // Evita que el objeto sea movido fuera del Canvas
        posX = _mouseX - _mouseArrastrandoX;
        posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
        posY = _mouseY - _mouseArrastrandoY;
        posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

        // Actualizo la posición del objeto seleccionado y vuelvo a dibujar el Canvas
        _objetos[_indiceObjetoSeleccionado].posX = posX;
        _objetos[_indiceObjetoSeleccionado].posY = posY;
        dibujarCanvas();
    }

    // Evento cuando se deja de presionar el click (se suelta)
    function clickSuelto(evento) {
        canvas.addEventListener("mousedown", clickPresionado, false);
        window.removeEventListener("mouseup", clickSuelto, false);
        if(_arrastrando) {
            _arrastrando = false;
            window.removeEventListener("mousemove", mouseMoviendose, false);
            calificarObjeto(_objetos[_indiceObjetoSeleccionado]);
        }
    }

    /**
     * Calificar un objeto específico. Determina si se ha movido dentro un contenedor y compara sus tipos.
     * Si los tipos son iguales, se otorga un puntaje positivo, de lo contrario uno negativo.
     */
    function calificarObjeto(objeto) {
        var objPosX1 = objeto.posX;
        var objPosX2 = objPosX1 + objeto.ancho;
        var objPosY1 = objeto.posY;
        var objPosY2 = objPosY1 + objeto.alto;        
        
        for(var i=0; i < _contenedores.length; i++){
        	var contPosX1 = _contenedores[i].posX;
            var contPosX2 = contPosX1 + _contenedores[i].ancho;
            var contPosY1 = _contenedores[i].posY;
            var contPosY2 = contPosY1 + _contenedores[i].alto;
            if (
                objPosX1 >= contPosX1 &&
                objPosX2 <= contPosX2 &&
                objPosY1 >= contPosY1 &&
                objPosY2 <= contPosY2
            ){
                if (objeto.tipo == _contenedores[i].tipo) {
                    correcto();
                } else {
                    error();
                }
                break;
            }else{
            	_puntajes[_indiceObjetoSeleccionado] = null;
            }
        }

        verificarPuntajes();
    }

    /**
     * Verifica los valores del arreglo de _puntajes.
     * Muestra el botón de 'Continuar' si todos los puntaje son válidos.
     */
    function verificarPuntajes() {
        var puntajesValidos = true;
        for (var i = 0; i < _puntajes.length; i++) {
            if(_puntajes[i] == null) {
                puntajesValidos = false;
                break;
            }
        }

        if(puntajesValidos) {
            mostrarContinuar();
        }else{
            ocultarContinuar();
        }
    }
}

/**
 * Cada puntaje correcto es igual a 1 / NUM_OBJETOS
 */
function correcto() {
    _puntajes[_indiceObjetoSeleccionado] = 1/(_objetos.length);
}
function error() {
    _puntajes[_indiceObjetoSeleccionado] = 0;
}

function mostrarContinuar() {
    _btnContinuar.style.display = "block";
}
function ocultarContinuar() {
    _btnContinuar.style.display = "none";
}
function reproducirAudio() {
    console.log("Audio ...");
}
function procesarPuntaje() {
    var puntaje = 0;
    for (var i = 0; i < _puntajes.length; i++) {
        if(_puntajes[i] == null || isNaN(_puntajes[i])) {
            var texto = "Por favor completa la actividad";
            if(typeof parent.mostrarAlerta === "function") {
                parent.mostrarAlerta(texto);
            } else {
                alert(texto);
            }
            ocultarContinuar();
            return false;
        } else {
            puntaje += _puntajes[i];
        }
    }

    // puntaje debe ser un valor entre [0, 1]
    if(typeof parent.enviarPuntaje === "function") {
        parent.enviarPuntaje(puntaje);
    }else{
        alert("Puntaje: " + puntaje);
    }
}