<?php

declare(strict_types=1);

use App\Application\Controller\ExerciseController;
use App\Application\Repository\ExerciseRepository;
use App\Infrastructure\Database\PdoFactory;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$settings = require __DIR__ . '/../config/settings.php';

$pdo = (new PdoFactory($settings['db']))->create();
$repository = new ExerciseRepository($pdo);
$controller = new ExerciseController($repository);

$app = AppFactory::create();

$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

$app->options('/{routes:.+}', function ($request, $response) {
	return $response;
});

$app->add(function ($request, $handler) {
	$response = $handler->handle($request);

	return $response
		->withHeader('Access-Control-Allow-Origin', '*')
		->withHeader('Vary', 'Origin')
		->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
		->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
});

$routes = require __DIR__ . '/../config/routes.php';
$routes($app, $controller);

$app->run();