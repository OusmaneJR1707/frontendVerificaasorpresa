<?php

declare(strict_types=1);

use App\Application\Controller\ExerciseController;
use Slim\App;

return function (App $app, ExerciseController $controller): void {
    $app->get('/', [$controller, 'listQueries']);
    $app->get('/search', [$controller, 'search']);
    $app->get('/{id:[0-9]+}', [$controller, 'runQuery']);
};
