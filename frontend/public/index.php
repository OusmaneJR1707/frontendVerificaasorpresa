<?php

declare(strict_types=1);

use App\Application\Controller\frontendController;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$controller = new frontendController();

$routes = require __DIR__ . '/../config/routes.php';
$routes($app, $controller);

$app->run();