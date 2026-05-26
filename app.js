/* ═══════════════════════════════════════════════════════════════
   CasaUPNA · App Logic + Database alloggi
   Dati raccolti: maggio 2026 · UPNA Campus Arrosadía, Pamplona
   ═══════════════════════════════════════════════════════════════ */

// ── COUNTDOWN ──────────────────────────────────────────────────
function updateCountdown() {
  const departure = new Date('2026-08-20T00:00:00');
  const now = new Date();
  const diff = Math.ceil((departure - now) / (1000 * 60 * 60 * 24));
  const el = document.getElementById('daysLeft');
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
  document.querySelectorAll('.pill-nav-btn').forEach((btn, i) => {
    const ids = ['hero', 'listings', 'guide', 'about'];
    btn.classList.toggle('active', ids[i] === id);
  });
}

// ── HOUSING DATABASE ────────────────────────────────────────────
// Fonti: resa.es · camplus.es · amroestudiantes.es · homeandcoliving.com
//        livensaliving.com · idealista.com · housinganywhere.com
//        spotahome.com · uniplaces.com · erasmusu.com · unavarra.es
//        unido residencias · belagua.es · residencialarraona.com
const accommodations = [

  // ══ SUL CAMPUS / VICINISSIME (0–10 min) ══════════════════════

  {
    id: 'resa-abedules',
    name: 'Resa Los Abedules',
    emoji: '🌳',
    category: 'Residenza universitaria',
    gradient: 'linear-gradient(135deg, #0a2a0a 0%, #0d1f0d 100%)',
    address: 'Campus Arrosadía, Pamplona',
    distance: '0 min · Direttamente sul campus UPNA',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.7969,-1.6323&travelmode=walking',
    price: 'da € 463',
    priceNum: 463,
    priceNote: '/mese · studio privato',
    type: ['top', 'campus'],
    rating: 'green',
    ratingLabel: '✦ N°1 Consigliato',
    website: 'https://www.resa.es/es/residencias/pamplona/campus-upna',
    phone: '+34 948 16 92 00',
    availability: 'Prenotazioni aperte per 2026–27',
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
      { label: 'Vicinanza UPNA', val: 100, cls: 'fill-green' },
      { label: 'Servizi inclusi', val: 90, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 80, cls: 'fill-green' }
    ],
    verdict: 'green',
    verdictText: '✦ SCELTA N°1 ASSOLUTA · L\'unica residenza direttamente sul campus UPNA (Arrosadía). Studio completo con cucina e bagno privati — esci di casa e sei già all\'UPNA. Prezzi da €463/mese, tra i più bassi delle residenze gestite. I posti si esauriscono da ottobre: prenota appena aprono le iscrizioni 2026-27.'
  },

  {
    id: 'homeandco',
    name: 'Home & Co Pamplona',
    emoji: '🏡',
    category: 'Residenza universitaria',
    gradient: 'linear-gradient(135deg, #0a1a10 0%, #0d1f18 100%)',
    address: 'C/ Tajonar s/n, Campus Arrosadía, Pamplona',
    distance: '~3 min a piedi · Accanto all\'UPNA',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.7984,-1.6308&travelmode=walking',
    price: 'da € 750',
    priceNum: 750,
    priceNote: '/mese · studio/singola',
    type: ['top', 'campus'],
    rating: 'green',
    ratingLabel: '✦ Consigliato',
    website: 'https://homeandcoliving.com/es/pamplona/',
    phone: null,
    availability: 'Verifica disponibilità 2026–27',
    services: [
      { icon: '🛏', label: 'Studio/camera singola' },
      { icon: '🚿', label: 'Bagno privato' },
      { icon: '🍳', label: 'Cucina privata (verifica tipo)' },
      { icon: '🏋️', label: 'Palestra moderna' },
      { icon: '🎬', label: 'Sala cinema' },
      { icon: '💻', label: 'Co-working' },
      { icon: '🧺', label: 'Lavanderia' },
      { icon: '🔒', label: 'Sicurezza 24h' }
    ],
    scores: [
      { label: 'Vicinanza UPNA', val: 97, cls: 'fill-green' },
      { label: 'Servizi e comfort', val: 93, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 71, cls: 'fill-amber' }
    ],
    verdict: 'green',
    verdictText: '✦ OTTIMA · Residenza nuovissima a soli 3 minuti dall\'UPNA. Strutture di alto livello: cinema, palestra, co-working. Importante: verifica che il tipo stanza prenotato includa cucina privata — alcuni piani hanno cucina comune. Chiedi esplicitamente "estudio con cocina privada".'
  },

  {
    id: 'camplus-soto',
    name: 'Camplus Soto House',
    emoji: '🏠',
    category: 'Studentato privato',
    gradient: 'linear-gradient(135deg, #0a1a2a 0%, #0d1525 100%)',
    address: 'C/ Soto de Lezkairu, Pamplona',
    distance: '~8–10 min a piedi · Zona Arrosadía',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.7969,-1.6323&travelmode=walking',
    price: '€ 800–950',
    priceNum: 850,
    priceNote: '/mese · studio all-inclusive',
    type: ['top', 'campus'],
    rating: 'green',
    ratingLabel: '✦ Consigliato',
    website: 'https://www.camplus.es/residencias/pamplona/soto-house',
    phone: null,
    availability: 'Prenotazioni aperte per 2026–27',
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
      { label: 'Vicinanza UPNA', val: 83, cls: 'fill-green' },
      { label: 'Servizi e comfort', val: 96, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 64, cls: 'fill-amber' }
    ],
    verdict: 'green',
    verdictText: '✦ MOLTO BUONA · Studio completamente privato con Smart TV, climatizzazione, palestra e cinema. 8-10 minuti a piedi dall\'UPNA lungo la stessa strada. Prezzo superiore alla media ma servizi di livello premium. Gestione affidabile del gruppo Camplus (presente in tutta Spagna).'
  },

  {
    id: 'amro-pamplona',
    name: 'AMRO Pamplona',
    emoji: '🏢',
    category: 'Residenza universitaria',
    gradient: 'linear-gradient(135deg, #1a0a2a 0%, #150d20 100%)',
    address: 'Travesía de Extremadura, Pamplona',
    distance: '~8 min a piedi · Zona Arrosadía',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.7969,-1.6323&travelmode=walking',
    price: 'da € 720',
    priceNum: 720,
    priceNote: '/mese · studio privato',
    type: ['top', 'campus', 'budget'],
    rating: 'green',
    ratingLabel: '✦ Consigliato',
    website: 'https://www.amroestudiantes.es/residencias/pamplona/',
    phone: null,
    availability: 'Verifica disponibilità 2026–27',
    services: [
      { icon: '🛏', label: 'Studio individuale' },
      { icon: '🚿', label: 'Bagno privato' },
      { icon: '🍳', label: 'Cucina privata' },
      { icon: '🧺', label: 'Lavanderia' },
      { icon: '💡', label: 'Utenze incluse' },
      { icon: '🔒', label: 'Sicurezza 24h' },
      { icon: '🌡️', label: 'Riscaldamento' },
      { icon: '🎓', label: 'Sale studio' }
    ],
    scores: [
      { label: 'Vicinanza UPNA', val: 86, cls: 'fill-green' },
      { label: 'Servizi inclusi', val: 83, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 86, cls: 'fill-green' }
    ],
    verdict: 'green',
    verdictText: '✦ BUONA SCELTA · Ottimo rapporto qualità/prezzo. Studio con bagno e cucina privati a 8 min dall\'UPNA. Prezzo all-inclusive competitivo, struttura moderna dedicata a studenti. Molto apprezzata dagli Erasmus per l\'atmosfera internazionale. Seconda alternativa se Resa è al completo.'
  },

  // ══ VICINE (10–15 min a piedi) ═══════════════════════════════

  {
    id: 'stephouse',
    name: 'StepHouse Monjardin',
    emoji: '🪜',
    category: 'Student housing',
    gradient: 'linear-gradient(135deg, #0a1520 0%, #0d1a28 100%)',
    address: 'Barrio Monjardin, Pamplona',
    distance: '~12 min a piedi · Zona Arrosadía',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.7969,-1.6323&travelmode=walking',
    price: '€ 700–800',
    priceNum: 750,
    priceNote: '/mese · studio privato',
    type: ['campus', 'budget'],
    rating: 'green',
    ratingLabel: '✦ Consigliato',
    website: 'https://uniscopio.com/pamplona',
    phone: null,
    availability: 'Verifica su Uniscopio',
    services: [
      { icon: '🛏', label: 'Studio uso privato' },
      { icon: '🚿', label: 'Bagno privato' },
      { icon: '🍳', label: 'Cucina privata' },
      { icon: '📺', label: 'Smart TV' },
      { icon: '❄️', label: 'Climatizzazione' },
      { icon: '💡', label: 'Utenze incluse' },
      { icon: '🌐', label: 'WiFi incluso' }
    ],
    scores: [
      { label: 'Vicinanza UPNA', val: 78, cls: 'fill-green' },
      { label: 'Servizi inclusi', val: 80, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 89, cls: 'fill-green' }
    ],
    verdict: 'green',
    verdictText: '✦ BUONA SCELTA ECONOMICA · Studio completo (bagno + cucina privati) a prezzo contenuto. Smart TV e climatizzazione inclusi. 12 min a piedi dall\'UPNA su percorso pianeggiante. Ideale per chi vuole privacy e budget contenuto senza rinunciare alla vicinanza al campus.'
  },

  {
    id: 'residencia-unido',
    name: 'Residencia UNIDO Pamplona',
    emoji: '🏫',
    category: 'Residenza universitaria',
    gradient: 'linear-gradient(135deg, #1a1020 0%, #1f1530 100%)',
    address: 'C/ Tajonar (zona Arrosadía), Pamplona',
    distance: '~12–15 min a piedi · Zona campus',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.7969,-1.6323&travelmode=walking',
    price: '€ 650–800',
    priceNum: 700,
    priceNote: '/mese · varie tipologie',
    type: ['campus'],
    rating: 'amber',
    ratingLabel: '◎ Verifica tipologia',
    website: 'https://www.residenciaunido.com/',
    phone: null,
    availability: 'Contattare direttamente',
    services: [
      { icon: '🛏', label: 'Camera singola' },
      { icon: '🚿', label: 'Bagno (verifica tipo)' },
      { icon: '🍽️', label: 'Mensa disponibile' },
      { icon: '📚', label: 'Sale studio' },
      { icon: '🧺', label: 'Lavanderia' },
      { icon: '🌐', label: 'WiFi incluso' },
      { icon: '🔒', label: 'Portineria' }
    ],
    scores: [
      { label: 'Vicinanza UPNA', val: 72, cls: 'fill-green' },
      { label: 'Servizi inclusi', val: 75, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 78, cls: 'fill-green' }
    ],
    verdict: 'amber',
    verdictText: '⚠ DA VERIFICARE · Residenza nella zona Arrosadía, vicina all\'UPNA. Verifica disponibilità di stanze con bagno e cucina privati — la configurazione varia per piano e tipo. Contattare direttamente indicando esigenza di "estudio con baño y cocina privados".'
  },

  {
    id: 'pisos-arrosadia',
    name: 'Appartamenti privati · Arrosadía',
    emoji: '🏘',
    category: 'Appartamenti privati',
    gradient: 'linear-gradient(135deg, #101a0a 0%, #152010 100%)',
    address: 'Barrio Arrosadía, Pamplona',
    distance: '5–15 min a piedi · Zona campus UPNA',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.7969,-1.6323&travelmode=walking',
    price: '€ 350–600',
    priceNum: 480,
    priceNote: '/mese · stanza in piso compartido',
    type: ['campus', 'budget'],
    rating: 'amber',
    ratingLabel: '◎ Piattaforme locali',
    website: 'https://www.idealista.com/alquiler-habitaciones/pamplona-iruña/arrosadia/',
    phone: null,
    availability: 'Annunci aggiornati quotidianamente',
    services: [
      { icon: '🔍', label: 'Filtra zona Arrosadía' },
      { icon: '🛏', label: 'Stanze singole in piso' },
      { icon: '🚿', label: 'Bagno (privato/condiviso)' },
      { icon: '🍳', label: 'Cucina condivisa o privata' },
      { icon: '🤝', label: 'Privati e agenzie' },
      { icon: '📞', label: 'Contatto diretto' }
    ],
    scores: [
      { label: 'Vicinanza UPNA', val: 88, cls: 'fill-green' },
      { label: 'Prezzo più basso', val: 96, cls: 'fill-green' },
      { label: 'Garanzie e servizi', val: 42, cls: 'fill-amber' }
    ],
    verdict: 'amber',
    verdictText: '⚠ PREZZI PIÙ BASSI · Cercare su Idealista nella zona Arrosadía porta ai prezzi più competitivi della città — stanze da €350/mese. Richiede contratto diretto con proprietario privato, meno servizi inclusi rispetto alle residenze. Specifica sempre "baño privado" nel filtraggio.'
  },

  // ══ DISTANZA MODERATA (15–25 min bus) ════════════════════════

  {
    id: 'livensa-pamplona',
    name: 'Livensa Living Pamplona',
    emoji: '✨',
    category: 'Studentato privato',
    gradient: 'linear-gradient(135deg, #1a1a0a 0%, #201f0d 100%)',
    address: 'Zona Iturrama, Pamplona',
    distance: '~20–25 min bus · Linea 14',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.8097,-1.6614&travelmode=transit',
    price: 'da € 680',
    priceNum: 680,
    priceNote: '/mese · studio completo',
    type: ['budget'],
    rating: 'amber',
    ratingLabel: '◎ Distanza elevata',
    website: 'https://www.livensaliving.com/en/properties/pamplona',
    phone: null,
    availability: 'Verifica disponibilità 2026–27',
    services: [
      { icon: '🛏', label: 'Studio individuale' },
      { icon: '🚿', label: 'Bagno privato' },
      { icon: '🍳', label: 'Cucina privata' },
      { icon: '❄️', label: 'Climatizzazione' },
      { icon: '🏋️', label: 'Palestra' },
      { icon: '🚌', label: 'Bus linea 14 per UPNA' },
      { icon: '💡', label: 'Utenze incluse' },
      { icon: '🐾', label: 'Pet friendly' }
    ],
    scores: [
      { label: 'Vicinanza UPNA', val: 50, cls: 'fill-amber' },
      { label: 'Servizi inclusi', val: 89, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 91, cls: 'fill-green' }
    ],
    verdict: 'amber',
    verdictText: '⚠ DISTANZA DA VALUTARE · Studio completo con tutti i servizi privati, tra i prezzi più bassi per una struttura gestita. Punto debole: zona Iturrama, 20-25 min di bus (linea 14) per arrivare all\'UPNA. Ottima scelta se il budget è prioritario rispetto alla prossimità al campus.'
  },

  {
    id: 'camplus-lacampana',
    name: 'Camplus La Campana',
    emoji: '🔔',
    category: 'Studentato privato',
    gradient: 'linear-gradient(135deg, #201010 0%, #2a1515 100%)',
    address: 'Av. Sancho el Fuerte, centro Pamplona',
    distance: '~18–20 min bus · Linee 9/14',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.8167,-1.6444&travelmode=transit',
    price: '€ 820–980',
    priceNum: 880,
    priceNote: '/mese · studio all-inclusive',
    type: ['top'],
    rating: 'amber',
    ratingLabel: '◎ Distanza moderata',
    website: 'https://www.camplus.es/residencias/pamplona/la-campana',
    phone: null,
    availability: 'Prenotazioni aperte per 2026–27',
    services: [
      { icon: '🛏', label: 'Studio privato' },
      { icon: '🚿', label: 'Bagno privato' },
      { icon: '🍳', label: 'Cucina privata' },
      { icon: '🏋️', label: 'Palestra' },
      { icon: '💻', label: 'Co-working' },
      { icon: '🚌', label: 'Bus per UPNA' },
      { icon: '🎮', label: 'Sala gaming/ricreazione' },
      { icon: '🌐', label: 'WiFi ultra-veloce' }
    ],
    scores: [
      { label: 'Vicinanza UPNA', val: 57, cls: 'fill-amber' },
      { label: 'Servizi e comfort', val: 95, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 60, cls: 'fill-amber' }
    ],
    verdict: 'amber',
    verdictText: '⚠ DISTANZA MODERATA · Struttura premium in centro Pamplona con studio completamente privato. Servizi di lusso (cinema, gaming, co-working). Il punto debole: 18-20 min di bus per l\'UPNA. Ideale se vuoi vivere nel cuore di Pamplona e non ti pesa il tragitto in bus.'
  },

  // ══ COLLEGI UNIVERSITARI ══════════════════════════════════════

  {
    id: 'colegio-belagua',
    name: 'Colegio Mayor Belagua (UNAV)',
    emoji: '🎓',
    category: 'Collegio universitario',
    gradient: 'linear-gradient(135deg, #20100a 0%, #2a180d 100%)',
    address: 'Campus Universidad de Navarra, Pamplona',
    distance: '~20 min bus · Da campus UNAV a UPNA',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.7958,-1.6688&travelmode=transit',
    price: '€ 900–1.200',
    priceNum: 1000,
    priceNote: '/mese · pensione completa inclusa',
    type: ['top'],
    rating: 'amber',
    ratingLabel: '◎ Verifica accesso Erasmus',
    website: 'https://www.belagua.es/',
    phone: '+34 948 25 60 00',
    availability: 'Priorità studenti UNAV — posti limitati UPNA',
    services: [
      { icon: '🛏', label: 'Camera singola' },
      { icon: '🚿', label: 'Bagno privato' },
      { icon: '🍽️', label: 'Pensione completa' },
      { icon: '📚', label: 'Sale studio attrezzate' },
      { icon: '🏋️', label: 'Palestra e campi sport' },
      { icon: '🌐', label: 'WiFi incluso' },
      { icon: '🔒', label: 'Sicurezza 24h' },
      { icon: '🌳', label: 'Parco privato' }
    ],
    scores: [
      { label: 'Vicinanza UPNA', val: 52, cls: 'fill-amber' },
      { label: 'Servizi totali', val: 97, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 55, cls: 'fill-amber' }
    ],
    verdict: 'amber',
    verdictText: '⚠ VERIFICA AMMISSIONE · Colegio Mayor dell\'Università di Navarra (privata). Struttura di altissimo livello con pensione completa. I posti per studenti UPNA/Erasmus sono limitati — contattare direttamente. Prezzo elevato ma include tutti i pasti. Ottimo per chi cerca un ambiente molto strutturato.'
  },

  {
    id: 'residencia-larraona',
    name: 'Residencia Larraona',
    emoji: '⛪',
    category: 'Collegio universitario',
    gradient: 'linear-gradient(135deg, #10200a 0%, #182a10 100%)',
    address: 'C/ Padre Moret 3, Pamplona',
    distance: '~15 min bus · Linea 9',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.8111,-1.6497&travelmode=transit',
    price: '€ 700–950',
    priceNum: 800,
    priceNote: '/mese · varie tipologie',
    type: [],
    rating: 'amber',
    ratingLabel: '◎ Collegio storico',
    website: 'https://www.residencialarraona.com/',
    phone: '+34 948 22 68 00',
    availability: 'Contattare direttamente',
    services: [
      { icon: '🛏', label: 'Camera singola' },
      { icon: '🚿', label: 'Bagno (verifica tipo)' },
      { icon: '🍽️', label: 'Servizio mensa' },
      { icon: '📚', label: 'Sale studio' },
      { icon: '🧺', label: 'Lavanderia' },
      { icon: '🌐', label: 'WiFi incluso' },
      { icon: '🎭', label: 'Attività culturali' }
    ],
    scores: [
      { label: 'Vicinanza UPNA', val: 60, cls: 'fill-amber' },
      { label: 'Servizi', val: 73, cls: 'fill-green' },
      { label: 'Rapporto qualità/prezzo', val: 72, cls: 'fill-amber' }
    ],
    verdict: 'amber',
    verdictText: '⚠ COLLEGIO TRADIZIONALE · Residenza storica nel centro di Pamplona, collegata con bus linea 9 all\'UPNA. Atmosfera di collegio universitario tradizionale. Verifica la disponibilità di stanze con bagno privato e se cucina privata è possibile — tipicamente è cucina comune. Contattare per condizioni Erasmus.'
  },

  // ══ PIATTAFORME DI RICERCA ════════════════════════════════════

  {
    id: 'upna-bolsa',
    name: 'Bolsa de Alojamiento UPNA',
    emoji: '🎓',
    category: 'Ufficio ufficiale UPNA',
    gradient: 'linear-gradient(135deg, #001520 0%, #002030 100%)',
    address: 'Campus Arrosadía, Edificio El Sario, Pamplona',
    distance: 'Servizio digitale + sportello in campus',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.7969,-1.6323&travelmode=walking',
    price: 'Variabile',
    priceNum: 0,
    priceNote: '· Lista ufficiale verificata',
    type: ['top', 'campus', 'platform'],
    rating: 'green',
    ratingLabel: '✦ Ufficiale UPNA',
    website: 'https://www.unavarra.es/vida-universitaria/servicios/alojamiento-y-residencias',
    phone: '+34 948 16 96 00',
    availability: 'Aggiornato ogni semestre',
    services: [
      { icon: '🎓', label: 'Lista ufficiale UPNA' },
      { icon: '🏠', label: 'Residenze convenzionate' },
      { icon: '🤝', label: 'Privati verificati' },
      { icon: '📧', label: 'Supporto ufficio Erasmus' },
      { icon: '🌐', label: 'Info studenti internaz.' },
      { icon: '📋', label: 'Guida alloggi Navarra' }
    ],
    scores: [
      { label: 'Affidabilità', val: 100, cls: 'fill-green' },
      { label: 'Varietà offerte', val: 68, cls: 'fill-amber' },
      { label: 'Supporto Erasmus', val: 95, cls: 'fill-green' }
    ],
    verdict: 'green',
    verdictText: '✦ PUNTO DI PARTENZA OBBLIGATORIO · La bolsa de alojamiento ufficiale dell\'UPNA raccoglie residenze convenzionate e privati verificati. Contatta anche l\'Ufficio Erasmus UPNA (Oficina de Relaciones Internacionales) — ti fornisce supporto diretto e lista aggiornata per l\'anno 2026-27. Inizia sempre da qui.'
  },

  {
    id: 'idealista-arrosadia',
    name: 'Idealista · Arrosadía/UPNA',
    emoji: '🔍',
    category: 'Piattaforma di ricerca',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #200d0d 100%)',
    address: 'Barrio Arrosadía, Pamplona',
    distance: 'Filtra per zona campus UPNA',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.7969,-1.6323&travelmode=walking',
    price: '€ 300–600',
    priceNum: 450,
    priceNote: '/mese · stanza in appartamento',
    type: ['budget', 'platform'],
    rating: 'amber',
    ratingLabel: '◎ Piattaforma n°1 Spagna',
    website: 'https://www.idealista.com/alquiler-habitaciones/pamplona-iruña/arrosadia/',
    phone: null,
    availability: 'Annunci aggiornati ogni giorno',
    services: [
      { icon: '🔍', label: 'Filtra zona Arrosadía' },
      { icon: '🛏', label: 'Stanze/studi/monolocali' },
      { icon: '🚿', label: 'Filtra bagno privato' },
      { icon: '💰', label: 'Prezzi più bassi del mercato' },
      { icon: '🤝', label: 'Privati e agenzie' },
      { icon: '📍', label: '300+ annunci Pamplona' }
    ],
    scores: [
      { label: 'Varietà annunci', val: 96, cls: 'fill-green' },
      { label: 'Prezzi competitivi', val: 93, cls: 'fill-green' },
      { label: 'Garanzie', val: 52, cls: 'fill-amber' }
    ],
    verdict: 'amber',
    verdictText: '◎ PORTALE N°1 SPAGNA · Il link porta direttamente agli annunci nella zona Arrosadía (campus UPNA). Prezzi significativamente più bassi rispetto alle residenze gestite — stanze da €300/mese. Richiede contratto diretto con proprietario privato. Usa i filtri: "amueblado", "baño privado", zona "Arrosadía".'
  },

  {
    id: 'housingAnywhere',
    name: 'HousingAnywhere · Pamplona',
    emoji: '🌍',
    category: 'Piattaforma Erasmus',
    gradient: 'linear-gradient(135deg, #0a100a 0%, #0d180d 100%)',
    address: 'Varie zone Pamplona',
    distance: 'Filtra per distanza UPNA',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.7969,-1.6323&travelmode=walking',
    price: '€ 450–800',
    priceNum: 600,
    priceNote: '/mese · varie tipologie',
    type: ['budget', 'platform'],
    rating: 'amber',
    ratingLabel: '◎ Ideale per Erasmus',
    website: 'https://housinganywhere.com/es/Pamplona--Spain/rooms-for-rent',
    phone: null,
    availability: 'Annunci disponibili ora',
    services: [
      { icon: '🌍', label: 'Piattaforma internazionale' },
      { icon: '🛏', label: 'Studi/stanze/appartamenti' },
      { icon: '📅', label: 'Contratti breve termine' },
      { icon: '💬', label: 'Chat con proprietari' },
      { icon: '🔐', label: 'Pagamento sicuro' },
      { icon: '🇮🇹', label: 'Interfaccia multilingue' }
    ],
    scores: [
      { label: 'Compatibilità Erasmus', val: 96, cls: 'fill-green' },
      { label: 'Varietà offerte', val: 79, cls: 'fill-green' },
      { label: 'Sicurezza pagamento', val: 88, cls: 'fill-green' }
    ],
    verdict: 'amber',
    verdictText: '◎ CONSIGLIATA PER ERASMUS · HousingAnywhere è progettata specificamente per studenti internazionali. Contratti flessibili da 1 mese, pagamento sicuro, interfaccia in italiano. Cerca "Arrosadía" o "UPNA" nei filtri. Molto usata dagli studenti Erasmus di tutta Europa — buona chance di trovare coinquilini internazionali.'
  },

  {
    id: 'spotahome',
    name: 'Spotahome · Pamplona',
    emoji: '🏘',
    category: 'Piattaforma di ricerca',
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #0d0d20 100%)',
    address: 'Varie zone Pamplona',
    distance: 'Filtra per distanza UPNA',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.7969,-1.6323&travelmode=walking',
    price: '€ 400–800',
    priceNum: 580,
    priceNote: '/mese · verificati con video',
    type: ['budget', 'platform'],
    rating: 'amber',
    ratingLabel: '◎ Video-verificato',
    website: 'https://www.spotahome.com/es/alquiler/pamplona/pisos-y-apartamentos/pamplona',
    phone: null,
    availability: 'Proprietà video-verificate',
    services: [
      { icon: '🎥', label: 'Video tour 3D verificati' },
      { icon: '🛏', label: 'Studi/monolocali' },
      { icon: '🚿', label: 'Filtra bagno privato' },
      { icon: '✅', label: 'Proprietà verificate' },
      { icon: '🇮🇹', label: 'Supporto in italiano' },
      { icon: '🔐', label: 'Pagamento sicuro' }
    ],
    scores: [
      { label: 'Affidabilità verifiche', val: 89, cls: 'fill-green' },
      { label: 'Varietà offerte', val: 83, cls: 'fill-green' },
      { label: 'Prezzo medio', val: 83, cls: 'fill-green' }
    ],
    verdict: 'amber',
    verdictText: '◎ VERIFICATO PRIMA DI PRENOTARE · Video tour virtuali verificati per ogni annuncio — vedi la stanza reale prima di prenotare da remoto. Cerca "monolocale Pamplona Arrosadía" nei filtri. Interfaccia in italiano, prezzi spesso più bassi rispetto alle residenze gestite. Ideale per prenotare da Italia senza visitare.'
  },

  {
    id: 'erasmusu',
    name: 'Erasmusu · Pamplona UPNA',
    emoji: '🇪🇺',
    category: 'Piattaforma Erasmus',
    gradient: 'linear-gradient(135deg, #001a33 0%, #003366 100%)',
    address: 'Varie zone Pamplona',
    distance: 'Cerca per zona Arrosadía/UPNA',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=42.7969,-1.6323&travelmode=walking',
    price: '€ 300–650',
    priceNum: 480,
    priceNote: '/mese · da studenti locali',
    type: ['budget', 'platform'],
    rating: 'amber',
    ratingLabel: '◎ Solo Erasmus',
    website: 'https://erasmusu.com/it/erasmus-pamplona/alloggio-erasmus',
    phone: null,
    availability: 'Annunci da studenti locali',
    services: [
      { icon: '🇪🇺', label: 'Solo per studenti Erasmus' },
      { icon: '🛏', label: 'Stanze/appart. condivisi' },
      { icon: '💬', label: 'Community internazionale' },
      { icon: '🎉', label: 'Rete studenti Erasmus UPNA' },
      { icon: '📖', label: 'Guida città Pamplona' },
      { icon: '🤝', label: 'Affitti da locali' }
    ],
    scores: [
      { label: 'Comunità Erasmus', val: 98, cls: 'fill-green' },
      { label: 'Prezzi bassi', val: 88, cls: 'fill-green' },
      { label: 'Garanzie legali', val: 42, cls: 'fill-amber' }
    ],
    verdict: 'amber',
    verdictText: '◎ COMUNITÀ ERASMUS · Piattaforma dedicata agli studenti Erasmus con annunci da locali spesso a prezzi bassi. Utile anche per entrare nella rete Erasmus di Pamplona prima dell\'arrivo. Attenzione: meno garanzie rispetto alle piattaforme commerciali — verifica sempre l\'identità del proprietario prima di pagare.'
  }
];

