<?php

// Quitar en Producción
error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set('display_errors', 1);

session_start();

// Path del directorio público
$public_path = '/public/';

$url = '//' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']) . $public_path;
define('APP_URL', $url);

// Directorio raiz de la aplicación
$app_dir = dirname(__DIR__) . '/';
define('APP_DIR', $app_dir);

// Directorio para archivos publicos
$public_dir = dirname(__DIR__) . $public_path;
define('PUBLIC_DIR', $public_dir);

// Directorio para almacenar archivos cargados por la medio de la aplicación
$uploads_dir = $public_dir . 'uploads/';
define('UPLOADS_DIR', $uploads_dir);

require __DIR__ . '/../vendor/autoload.php';

// Se instancia la aplicación de Slim utilizando PHP-DI
$app = new class() extends \DI\Bridge\Slim\App {
    protected function configureContainer(\DI\ContainerBuilder $builder){
        $builder->addDefinitions([
            'settings.displayErrorDetails' => true, // FALSE en producción
        ]);

        $builder->addDefinitions(__DIR__ . '/dependencias.php');
    }
};

$container = $app->getContainer();

// Protección contra ataques CSRF
$app->add($container->get(Slim\Csrf\Guard::class));

// Middlewares globales
//$app->add('App\Middlewares\');

require __DIR__ . '/rutas/web.php';

return $app;