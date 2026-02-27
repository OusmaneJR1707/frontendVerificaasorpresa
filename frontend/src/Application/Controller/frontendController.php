<?php

declare(strict_types=1);

namespace App\Application\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class frontendController
{
    private function renderTemplate(Response $response, string $templateName, array $replacements = []): Response
    {
        $path = __DIR__ . '/../../../templates/' . $templateName;

        if (!file_exists($path)) {
            $response->getBody()->write("Errore: File {$templateName} non trovato in {$path}");
            return $response->withStatus(404);
        }

        $html = file_get_contents($path);

        foreach ($replacements as $placeholder => $value) {
            $html = str_replace($placeholder, (string) $value, $html);
        }

        $response->getBody()->write($html);
        return $response;
    }

    /**
     * Carica la homepage con l'elenco delle 10 query.
     */
    public function homepage(Request $request, Response $response): Response
    {
        return $this->renderTemplate($response, 'index.html');
    }

    /**
     * Carica la pagina di dettaglio per una specifica query (1-10).
     */
    public function querypage(Request $request, Response $response, array $args): Response
    {
        $queryId = $args['id'];

        return $this->renderTemplate($response, 'query_view.html', [
            '{{QUERY_ID}}' => $queryId,
        ]);
    }

    public function supplierpage(Request $request, Response $response): Response
    {
        return $this->renderTemplate($response, 'supplier_view.html');
    }

    public function productpage(Request $request, Response $response): Response
    {
        return $this->renderTemplate($response, 'product_view.html');
    }

    public function catalogpage(Request $request, Response $response): Response
    {
        return $this->renderTemplate($response, 'catalog_view.html');
    }
}