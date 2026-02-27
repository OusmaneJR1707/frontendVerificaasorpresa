const DETAIL_STORAGE_KEY = 'selectedSearchDetail';

function showDetailError(message) {
    const errorEl = document.getElementById('detail-error');
    if (!errorEl) {
        return;
    }

    errorEl.textContent = message;
    errorEl.classList.remove('d-none');
}

function appendField(container, label, value) {
    const dt = document.createElement('dt');
    dt.className = 'col-sm-3';
    dt.textContent = label;

    const dd = document.createElement('dd');
    dd.className = 'col-sm-9';
    dd.textContent = value == null ? '-' : String(value);

    container.appendChild(dt);
    container.appendChild(dd);
}

function normalizeTableName(tableName) {
    return String(tableName || '').trim().toLowerCase();
}

function renderDetail() {
    const expectedType = normalizeTableName(document.body.dataset.detailType);
    const fieldsContainer = document.getElementById('detail-fields');
    if (!fieldsContainer) {
        return;
    }

    const rawDetail = sessionStorage.getItem(DETAIL_STORAGE_KEY);
    if (!rawDetail) {
        showDetailError('Nessun dato disponibile. Torna alla tabella e seleziona un valore.');
        return;
    }

    let detail;
    try {
        detail = JSON.parse(rawDetail);
    } catch (error) {
        showDetailError('Dettaglio non valido. Torna alla tabella e riprova.');
        return;
    }

    const detailTable = normalizeTableName(detail.table);
    const row = detail.row;

    if (!detailTable || !row || typeof row !== 'object') {
        showDetailError('Risposta dettaglio non valida.');
        return;
    }

    if (expectedType && detailTable !== expectedType) {
        showDetailError('Il dettaglio ricevuto non corrisponde a questa pagina.');
        return;
    }

    fieldsContainer.innerHTML = '';

    if (detailTable === 'fornitori') {
        appendField(fieldsContainer, 'fid', row.fid);
        appendField(fieldsContainer, 'fnome', row.fnome);
        appendField(fieldsContainer, 'indirizzo', row.indirizzo);
        return;
    }

    if (detailTable === 'pezzi') {
        appendField(fieldsContainer, 'pid', row.pid);
        appendField(fieldsContainer, 'pnome', row.pnome);
        appendField(fieldsContainer, 'colore', row.colore);
        return;
    }

    if (detailTable === 'catalogo') {
        appendField(fieldsContainer, 'fid', row.fid);
        appendField(fieldsContainer, 'pid', row.pid);
        appendField(fieldsContainer, 'costo', row.costo);
        return;
    }

    showDetailError('Tabella non supportata per la visualizzazione dettagli.');
}

renderDetail();