// ── RENDER CARDS ────────────────────────────────────────────────
function renderCards(data) {
  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';

  const total = accommodations.length;
  const campusCount = accommodations.filter(a => a.type.includes('campus')).length;
  document.getElementById('totalListings').textContent = total;
  document.getElementById('campusCount').textContent = campusCount;

  if (data.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text-tertiary)">Nessun risultato per questo filtro.</div>';
    return;
  }

  data.forEach(acc => {
    const card = document.createElement('div');
    card.className = 'housing-card';
    card.setAttribute('data-type', acc.type.join(' '));
    card.onclick = () => openModal(acc);

    const amenityList = acc.services.slice(0, 3).map(s =>
      `<span class="amenity-pill check">${s.icon} ${s.label}</span>`
    ).join('');

    const availBadge = acc.availability
      ? `<div class="card-avail">${acc.availability}</div>`
      : '';

    card.innerHTML = `
      <div class="card-img-area" style="background:${acc.gradient}">
        <div class="card-emoji-bg">${acc.emoji}</div>
        <div class="card-img-gradient"></div>
      </div>
      <div class="card-score-badge ${acc.rating}">${acc.ratingLabel}</div>
      <div class="card-body">
        <div class="card-category-label">${acc.category}</div>
        <div class="card-name">${acc.name}</div>
        <div class="card-location">📍 ${acc.distance}</div>
        ${availBadge}
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

  let filtered;
  switch (type) {
    case 'top':      filtered = accommodations.filter(a => a.rating === 'green'); break;
    case 'campus':   filtered = accommodations.filter(a => a.type.includes('campus')); break;
    case 'budget':   filtered = [...accommodations].filter(a => a.type.includes('budget')).sort((a,b) => a.priceNum - b.priceNum); break;
    case 'platform': filtered = accommodations.filter(a => a.type.includes('platform')); break;
    default:         filtered = accommodations;
  }

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

  const availBlock = acc.availability
    ? `<div class="modal-avail-badge">📅 ${acc.availability}</div>`
    : '';

  content.innerHTML = `
    <div class="modal-category">${acc.category}</div>
    <div class="modal-title">${acc.name}</div>
    <div class="modal-location">📍 ${acc.address} · ${acc.distance}</div>
    ${availBlock}

    <div class="modal-verdict ${acc.verdict}">${acc.verdictText}</div>

    <div class="modal-section-title">Posizione</div>
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

    <div class="modal-section-title">Valutazione obiettiva</div>
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

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('detailModal').classList.remove('open');
});

