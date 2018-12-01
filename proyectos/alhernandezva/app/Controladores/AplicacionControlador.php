<?php

namespace App\Controladores;

use Slim\Views\Twig;
use App\Servicios\ActividadServicio;

class AplicacionControlador {
    private $view;

    public function __construct(Twig $view) {
        $this->view = $view;
    }

    public function paginaAplicacion($request, $response) {
        return $this->view->render($response, 'aplicacion.twig');
    }

    public function consultarActividades($request, $response, ActividadServicio $actividadServicio) {
        $actividades = $actividadServicio->consultarActividades();

        return $response->withJson(['actividades' => $actividades], 200);
    }
}