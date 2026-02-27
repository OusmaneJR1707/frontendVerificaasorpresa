const queryId = window.location.pathname.split('/').pop();

const urlParams = new URLSearchParams(window.location.search);
let currentPage = Math.max(1, Number(urlParams.get('page')) || 1);
let currentPageSize = urlParams.get('pageSize') === 'all'
    ? 'all'
    : Math.max(1, Number(urlParams.get('pageSize')) || 10);
let currentOrderBy = urlParams.get('orderBy') || '';
let currentOrderDir = (urlParams.get('orderDir') || 'asc').toLowerCase() === 'desc' ? 'desc' : 'asc';
let currentResults = [];
let currentTotalPages = 0;

function updateUrlAndFetch() {
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(currentPage));
    params.set('pageSize', String(currentPageSize));

    if (currentOrderBy) {
        params.set('orderBy', currentOrderBy);
        params.set('orderDir', currentOrderDir);
    } else {
        params.delete('orderBy');
        params.delete('orderDir');
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
    fetchQueryData();
}

function isAllResultsSelected() {
    return currentPageSize === 'all';
}

function detectColumns(results) {
    if (!Array.isArray(results) || results.length === 0) {
        return [];
    }
    return Object.keys(results[0]);
}

function setupSortControls(columns) {
    const sortColumnEl = document.getElementById('sort-column');
    const sortDirectionEl = document.getElementById('sort-direction');

    if (!sortColumnEl || !sortDirectionEl) {
        return;
    }

    sortColumnEl.innerHTML = '<option value="">Seleziona colonna</option>';

    columns.forEach((column) => {
        const option = document.createElement('option');
        option.value = column;
        option.textContent = column;
        sortColumnEl.appendChild(option);
    });

    if (currentOrderBy && columns.includes(currentOrderBy)) {
        sortColumnEl.value = currentOrderBy;
    } else {
        currentOrderBy = '';
        sortColumnEl.value = '';
    }

    sortDirectionEl.value = currentOrderDir;

    const onSortChange = () => {
        currentOrderBy = sortColumnEl.value;
        currentOrderDir = sortDirectionEl.value;
        currentPage = 1;
        updateUrlAndFetch();
    };

    sortColumnEl.onchange = onSortChange;
    sortDirectionEl.onchange = onSortChange;
}

function setupPageSizeControl() {
    const pageSizeEl = document.getElementById('page-size');
    if (!pageSizeEl) {
        return;
    }

    const availableSizes = Array.from(pageSizeEl.options).map((option) => option.value);
    const currentValue = String(currentPageSize);
    if (!availableSizes.includes(currentValue)) {
        currentPageSize = 10;
    }

    pageSizeEl.value = String(currentPageSize);
    pageSizeEl.onchange = () => {
        currentPageSize = pageSizeEl.value === 'all'
            ? 'all'
            : Math.max(1, Number(pageSizeEl.value) || 10);
        currentPage = 1;
        updateUrlAndFetch();
    };
}

async function fetchQueryData() {
    const params = new URLSearchParams({
        page: String(currentPage),
        pageSize: String(currentPageSize)
    });

    if (currentOrderBy) {
        params.set('orderBy', currentOrderBy);
        params.set('orderDir', currentOrderDir.toUpperCase());
    }

    const apiUrl = `https://redesigned-space-spoon-q774x7xvq4rqh5rq-8000.app.github.dev/${queryId}?${params.toString()}`;
    
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        const results = data.results || data;
        currentResults = Array.isArray(results) ? results : [];
        const pagination = data.pagination || {};
        currentTotalPages = Number(pagination.totalPages) || 0;
        currentPage = Number(pagination.page) || currentPage;
        if (!isAllResultsSelected()) {
            currentPageSize = Number(pagination.pageSize) || currentPageSize;
        }

        setupPageSizeControl();
        setupSortControls(detectColumns(currentResults));
        renderTable({ results: currentResults });
        renderPagination(currentTotalPages);
    } catch (e) {
        console.error("Errore durante il caricamento dei dati:", e);
        document.getElementById('error').innerText = "Errore nel caricamento dei dati.";
    }
}

function goToPage(newPage) {
    if (newPage < 1) {
        return;
    }
    if (currentTotalPages > 0 && newPage > currentTotalPages) {
        return;
    }

    currentPage = newPage;
    updateUrlAndFetch();
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

function renderPagination(totalPages) {
    const paginationEl = document.getElementById('pagination');
    if (!totalPages || totalPages <= 1) {
        paginationEl.innerHTML = '';
        paginationEl.style.display = 'none';
        return;
    }

    paginationEl.style.display = '';
    paginationEl.innerHTML = '';

    const createPageItem = (label, targetPage, disabled = false, active = false) => {
        const li = document.createElement('li');
        li.className = 'page-item';
        if (disabled) li.classList.add('disabled');
        if (active) li.classList.add('active');

        const a = document.createElement('a');
        a.className = 'page-link';
        a.href = '#';
        a.textContent = label;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            if (!disabled) {
                goToPage(targetPage);
            }
        });

        li.appendChild(a);
        paginationEl.appendChild(li);
    };

    createPageItem('Indietro', currentPage - 1, currentPage <= 1);

    for (let p = 1; p <= totalPages; p++) {
        createPageItem(String(p), p, false, p === currentPage);
    }

    createPageItem('Avanti', currentPage + 1, currentPage >= totalPages);
}

fetchQueryData();