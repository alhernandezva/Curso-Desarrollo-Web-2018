<?php

namespace App\Modelos;

class Administrador implements \JsonSerializable {
    private $id;
    private $nombre;
    private $apellido;
    private $email;
    private $password;
    private $fechaCreacion;

    public function __construct($datos = null){
        if(is_array($datos)){
            if(isset($datos['id'])) $this->id = $datos['id'];
            $this->nombre = $datos['nombre'];
            $this->apellido = $datos['apellido'];
            $this->email = $datos['email'];
            $this->password = $datos['password'];
            $this->fechaCreacion = $datos['fecha_creacion'];
        }
    }

    public function getNombreCompleto(){
        return $this->nombre . ' ' . $this->apellido;
    }

    public function jsonSerialize(){
        return [
            'id' => (int) $this->id,
            'nombre' => $this->nombre,
            'apellido' => $this->apellido,
            'email' => $this->email,
            'password' => null,
            'fechaCreacion' => $this->fechaCreacion
        ];
    }

    public function __get($propiedad){
        if (property_exists($this, $propiedad)) return $this->$propiedad;
    }

    public function __isset($propiedad) {
        return isset($this->$propiedad);
    }
}