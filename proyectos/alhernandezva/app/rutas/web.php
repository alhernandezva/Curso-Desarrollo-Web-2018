<?php

// Definición de rutas de la Aplicación Web

$app->get('/', ['App\Controladores\InicioControlador', 'paginaInicio'])->setName('inicio');