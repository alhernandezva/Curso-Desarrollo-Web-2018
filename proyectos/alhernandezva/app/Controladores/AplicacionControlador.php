<?php

namespace App\Controladores;

use Slim\Views\Twig;

class AplicacionControlador {
    private $view;

    public function __construct(Twig $view) {
        $this->view = $view;
    }

    //public function paginaAplicacion($request, $response)
}