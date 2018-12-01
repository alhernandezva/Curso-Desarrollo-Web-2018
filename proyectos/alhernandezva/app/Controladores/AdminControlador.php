<?php

namespace App\Controladores;

use Slim\Views\Twig;

use App\Servicios\ActividadServicio;
use App\Validadores\ValidarCargaActividad;

class AdminControlador {
    private $view;
    private $actividadServicio;

    public function __construct(Twig $view, ActividadServicio $actividadServicio) {
        $this->view = $view;
        $this->actividadServicio = $actividadServicio;
    }

    //public function paginaDashboard($request, $response)

    //public function consultarActividades($request, $response)

    //public function cargarActividad($request, $response, ValidarCargaActividad $validador)

    //public function eliminarActividad($request, $response)
}