// ── GUIDA ERASMUS ───────────────────────────────────────────────
const guideItems = [
  {
    icon: '🎓',
    iconClass: 'blue',
    title: 'Primo passo: Ufficio Erasmus UPNA',
    body: 'Contatta subito l\'Oficina de Relaciones Internacionales dell\'UPNA. Ti forniscono la lista aggiornata di residenze convenzionate e privati verificati per il 2026-27.',
    links: [
      { label: 'Sito ufficiale UPNA · Alloggi', url: 'https://www.unavarra.es/vida-universitaria/servicios/alojamiento-y-residencias' },
      { label: 'Ufficio Erasmus UPNA', url: 'https://www.unavarra.es/internacional' }
    ]
  },
  {
    icon: '📅',
    iconClass: 'green',
    title: 'Timeline consigliata per prenotare',
    body: 'Giugno–luglio 2026: le residenze più vicine all\'UPNA si esauriscono. Resa Los Abedules (sul campus) apre prenotazioni da ottobre 2025 per l\'anno successivo — verifica subito lo stato.',
    links: [
      { label: 'Resa Los Abedules · Prenota', url: 'https://www.resa.es/es/residencias/pamplona/campus-upna' }
    ]
  },
  {
    icon: '🚌',
    iconClass: 'amber',
    title: 'Trasporti: bus urbano Pamplona',
    body: 'Le linee principali per il campus UPNA (Arrosadía) sono la 9 e la 14. L\'abbonamento mensile studenti costa ~€20. Biglietto singolo: €1,35. L\'app "Transporte Pamplona" mostra orari in tempo reale.',
    links: [
      { label: 'Mappa linee bus Pamplona', url: 'https://www.pamplona.es/servicios/transporte-y-movilidad/autobuses-urbanos' }
    ]
  },
  {
    icon: '📋',
    iconClass: 'blue',
    title: 'Cosa chiedere prima di firmare',
    body: '✓ Confermato: "baño privado" e "cocina privada"\n✓ Durata contratto: da agosto/settembre a giugno\n✓ Deposito (fianza): di solito 1–2 mesi\n✓ Cosa è incluso nelle spese (luz, agua, internet)\n✓ Regole per cancellazione anticipata',
    links: []
  },
  {
    icon: '🔍',
    iconClass: 'blue',
    title: 'Dove cercare appartamenti privati',
    body: 'Per prezzi più bassi rispetto alle residenze gestite: Idealista (filtra zona Arrosadía), Fotocasa, Pisos.com. Per Erasmus: HousingAnywhere, Spotahome con video-tour. Cerca sempre con filtro "amueblado" (arredato).',
    links: [
      { label: 'Idealista · Arrosadía', url: 'https://www.idealista.com/alquiler-habitaciones/pamplona-iruña/arrosadia/' },
      { label: 'HousingAnywhere · Pamplona', url: 'https://housinganywhere.com/es/Pamplona--Spain/rooms-for-rent' },
      { label: 'Spotahome · Pamplona', url: 'https://www.spotahome.com/es/alquiler/pamplona/pisos-y-apartamentos/pamplona' }
    ]
  },
  {
    icon: '💬',
    iconClass: 'green',
    title: 'Frasi utili in spagnolo',
    body: '"¿El baño es privado?" — Il bagno è privato?\n"¿Tiene cocina privada o compartida?" — Cucina privata o condivisa?\n"¿Están incluidos los gastos?" — Le spese sono incluse?\n"¿Cuándo está disponible?" — Da quando è disponibile?\n"Soy estudiante Erasmus de Italia" — Sono studente Erasmus dall\'Italia.',
    links: []
  },
  {
    icon: '⚠️',
    iconClass: 'amber',
    title: 'Attenzioni e trappole comuni',
    body: 'Non pagare caparre a privati senza aver visto casa (video-tour o di persona).\nDiffida di prezzi troppo bassi per stanze vicine al campus.\nVerifica sempre il nome del proprietario sul contratto.\nControlla che l\'indirizzo esista davvero su Google Maps.',
    links: []
  },
  {
    icon: '🏥',
    iconClass: 'blue',
    title: 'Servizi essenziali vicino al campus',
    body: 'Supermercato: Mercadona e Carrefour in zona Arrosadía/Lezkairu.\nFarmacia: vicino al campus.\nOspedale: Clínica Universidad de Navarra e Hospital de Navarra entrambi raggiungibili in bus.\nBanca: Santander e CaixaBank accettano studenti stranieri.',
    links: []
  }
];

function renderGuide() {
  const container = document.getElementById('guideContent');
  if (!container) return;
  container.innerHTML = guideItems.map(item => `
    <div class="guide-item">
      <div class="guide-icon ${item.iconClass}">${item.icon}</div>
      <div class="guide-body">
        <div class="guide-title">${item.title}</div>
        <div class="guide-desc">${item.body.replace(/\n/g, '<br/>')}</div>
        ${item.links.length ? `<div class="guide-links">${item.links.map(l => `<a class="guide-link" href="${l.url}" target="_blank">${l.label} →</a>`).join('')}</div>` : ''}
      </div>
    </div>
  `).join('');
}
renderGuide();

// ── TOAST UTILITY ───────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── PILL NAV SYNC ────────────────────────────────────────────────
document.querySelectorAll('.pill-nav-btn').forEach((btn, i) => {
  const ids = ['hero', 'listings', 'guide', 'about'];
  btn.addEventListener('click', () => showSection(ids[i]));
});

showSection('hero');
