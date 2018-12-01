var _btnContinuar = document.getElementById("btn-continuar");
var _btnAudio = document.getElementById("btn-audio");
_btnContinuar.addEventListener("click", procesarPuntaje, false);
_btnAudio.addEventListener("click", reproducirAudio, false);

// Escribir script aquí
var _puntaje = null;

var _numero1 = 0;
var _numero2 = 0;
var _resultado = 0;
var _operaciones = [
    {nombre: 'SUMA', respuesta: false},
    {nombre: 'RESTA', respuesta: false},
    {nombre: 'MULTIPLICACION', respuesta: false}
];

window.onload = function() {
    var posOp = Math.floor(Math.random() * _operaciones.length);
    determinarResultado(_operaciones[posOp].nombre);
    _operaciones[posOp].respuesta = true;
    mostrarNumeros();

}

function determinarResultado(operacion) {
    var numeroMinimo = 1;
    var numeroMaximo = 9;

    //_numero1 = Math.floor(Math.random() * (numeroMaximo - numeroMinimo + 1)) + numeroMinimo;
    _numero1 = numeroAleatorioRango(numeroMinimo, numeroMaximo);    
    if(operacion == "SUMA") {
        _numero2 = numeroAleatorioRango(numeroMinimo, numeroMaximo);
        _resultado = _numero1 + _numero2;
    }else if(operacion == "RESTA") {
        _numero2 = numeroAleatorioRango(numeroMinimo, _numero1);
        _resultado = _numero1 - _numero2;
    }else{
        _numero1 = numeroAleatorioRango(numeroMinimo, 4);
        _numero2 = numeroAleatorioRango(numeroMinimo, 4);
        _resultado = _numero1 * _numero2;
    }

    if(_numero1 < _numero2) {
        var temp = _numero1;
        _numero1 = _numero2;
        _numero2 = temp;
    }
}

function numeroAleatorioRango(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mostrarNumeros() {
    var num1 = document.getElementById("numero1");
    var num2 = document.getElementById("numero2");
    var res = document.getElementById("resultado");
    num1.textContent = _numero1;
    num2.textContent = _numero2;
    res.textContent = _resultado;

    // Explicar como cambiar datos con la consola y mover elementos en tiempo real
    var left1Cifra = '345px';
    var left2Cifras = '330px';

    if(_numero1 > 9) {
        num1.style.left = left2Cifras;
    }else{
        num1.style.left = left1Cifra;
    }
    if(_numero2 > 9) {
        num2.style.left = left2Cifras;
    }else{
        num2.style.left = left1Cifra;
    }
    if(_resultado > 9) {
        res.style.left = left2Cifras;
    }else{
        res.style.left = left1Cifra;
    }
}

function seleccionar(valor) {
    var signo = document.getElementById("signo");
    switch(valor) {
        case 0:
            if(_operaciones[0].respuesta) {
                correcto();
            }else{
                error();
            }
            signo.textContent = "+";
            break;
        case 1:
            if(_operaciones[1].respuesta) {
                correcto();
            }else{
                error();
            }
            signo.textContent = '\u2212'; // signo menos
            break;
        case 2:
            if(_operaciones[2].respuesta) {
                correcto();
            }else{
                error();
            }
            signo.textContent = '\u00D7'; // signo multiplicación
    }
}

function correcto() {
    // Definir aumento de puntaje y si se muestra continuar
    _puntaje = 1;
    mostrarContinuar();
}
function error() {
    // Definir reducción de puntaje y si se muestra continuar
    _puntaje = 0;
    mostrarContinuar();

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
    // puntaje debe ser un valor entre [0, 1]
    var puntaje = _puntaje;

    if(puntaje == null || isNaN(puntaje)) {
        var texto = "Por favor completa la actividad";
        if(typeof parent.mostrarAlerta === "function") {
            parent.mostrarAlerta(texto);
        } else {
            alert(texto);
        }
        ocultarContinuar();
    } else {
        if(typeof parent.enviarPuntaje === "function") {
            parent.enviarPuntaje(puntaje);
        }else{
            alert("Puntaje: " + puntaje);
        }
    }
}