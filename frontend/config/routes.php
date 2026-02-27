<?php

declare(strict_types=1);

use App\Application\Controller\frontendController;
use Slim\App;

return function (App $app, frontendController $controller): void {
    $app->get('/', [$controller, 'homepage']);
    $app->get('/fornitore', [$controller, 'supplierpage']);
    $app->get('/pezzo', [$controller, 'productpage']);
    $app->get('/catalogo', [$controller, 'catalogpage']);
    $app->get('/{id:[0-9]+}', [$controller, 'querypage']);
};