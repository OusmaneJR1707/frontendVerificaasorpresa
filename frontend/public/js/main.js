const API_BASE_URL = window.APP_API_BASE_URL;

function showError(message) {
    const errorEl = document.getElementById('home-error');
    const loadingEl = document.getElementById('home-loading');

    if (loadingEl) {
        loadingEl.classList.add('d-none');
    }

    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('d-none');
    }
}

function clearErrorAndLoading() {
    const errorEl = document.getElementById('home-error');
    const loadingEl = document.getElementById('home-loading');

    if (errorEl) {
        errorEl.classList.add('d-none');
        errorEl.textContent = '';
    }

    if (loadingEl) {
        loadingEl.classList.add('d-none');
    }
}

function createQueryCard(item) {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    const card = document.createElement('div');
    card.className = 'card shadow-sm h-100';

    const body = document.createElement('div');
    body.className = 'card-body d-flex flex-column';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = `Query #${item.id}`;

    const description = document.createElement('p');
    description.className = 'card-text';
    description.textContent = item.description;

    const link = document.createElement('a');
    link.className = 'btn btn-primary mt-auto';
    link.href = `/${item.id}`;
    link.textContent = 'Visualizza Risultati';

    body.appendChild(title);
    body.appendChild(description);
    body.appendChild(link);
    card.appendChild(body);
    col.appendChild(card);

    return col;
}

function isValidQueryItem(item) {
    return item
        && Number.isInteger(item.id)
        && item.id > 0
        && typeof item.description === 'string'
        && item.description.trim().length > 0;
}

async function loadQueries() {
    const container = document.getElementById('query-cards');

    if (!container) {
        return;
    }

    if (!API_BASE_URL) {
        showError('Configurazione API mancante. Controlla /js/config.js.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const queries = Array.isArray(data?.queries) ? data.queries : null;

        if (!queries) {
            throw new Error('Formato risposta non valido');
        }

        const validQueries = queries.filter(isValidQueryItem);
        if (validQueries.length === 0) {
            throw new Error('Nessuna query disponibile');
        }

        container.innerHTML = '';
        validQueries.forEach((item) => {
            container.appendChild(createQueryCard(item));
        });

        clearErrorAndLoading();
    } catch (error) {
        console.error('Errore nel caricamento elenco query:', error);
        showError('Impossibile caricare l’elenco delle query dall’API. Riprova più tardi.');
    }
}

loadQueries();
