<?php

namespace App\Modelos;

class Actividad implements \JsonSerializable {
    private $id;
    private $nombre;
    private $instruccion;
    private $descripcion;
    private $categoriaId;
    private $rutaArchivo;

    public function __construct($datos = null) {
        if(is_array($datos)) {
            if(isset($datos['id'])) $this->id = $datos['id'];
            $this->nombre = $datos['nombre'];
            $this->instruccion = $datos['instruccion'];
            $this->descripcion = $datos['descripcion'];
            $this->categoriaId = $datos['categoria_id'];
            $this->rutaArchivo = $datos['ruta_archivo'];
        }
    }

    public function jsonSerialize(){
        return [
            'id' => (int) $this->id,
            'nombre' => $this->nombre,
            'instruccion' => $this->instruccion,
            'descripcion' => $this->descripcion,
            'categoriaId' => (int) $this->categoriaId,
            'rutaArchivo' => $this->rutaArchivo
        ];
    }

    public function __get($propiedad){
        if (property_exists($this, $propiedad)) return $this->$propiedad;
    }

    public function __isset($propiedad) {
        return isset($this->$propiedad);
    }
}