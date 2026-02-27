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
        $params = $request->getQueryParams();
        $hasPaginationParams = array_key_exists('page', $params)
            || array_key_exists('pageSize', $params)
            || array_key_exists('orderBy', $params)
            || array_key_exists('orderDir', $params);

        if ($hasPaginationParams) {
            // Parametri di paginazione/ordinamento dal frontend (con default sensati).
            $page = isset($params['page']) ? (int) $params['page'] : 1;
            
            // Se pageSize è 'all', restituisce tutte le righe senza paginazione.
            if (isset($params['pageSize']) && strtolower((string) $params['pageSize']) === 'all') {
                $pageSize = null;
            } else {
                $pageSize = isset($params['pageSize']) ? (int) $params['pageSize'] : 10;
                
                // Limite massimo per evitare richieste troppo pesanti.
                if ($pageSize > 200) {
                    $pageSize = 200;
                }
            }
            
            $orderBy = isset($params['orderBy']) ? (string) $params['orderBy'] : null;
            $orderDir = isset($params['orderDir']) ? (string) $params['orderDir'] : 'ASC';
        } else {
            // Nessun parametro: restituisce tutto senza paginazione.
            $page = null;
            $pageSize = null;
            $orderBy = null;
            $orderDir = null;
        }

        try {
            $result = $this->repository->runQuery($queryId, $page, $pageSize, $orderBy, $orderDir);

            return $this->json($response, [
                'description' => $result['description'],
                'results' => $result['rows'],
                'pagination' => $result['pagination'],
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

    public function search(Request $request, Response $response): Response
    {
        $params = $request->getQueryParams();
        $column = isset($params['column']) ? (string) $params['column'] : null;
        $value = isset($params['value']) ? (string) $params['value'] : null;

        if (!$column || !$value) {
            return $this->json($response, [
                'error' => 'Parametri mancanti: column e value sono obbligatori',
            ], 400);
        }

        try {
            $result = $this->repository->searchByColumnValue($column, $value);

            if ($result === null) {
                return $this->json($response, [
                    'error' => 'Nessun risultato trovato',
                ], 404);
            }

            return $this->json($response, [
                'table' => $result['table'],
                'row' => $result['row'],
            ]);
        } catch (Throwable $exception) {
            return $this->json($response, [
                'error' => 'Errore durante la ricerca',
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