// 1. Estraiamo l'ID dall'URL (es: /5)
const queryId = window.location.pathname.split('/').pop();

// 2. Leggiamo page e limit dalla query string del browser (?page=2&limit=20)
const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get('page') || 1;
const limit = urlParams.get('limit') || 10;

async function fetchQueryData() {
    // Chiamata all'API locale che hai menzionato
    const apiUrl = `https://redesigned-space-spoon-q774x7xvq4rqh5rq-8000.app.github.dev/${queryId}?page=${page}&pageSize=${limit}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        renderTable(data); // Funzione che genera i <tr> di Bootstrap
        renderPagination(data.total_pages); // Se l'API restituisce il totale
    } catch (e) {
        console.error("Errore durante il caricamento dei dati:", e);
        document.getElementById('error').innerText = "Errore nel caricamento dei dati.";
    }
}

// 3. Funzione per navigare cambiando la query string senza ricaricare Slim
function goToPage(newPage) {
    window.location.search = `?page=${newPage}&limit=${limit}`;
}

// genera le righe della tabella a partire dai dati restituiti dall'API
function renderTable(data) {
    const results = data.results || data; // alcuni endpoint usano "results"
    const tableBody = document.getElementById('table-body');
    const tableHeader = document.getElementById('table-header');

    tableBody.innerHTML = '';
    tableHeader.innerHTML = '';

    if (!Array.isArray(results) || results.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="100%">Nessun risultato.</td></tr>';
        return;
    }

    // Intestazioni derivano dalle chiavi del primo oggetto
    const columns = Object.keys(results[0]);
    columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        tableHeader.appendChild(th);
    });

    // Corpo della tabella
    results.forEach(row => {
        const tr = document.createElement('tr');
        columns.forEach(col => {
            const td = document.createElement('td');
            td.textContent = row[col];
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

// costruisce i controlli di paginazione se l'API torna total_pages
function renderPagination(totalPages) {
    const paginationEl = document.getElementById('pagination');
    if (!totalPages || totalPages <= 1) {
        paginationEl.style.display = 'none';
        return;
    }
    paginationEl.innerHTML = '';
    for (let p = 1; p <= totalPages; p++) {
        const li = document.createElement('li');
        li.className = 'page-item' + (p == page ? ' active' : '');
        const a = document.createElement('a');
        a.className = 'page-link';
        a.href = '#';
        a.textContent = p;
        a.addEventListener('click', (e) => { e.preventDefault(); goToPage(p); });
        li.appendChild(a);
        paginationEl.appendChild(li);
    }
}

// avvia il caricamento automatico appena caricato lo script
fetchQueryData();