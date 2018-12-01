<?php

namespace App\Validadores;

use Psr\Http\Message\UploadedFileInterface;

abstract class ValidadorAbstracto {

    protected $errores;

    /**
     * Determina si el campo está vacio, es decir, no contiene ningún valor
     */
    protected function validarCampoVacio($campo) {
        $error = "";
        if(empty($campo)) {
            $error = "El campo es obligatorio";
        }

        return $error;
    }

    /**
     * Determina si el campo es un número y es positivo
     */
    protected function validarCampoNumericoPositivo($campo) {
        $error = "";
        if(!is_numeric($campo) || $campo < 0) {
            $error = "El campo no es válido";
        }

        return $error;
    }

    /**
     * Determina si el archivo cargado es válido teniendo en cuenta su extensión y tipo de archivo
     */
    protected function validarArchivoActividad(UploadedFileInterface $archivo){
        $error = "";

        if(empty($archivo->file)){
            $error = "Por favor selecciona un archivo válido (.zip)";
        }

        if($archivo->getError() === UPLOAD_ERR_OK){
            $extensionesValidas = ['zip'];
            $tiposPermitidos = ['application/zip', 'multipart/x-zip', 'application/x-zip-compressed', 'application/x-compressed'];
            $nombreArchivo = $archivo->getClientFilename();
            //$tam = $archivo->getSize();
            $temporal = explode('.', $nombreArchivo);
            $extension = end($temporal);
            if(
                !in_array($archivo->getClientMediaType(), $tiposPermitidos) ||
                !in_array($extension, $extensionesValidas)){
                $error = "Por favor selecciona un archivo válido (.zip)";
            }
        }else{
            $error = "Ha ocurrido un error durante la carga del archivo, por favor vuelve a intentarlo";
        }
        
        return $error;
    }

    /**
     * Verificar si se encontró algún error durante la validación. Retorna el arreglo con los mensajes de error.
     */
    protected function hayErrores() {
        foreach ($this->errores as $error) {
            if(!empty($error)) return $this->errores;
        }

        return false;
    }
}