<?php

// Definición de rutas de la Aplicación Web

$app->get('/', ['App\Controladores\InicioControlador', 'paginaInicio'])->setName('inicio');

$app->group('/aplicacion', function() {
    $this->get('', ['App\Controladores\AplicacionControlador', 'paginaAplicacion'])->setName('aplicacion');
    $this->get('/actividades', ['App\Controladores\AplicacionControlador', 'consultarActividades'])->setName('aplicacion.actividades');
});