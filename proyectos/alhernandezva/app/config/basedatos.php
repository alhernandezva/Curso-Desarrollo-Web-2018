<?php

// Configuración de la Base de Datos
return [
    'host' => 'localhost',
    'user' => 'root',
    'password' => '',
    'db' => 'repoactividades',
    'charset' => 'utf8',
    'opciones' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]
];