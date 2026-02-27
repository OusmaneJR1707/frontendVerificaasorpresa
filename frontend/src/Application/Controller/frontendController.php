<?php

declare(strict_types=1);

namespace App\Application\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class frontendController
{
    /**
     * Carica la homepage con l'elenco delle 10 query.
     */
    public function homepage(Request $request, Response $response): Response
    {
        // Costruiamo il percorso assoluto verso la cartella templates
        $path = __DIR__ . '\..\..\..\templates\index.html';
        
        if (!file_exists($path)) {
            $response->getBody()->write("Errore: File index.html non trovato in $path");
            return $response->withStatus(404);
        }

        $html = file_get_contents($path);
        $response->getBody()->write($html);
        return $response;
    }

    /**
     * Carica la pagina di dettaglio per una specifica query (1-10).
     */
    public function querypage(Request $request, Response $response, array $args): Response
    {
        // L'ID viene catturato dalla rotta {id:[0-9]+} definita in routes.php
        $queryId = $args['id'];

        $path = __DIR__ . '/../../../templates/query_view.html';

        if (!file_exists($path)) {
            $response->getBody()->write("Errore: File query_view.html non trovato.");
            return $response->withStatus(404);
        }

        $html = file_get_contents($path);
        
        // Opzionale: se non usi un motore di template (come Twig), 
        // puoi fare un semplice rimpiazzo di una stringa per passare l'ID al JS
        $html = str_replace('{{QUERY_ID}}', $queryId, $html);

        $response->getBody()->write($html);
        return $response;
    }
}