<?php

namespace App\Validadores;

use Psr\Http\Message\UploadedFileInterface;

class ValidarCargaActividad extends ValidadorAbstracto {
    
    /**
     * Determina la validez de todos los campos y archivos cargados.
     * En caso de haber campos inválidos, retorna un arreglo con los mensajes de error respectivos.
     */
    public function validarDatos($datos, UploadedFileInterface $archivo) {
        $this->errores['nombre'] = $this->validarCampoVacio($datos['nombre']);
        $this->errores['instruccion'] = $this->validarCampoVacio($datos['instruccion']);
        $this->errores['descripcion'] = $this->validarCampoVacio($datos['descripcion']);
        $this->errores['categoria'] = $this->validarCampoVacio($datos['categoria']);
        $errorCategoria2 = $this->validarCampoNumericoPositivo($datos['categoria']);
        if(!empty($errorCategoria2)) $this->errores['categoria'] = $errorCategoria2;
        $this->errores['archivo'] = $this->validarArchivoActividad($archivo);

        return $this->hayErrores();
    }
}