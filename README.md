# Verifica a sorpresa - Slim 4

Applicazione Slim 4 organizzata in modo modulare per esporre le 10 interrogazioni SQL su:
- `Fornitori(fid, fnome, indirizzo)`
- `Pezzi(pid, pnome, colore)`
- `Catalogo(fid, pid, costo)`

## Struttura

- `public/index.php`: bootstrap applicazione
- `config/settings.php`: configurazione DB (opzionale per estensioni future)
- `config/routes.php`: definizione endpoint
- `src/Infrastructure/Database/PdoFactory.php`: factory PDO (pronta per uso futuro)
- `src/Application/Repository/ExerciseRepository.php`: SQL delle 10 query
- `src/Application/Controller/ExerciseController.php`: endpoint JSON

## Setup rapido

1. Installa dipendenze (se necessario):
   - `composer install`
2. Rigenera autoload dopo modifiche namespace:
   - `composer dump-autoload`
3. Avvia server:
   - `php -S localhost:8080 -t public`
   - se hai errore "could not find driver", usa `./start.sh` (forza `/usr/bin/php`)

## Configurazione con phpMyAdmin (MySQL/MariaDB)

1. In phpMyAdmin crea un database, ad esempio `verificaasorpresa`.
2. Importa il file database.sql
3. Prima di avviare PHP, imposta le variabili ambiente:
   - `export DB_DRIVER=mysql`
   - `export DB_HOST=127.0.0.1`
   - `export DB_PORT=3306`
   - `export DB_NAME=verificaasorpresa`
   - `export DB_USER=root`
   - `export DB_PASS=`
4. Avvia l'app:
   - `php -S localhost:8080 -t public`

Nota: phpMyAdmin è l'interfaccia web; il database usato dall'app è MySQL/MariaDB via PDO.

## Endpoint

- `GET /` (lista delle 10 query)
- `GET /{id}` con `id` da 1 a 10

### Paginazione e ordinamento

L'endpoint `GET /{id}` accetta parametri di query per paginare e ordinare i risultati e restituisce i metadati di paginazione. Se non passi nessun parametro, restituisce tutte le righe (nessuna paginazione).

Parametri (se almeno uno è presente, la paginazione si attiva con default):
- `page` (default `1`): numero di pagina, min 1
- `pageSize` (default `10`, max `200`): righe per pagina; usa `all` per ottenere tutte le righe
- `orderBy` (opzionale): colonna su cui ordinare (validata con whitelist per query)
- `orderDir` (default `ASC`): `ASC` o `DESC`

Risposta:
- `results`: array di righe della query
- `pagination`: `{ page, pageSize, total, totalPages }`

Esempi:
- `http://localhost:8080/5?page=2&pageSize=10&orderBy=fid&orderDir=DESC`
- `http://localhost:8080/1?page=1&pageSize=25`
- `http://localhost:8080/1` (tutte le righe, senza paginazione)

### Ricerca per colonna/valore

L'endpoint `GET /search?column=columnName&value=value` cerca una riga per colonna e valore in tutte le tabelle (Pezzi, Fornitori, Catalogo) e restituisce la prima riga trovata insieme al nome della tabella.

Parametri:
- `column` (obbligatorio): nome della colonna da cercare (validato contro whitelist)
- `value` (obbligatorio): valore della colonna

Risposte:
- `200`: `{ table, row }` - tabella trovata e la riga completa
- `404`: `{ error }` - nessun risultato trovato
- `400`: `{ error }` - parametri mancanti

Esempi:
- `http://localhost:8080/search?column=pnome&value=Vite`
- `http://localhost:8080/search?column=fnome&value=Acme`
- `http://localhost:8080/search?column=fid&value=1`