<?php

namespace App\Controladores;

use Slim\Views\Twig;

class InicioControlador {
    private $view;

    public function __construct(Twig $view) {
        $this->view = $view;
    }

    public function paginaInicio($request, $response) {
        return $this->view->render($response, 'inicio.twig');
    }
}