/* ═══════════════════════════════════════════════════════════════
   CasaUPNA · App Logic + Data
   Dati raccolti: maggio 2026
   ═══════════════════════════════════════════════════════════════ */

// ── COUNTDOWN ──────────────────────────────────────────────────
function updateCountdown() {
  const departure = new Date('2026-08-20T00:00:00');
  const now = new Date();
  const diff = Math.ceil((departure - now) / (1000 * 60 * 60 * 24));
  const el = document.querySelector('.stat-card:nth-child(2) .stat-number');
  if (el) el.textContent = diff > 0 ? diff : '0';
}
updateCountdown();



// ── SECTION NAVIGATION ─────────────────────────────────────────
function showSection(id) {
  document.querySelectorAll('.hero, .section').forEach(s => s.style.display = 'none');
  const target = document.getElementById(id);
  if (target) {
    target.style.display = id === 'hero' ? 'flex' : 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Update pill nav
  document.querySelectorAll('.pill-nav-btn').forEach((btn, i) => {
    const ids = ['hero', 'listings', 'updates', 'about'];
    btn.classList.toggle('active', ids[i] === id);
  });
}

// ── HOUSING DATA ────────────────────────────────────────────────
// Dati raccolti da: resa.es, camplus.es, amroestudiantes.es, homeand.co, livensaliving.com
// Aggiornato: 19 maggio 2026
const accommodations = [
  {
    id: 'resa-abedules',
    name: 'Resa Los Abedules',
    emoji: '🌳',
    gradient: 'linear-gradient(135deg, #0a2a0a 0%, #0d1f0d 100%)',
    address: 'Campus Arrosadía, Pamplona',
    distance: '0 min a piedi · Sul campus',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Residencia+Los+Abedules+Campus+Arrosadia+Pamplona&destination=Universidad+Publica+de+Navarra+Campus+Arrosadia+Pamplona',
    price: '€ 780',
    priceNum: 780,
    priceNote: '/mese · studio privato',
    type: ['top'],
    rating: 'green',
    ratingLabel: '✦ Consigliato',
    isNew: false,
    website: 'https://www.resa.es/es/residencias/pamplona/campus-upna',
    phone: '+34 948 16 92 00',
    services: [
      { icon: '🛏', label: 'Studio individuale' },
      { icon: '🚿', label: 'Bagno privato' },
      { icon: '🍳', label: 'Cucina privata' },
      { icon: '🏋️', label: 'Palestra UPNA' },
      { icon: '📚', label: 'Sale studio' },
      { icon: '🧺', label: 'Lavanderia' },
      { icon: '🔒', label: 'Sicurezza 24h' },
      { icon: '♨️', label: 'Riscaldamento incluso' }
    ],
    scores: [
      { label: 'Posizione (UPNA)', val: 100, cls: 'fill-green' },
      { label: 'Servizi inclusi', val: 90, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 72, cls: 'fill-amber' }
    ],
    verdict: 'green',
    verdictText: '✦ OTTIMA SCELTA · È l\'unica residenza direttamente sul campus UPNA (Arrosadía). Studio con cucina e bagno privati, accesso diretto agli impianti sportivi. Posizione imbattibile: zero tempo di trasporto. Prenota subito: i posti si esauriscono rapidamente.'
  },
  {
    id: 'camplus-soto',
    name: 'Camplus Soto House',
    emoji: '🏠',
    gradient: 'linear-gradient(135deg, #0a1a2a 0%, #0d1525 100%)',
    address: 'C/ Soto de Lezkairu, Pamplona',
    distance: '~10 min a piedi da UPNA',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Camplus+Soto+House+Pamplona&destination=Universidad+Publica+de+Navarra+Campus+Arrosadia+Pamplona',
    price: '€ 850',
    priceNum: 850,
    priceNote: '/mese · studio all-inclusive',
    type: ['top'],
    rating: 'green',
    ratingLabel: '✦ Consigliato',
    isNew: true,
    website: 'https://www.camplus.es/residencias/pamplona/soto-house',
    phone: null,
    services: [
      { icon: '🛏', label: 'Studio moderno' },
      { icon: '🚿', label: 'Bagno privato' },
      { icon: '🍳', label: 'Cucina privata' },
      { icon: '📺', label: 'Smart TV' },
      { icon: '❄️', label: 'Climatizzazione' },
      { icon: '🏋️', label: 'Palestra' },
      { icon: '🎬', label: 'Sala cinema' },
      { icon: '💻', label: 'Co-working' }
    ],
    scores: [
      { label: 'Posizione (UPNA)', val: 82, cls: 'fill-green' },
      { label: 'Servizi e comfort', val: 95, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 68, cls: 'fill-amber' }
    ],
    verdict: 'green',
    verdictText: '✦ MOLTO BUONA · Residenza moderna con studio completamente privato, Smart TV, climatizzazione, palestra e cinema. A 10 minuti a piedi dall\'UPNA. Prezzo leggermente superiore ma servizi di alto livello.'
  },
  {
    id: 'amro-pamplona',
    name: 'AMRO Pamplona',
    emoji: '🏢',
    gradient: 'linear-gradient(135deg, #1a0a2a 0%, #150d20 100%)',
    address: 'Travesía de Extremadura, Pamplona',
    distance: '~8 min a piedi da UPNA',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Amro+Estudiantes+Pamplona+Travesia+Extremadura&destination=Universidad+Publica+de+Navarra+Campus+Arrosadia+Pamplona',
    price: '€ 790',
    priceNum: 790,
    priceNote: '/mese · studio privato',
    type: ['top', 'budget'],
    rating: 'green',
    ratingLabel: '✦ Consigliato',
    isNew: false,
    website: 'https://www.amroestudiantes.es/pamplona',
    phone: null,
    services: [
      { icon: '🛏', label: 'Studio individuale' },
      { icon: '🚿', label: 'Bagno privato' },
      { icon: '🍳', label: 'Cucina privata' },
      { icon: '🧺', label: 'Lavanderia' },
      { icon: '💡', label: 'Utenze incluse' },
      { icon: '🔒', label: 'Sicurezza 24h' },
      { icon: '🌡️', label: 'Riscaldamento' }
    ],
    scores: [
      { label: 'Posizione (UPNA)', val: 86, cls: 'fill-green' },
      { label: 'Servizi inclusi', val: 80, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 82, cls: 'fill-green' }
    ],
    verdict: 'green',
    verdictText: '✦ BUONA SCELTA · Ottimo rapporto qualità/prezzo. Studio con bagno e cucina privati a 8 minuti dall\'UPNA a piedi. Prezzo all-inclusive competitivo. Valida alternativa se Resa Los Abedules è al completo.'
  },
  {
    id: 'homeandco',
    name: 'Home & Co Pamplona',
    emoji: '🏡',
    gradient: 'linear-gradient(135deg, #0a1a10 0%, #0d1f18 100%)',
    address: 'Zona Campus Arrosadía, Pamplona',
    distance: '~5 min a piedi da UPNA',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Home+and+Co+Pamplona+Arrosadia&destination=Universidad+Publica+de+Navarra+Campus+Arrosadia+Pamplona',
    price: '€ 820',
    priceNum: 820,
    priceNote: '/mese · studio / singola privata',
    type: ['top'],
    rating: 'amber',
    ratingLabel: '◎ Verifica cucina',
    isNew: true,
    website: 'https://www.homeand.co/pamplona',
    phone: null,
    services: [
      { icon: '🛏', label: 'Camera singola' },
      { icon: '🚿', label: 'Bagno privato' },
      { icon: '🍽️', label: 'Kitchenette (verifica)' },
      { icon: '🏋️', label: 'Palestra moderna' },
      { icon: '🎬', label: 'Sala cinema' },
      { icon: '💻', label: 'Co-working' },
      { icon: '🧺', label: 'Lavanderia' }
    ],
    scores: [
      { label: 'Posizione (UPNA)', val: 90, cls: 'fill-green' },
      { label: 'Servizi e comfort', val: 88, cls: 'fill-green' },
      { label: 'Cucina privata', val: 50, cls: 'fill-amber' }
    ],
    verdict: 'amber',
    verdictText: '⚠ DA VERIFICARE · Vicinissima all\'UPNA con strutture eccellenti. Attenzione: alcuni piani offrono kitchenette privata, altri cucina condivisa. Contatta per confermare la disponibilità di uno studio con cucina privata.'
  },
  {
    id: 'livensa-pamplona',
    name: 'Livensa Living Pamplona',
    emoji: '✨',
    gradient: 'linear-gradient(135deg, #1a1a0a 0%, #201f0d 100%)',
    address: 'C/ Iturrama, Pamplona',
    distance: '~20-25 min bus da UPNA',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Livensa+Living+Pamplona+Iturrama&destination=Universidad+Publica+de+Navarra+Campus+Arrosadia+Pamplona',
    price: '€ 750',
    priceNum: 750,
    priceNote: '/mese · studio completo',
    type: ['budget'],
    rating: 'amber',
    ratingLabel: '◎ Verifica distanza',
    isNew: false,
    website: 'https://www.livensaliving.com/en/properties/pamplona',
    phone: null,
    services: [
      { icon: '🛏', label: 'Studio individuale' },
      { icon: '🚿', label: 'Bagno privato' },
      { icon: '🍳', label: 'Cucina privata' },
      { icon: '❄️', label: 'Climatizzazione' },
      { icon: '🏋️', label: 'Palestra' },
      { icon: '🚌', label: 'Bus per UPNA' },
      { icon: '💡', label: 'Utenze incluse' }
    ],
    scores: [
      { label: 'Posizione (UPNA)', val: 55, cls: 'fill-amber' },
      { label: 'Servizi inclusi', val: 85, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 90, cls: 'fill-green' }
    ],
    verdict: 'amber',
    verdictText: '⚠ DISTANZA DA VALUTARE · Studio completo con tutti i servizi privati al prezzo più basso. Il punto debole è la zona Iturrama: 20-25 min di bus dall\'UPNA. Ottimo se il budget è prioritario rispetto alla prossimità.'
  },
  {
    id: 'stephouse',
    name: 'StepHouse Monjardin',
    emoji: '🪜',
    gradient: 'linear-gradient(135deg, #0a1520 0%, #0d1a28 100%)',
    address: 'Barrio Monjardin, Pamplona',
    distance: '~12 min a piedi da UPNA',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Barrio+Monjardin+Pamplona&destination=Universidad+Publica+de+Navarra+Campus+Arrosadia+Pamplona',
    price: '€ 760',
    priceNum: 760,
    priceNote: '/mese · studio privato',
    type: ['budget'],
    rating: 'green',
    ratingLabel: '✦ Consigliato',
    isNew: false,
    website: 'https://uniscopio.com/pamplona',
    phone: null,
    services: [
      { icon: '🛏', label: 'Studio uso privato' },
      { icon: '🚿', label: 'Bagno privato' },
      { icon: '🍳', label: 'Cucina privata' },
      { icon: '📺', label: 'Smart TV' },
      { icon: '❄️', label: 'Climatizzazione' },
      { icon: '💡', label: 'Utenze incluse' }
    ],
    scores: [
      { label: 'Posizione (UPNA)', val: 78, cls: 'fill-green' },
      { label: 'Servizi inclusi', val: 78, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 88, cls: 'fill-green' }
    ],
    verdict: 'green',
    verdictText: '✦ BUONA SCELTA ECONOMICA · Studio completo (bagno + cucina privati) a prezzo competitivo. Smart TV e climatizzazione inclusi. 12 minuti a piedi dall\'UPNA — percorso molto facile.'
  },
  {
    id: 'uniplaces',
    name: 'Uniplaces · Appartamenti Pamplona',
    emoji: '🔑',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #200d0d 100%)',
    address: 'Varie zone limitrofe UPNA',
    distance: 'Variabile · filtra per zona',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Campus+Arrosadia+UPNA+Pamplona',
    price: '€ 600–900',
    priceNum: 700,
    priceNote: '/mese · dipende dal contratto',
    type: ['budget'],
    rating: 'amber',
    ratingLabel: '◎ Piattaforma',
    isNew: false,
    website: 'https://www.uniplaces.com/accommodation/pamplona',
    phone: null,
    services: [
      { icon: '🛏', label: 'Studi / monolocali' },
      { icon: '🚿', label: 'Bagno privato (filtrabile)' },
      { icon: '🍳', label: 'Cucina privata' },
      { icon: '📍', label: 'Filtra per distanza' },
      { icon: '🔐', label: 'Pagamento sicuro' },
      { icon: '⭐', label: 'Recensioni verificate' }
    ],
    scores: [
      { label: 'Varietà offerte', val: 90, cls: 'fill-green' },
      { label: 'Flessibilità zona', val: 85, cls: 'fill-green' },
      { label: 'Garanzie', val: 65, cls: 'fill-amber' }
    ],
    verdict: 'amber',
    verdictText: '◎ PIATTAFORMA · Aggrega monolocali e studi privati a Pamplona. Filtra per "Arrosadía", bagno privato e prezzo. Più flessibilità rispetto alle residenze, meno servizi inclusi.'
  },
  {
    id: 'spotahome',
    name: 'Spotahome · Appartamenti Pamplona',
    emoji: '🏘',
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #0d0d20 100%)',
    address: 'Varie zone Pamplona',
    distance: 'Variabile · filtra per zona',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Campus+Arrosadia+UPNA+Pamplona',
    price: '€ 550–850',
    priceNum: 650,
    priceNote: '/mese · dipende dall\'offerta',
    type: ['budget'],
    rating: 'amber',
    ratingLabel: '◎ Piattaforma',
    isNew: false,
    website: 'https://www.spotahome.com/es/alquiler/pamplona/pisos-y-apartamentos/pamplona',
    phone: null,
    services: [
      { icon: '🛏', label: 'Studi / monolocali' },
      { icon: '🎥', label: 'Video tour 3D' },
      { icon: '🚿', label: 'Filtra bagno privato' },
      { icon: '🍳', label: 'Cucina inclusa' },
      { icon: '✅', label: 'Verificato Spotahome' },
      { icon: '📞', label: 'Supporto italiano' }
    ],
    scores: [
      { label: 'Varietà offerte', val: 88, cls: 'fill-green' },
      { label: 'Affidabilità verifiche', val: 82, cls: 'fill-green' },
      { label: 'Prezzo medio', val: 80, cls: 'fill-green' }
    ],
    verdict: 'amber',
    verdictText: '◎ PIATTAFORMA AFFIDABILE · Video tour virtuali verificati per ogni appartamento. Cerca "monolocale Pamplona Arrosadía". Interfaccia in italiano, prezzi spesso inferiori alle residenze gestite.'
  }
];

// ── RENDER CARDS ────────────────────────────────────────────────
function renderCards(data) {
  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';
  document.getElementById('totalListings').textContent = accommodations.length;
  document.getElementById('newToday').textContent = accommodations.filter(a => a.isNew).length;

  data.forEach(acc => {
    const card = document.createElement('div');
    card.className = 'housing-card';
    card.setAttribute('data-type', acc.type.join(' '));
    card.onclick = () => openModal(acc);

    const amenityList = acc.services.slice(0, 3).map(s =>
      `<span class="amenity-pill check">${s.icon} ${s.label}</span>`
    ).join('');

    card.innerHTML = `
      <div class="card-img-area" style="background:${acc.gradient}">
        <div class="card-emoji-bg">${acc.emoji}</div>
        <div class="card-img-gradient" style="background:linear-gradient(to bottom, transparent 40%, rgba(14,14,22,0.95) 100%)"></div>
      </div>
      <div class="card-score-badge ${acc.rating}">${acc.ratingLabel}</div>
      ${acc.isNew ? '<div class="card-new-badge">Nuovo</div>' : ''}
      <div class="card-body">
        <div class="card-name">${acc.name}</div>
        <div class="card-location">📍 ${acc.distance}</div>
        <div class="card-amenities">${amenityList}</div>
        <div class="card-footer">
          <div class="card-price">
            <span class="price-amount">${acc.price}</span>
            <span class="price-label">${acc.priceNote}</span>
          </div>
          <div class="card-actions">
            <a class="card-map-btn" href="${acc.mapUrl}" target="_blank" onclick="event.stopPropagation()" title="Vedi su Maps">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              Maps
            </a>
            <a class="card-link-btn" href="${acc.website}" target="_blank" onclick="event.stopPropagation()">
              Sito
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

renderCards(accommodations);

// ── FILTER ──────────────────────────────────────────────────────
function filterCards(type, btn) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');

  const filtered = type === 'all'    ? accommodations
                 : type === 'top'    ? accommodations.filter(a => a.rating === 'green')
                 : type === 'budget' ? [...accommodations].sort((a,b) => a.priceNum - b.priceNum).slice(0, 4)
                 : type === 'new'    ? accommodations.filter(a => a.isNew)
                 : accommodations;

  renderCards(filtered);
  showToast(filtered.length + ' risultati trovati');
}

// ── MODAL ───────────────────────────────────────────────────────
function openModal(acc) {
  const modal = document.getElementById('detailModal');
  const content = document.getElementById('modalContent');

  const serviceRows = acc.services.map(s =>
    `<div class="modal-service-item">${s.icon} <span>${s.label}</span></div>`
  ).join('');

  const scoreBars = acc.scores.map(s => `
    <div class="score-bar-wrap">
      <div class="score-bar-label">
        <span>${s.label}</span>
        <span>${s.val}/100</span>
      </div>
      <div class="score-bar-track">
        <div class="score-bar-fill ${s.cls}" style="width:${s.val}%"></div>
      </div>
    </div>
  `).join('');

  const phoneBtn = acc.phone
    ? `<a class="modal-btn-secondary" href="tel:${acc.phone}">📞 Chiama</a>`
    : '';

  content.innerHTML = `
    <div class="modal-title">${acc.name}</div>
    <div class="modal-location">📍 ${acc.address} · ${acc.distance}</div>

    <div class="modal-verdict ${acc.verdict}">${acc.verdictText}</div>

    <div class="modal-section-title">Posizione su mappa</div>
    <a class="modal-map-preview" href="${acc.mapUrl}" target="_blank">
      <div class="map-preview-inner">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
        <div>
          <div class="map-preview-addr">${acc.address}</div>
          <div class="map-preview-sub">${acc.distance} · Apri in Google Maps</div>
        </div>
        <svg class="map-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </a>

    <div class="modal-section-title">Punteggi obiettivi</div>
    ${scoreBars}

    <div class="modal-section-title">Servizi inclusi</div>
    <div class="modal-services">${serviceRows}</div>

    <div class="modal-section-title">Prezzo</div>
    <div style="font-size:28px;font-weight:800;letter-spacing:-1px;margin:8px 0">${acc.price} <span style="font-size:14px;font-weight:400;color:var(--text-secondary)">${acc.priceNote}</span></div>

    <div class="modal-cta">
      <a class="modal-btn-primary" href="${acc.website}" target="_blank">
        Visita sito ufficiale
      </a>
      ${phoneBtn}
    </div>
  `;

  modal.classList.add('open');
}

function closeModal(e) {
  if (e.target === document.getElementById('detailModal')) {
    document.getElementById('detailModal').classList.remove('open');
  }
}

// ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('detailModal').classList.remove('open');
});

// ── UPDATES SECTION ─────────────────────────────────────────────
const updates = [
  {
    icon: "green",
    iconClass: "green",
    title: "Resa Los Abedules - 20/05/2026",
    desc: "Resa Los Abedules - 20/05/2026 | Disponibile - verifica subito! | Prezzo stimato: 699 EUR/mese",
    time: "Oggi - 19:49",
    url: "https://www.resa.es/es/residencias/pamplona/campus-upna",
    urlLabel: "Vedi sito"
  },
  {
    icon: "green",
    iconClass: "green",
    title: "AMRO Pamplona - 20/05/2026",
    desc: "AMRO Pamplona - 20/05/2026 | Disponibile - verifica subito! | Prezzo stimato: 999 EUR/mese",
    time: "Oggi - 19:49",
    url: "https://www.amroestudiantes.es/pamplona",
    urlLabel: "Vedi sito"
  },
  {
    icon: "green",
    iconClass: "green",
    title: "Resa Los Abedules - 20/05/2026",
    desc: "Resa Los Abedules - 20/05/2026 | Disponibile - verifica subito! | Prezzo stimato: 699 EUR/mese",
    time: "Oggi - 19:49",
    url: "https://www.resa.es/es/residencias/pamplona/campus-upna",
    urlLabel: "Vedi sito"
  },
  {
    icon: "green",
    iconClass: "green",
    title: "AMRO Pamplona - 20/05/2026",
    desc: "AMRO Pamplona - 20/05/2026 | Disponibile - verifica subito! | Prezzo stimato: 999 EUR/mese",
    time: "Oggi - 19:49",
    url: "https://www.amroestudiantes.es/pamplona",
    urlLabel: "Vedi sito"
  }
];

function renderUpdates() {
  const list = document.getElementById('updatesList');
  list.innerHTML = updates.map(u => `
    <div class="update-item">
      <div class="update-icon ${u.iconClass}">${u.icon}</div>
      <div class="update-body">
        <div class="update-title">${u.title}</div>
        <div class="update-desc">${u.desc}</div>
        <a class="update-link" href="${u.url}" target="_blank">
          ${u.urlLabel} →
        </a>
      </div>
      <div class="update-time">${u.time}</div>
    </div>
  `).join('');
}
renderUpdates();

// ── NOTIFICATIONS ───────────────────────────────────────────────
function toggleNotifications() {
  const checked = document.getElementById('notifyToggle').checked;
  if (checked) {
    if ('Notification' in window) {
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          showToast('🔔 Notifiche attivate!');
          // Schedule daily reminder check
          scheduleDaily();
        } else {
          showToast('❌ Permesso notifiche negato');
          document.getElementById('notifyToggle').checked = false;
        }
      });
    } else {
      showToast('Il tuo browser non supporta le notifiche');
    }
  } else {
    showToast('🔕 Notifiche disattivate');
  }
}

function scheduleDaily() {
  // Fire a notification now as confirmation
  if (Notification.permission === 'granted') {
    new Notification('CasaUPNA 🏠', {
      body: '✅ Notifiche attivate! Riceverai aggiornamenti ogni mattina alle 9:00.',
      icon: '🏠'
    });
  }
}

// ── TOAST UTILITY ───────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── PILL NAV SYNC ────────────────────────────────────────────────
document.querySelectorAll('.pill-nav-btn').forEach((btn, i) => {
  const ids = ['hero', 'listings', 'updates', 'about'];
  btn.addEventListener('click', () => showSection(ids[i]));
});

// Init: show hero
showSection('hero');
