<?php

declare(strict_types=1);

namespace App\Application\Controller;

use App\Application\Repository\ExerciseRepository;
use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Throwable;

final class ExerciseController
{
    public function __construct(private ExerciseRepository $repository)
    {
    }

    public function health(Request $request, Response $response): Response
    {
        return $this->json($response, [
            'status' => 'ok',
        ]);
    }

    public function listQueries(Request $request, Response $response): Response
    {
        return $this->json($response, [
            'queries' => $this->repository->listQueries(),
        ]);
    }

    public function runQuery(Request $request, Response $response, array $args): Response
    {
        $queryId = (int) ($args['id'] ?? 0);

        try {
            $result = $this->repository->runQuery($queryId);

            return $this->json($response, [
                'results' => $result['rows'],
            ]);
        } catch (InvalidArgumentException $exception) {
            return $this->json($response, [
                'error' => $exception->getMessage(),
            ], 400);
        } catch (Throwable $exception) {
            return $this->json($response, [
                'error' => 'Errore durante l\'esecuzione query',
                'details' => $exception->getMessage(),
            ], 500);
        }
    }

    /** @param array<string,mixed> $data */
    private function json(Response $response, array $data, int $statusCode = 200): Response
    {
        $payload = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        $response->getBody()->write((string) $payload);

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($statusCode);
    }
}
