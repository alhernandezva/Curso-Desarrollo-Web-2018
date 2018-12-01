<?php

// Configuración de la Base de Datos
return [
    'host' => '',
    'user' => '',
    'password' => '',
    'db' => '',
    'charset' => 'utf8',
    'opciones' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]
];