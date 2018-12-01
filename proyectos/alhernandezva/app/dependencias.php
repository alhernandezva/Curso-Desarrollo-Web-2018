<?php

use Slim\Views\Twig;
use Slim\Views\TwigExtension;
use Slim\Csrf\Guard;
use Psr\Container\ContainerInterface;

// Middlewares
use App\Middlewares\CsrfExtension;

// Repositorios: interfaces
//use App\Repositorios\EstudianteRepoInterface;

// Repositorios: implementaciones
//use App\Repositorios\EstudianteRepo;

return [
    // Configuración de la conexión a Base de Datos
    PDO::class => function(ContainerInterface $c){
        $config = require __DIR__ . '/config/basedatos.php';
        $dsn = 'mysql:host=' . $config['host'] . ';dbname=' . $config['db'] . ';charset=' . $config['charset'];
        return new PDO($dsn, $config['user'], $config['password'], $config['opciones']);
    },
    // Configuración de Seguridad
    Guard::class => function(ContainerInterface $c){
        // Se activa la persistencia de CSRF tokens en la sesión para facilitar el manejo de formularios con AJAX
        $guard = new Guard();
        $guard->setPersistentTokenMode(true);

        return $guard;
    },
    // Configuración del Motor de Plantillas
    Twig::class => function(ContainerInterface $c){
        $twig = new Twig(__DIR__ . '/vistas', [
            'cache' => false
        ]);
        $twig->addExtension(new TwigExtension(
            $c->get('router'),
            $c->get('request')->getUri()
        ));
        $twig->addExtension(new CsrfExtension($c->get(Guard::class)));

        return $twig;
    },
    // Definición de implementaciones para las interfaces de la aplicación
    //EstudianteRepoInterface::class => DI\object(EstudianteRepo::class),
];