"""
CasaUPNA · Updater giornaliero automatico
==========================================
Gira ogni mattina alle 09:00 tramite GitHub Actions (cloud).
Cerca nuove disponibilita vicino all'UPNA e aggiorna app.js.
"""

import urllib.request
import urllib.error
import urllib.parse
import json
import re
import os
import sys
import ssl
import datetime
import logging
import hashlib
import traceback
from pathlib import Path

# ── CONFIG ─────────────────────────────────────────────────────────────────────
BASE_DIR   = Path(__file__).parent
LOG_FILE   = BASE_DIR / "updater.log"
APPJS_FILE = BASE_DIR / "app.js"
DATA_FILE  = BASE_DIR / "updates_data.json"

# Logghiamo su stdout: il .bat redirige stdout >> updater.log
# evitando il PermissionError da doppia apertura del file.
logging.basicConfig(
    stream=sys.stdout,
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode    = ssl.CERT_NONE

HEADERS = {
    "User-Agent":      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept-Language": "es-ES,es;q=0.9,it;q=0.8,en;q=0.7",
    "Accept":          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

SITES = [
    {
        "id":       "resa-abedules",
        "name":     "Resa Los Abedules",
        "url":      "https://www.resa.es/es/residencias/pamplona/campus-upna",
        "keywords": ["estudio", "disponible", "reserva", "individual", "privado"],
    },
    {
        "id":       "camplus-soto",
        "name":     "Camplus Soto House",
        "url":      "https://www.camplus.es/residencias/pamplona/",
        "keywords": ["studio", "disponible", "reserva", "privado", "habitacion"],
    },
    {
        "id":       "amro",
        "name":     "AMRO Pamplona",
        "url":      "https://www.amroestudiantes.es/residencias/pamplona/",
        "keywords": ["estudio", "disponible", "plaza", "privado"],
    },
    {
        "id":       "homeandco",
        "name":     "Home and Co Pamplona",
        "url":      "https://homeandcoliving.com/es/pamplona/",
        "keywords": ["available", "studio", "room", "private", "book"],
    },
    {
        "id":       "livensa",
        "name":     "Livensa Living Pamplona",
        "url":      "https://www.livensaliving.com/es/residencias/pamplona/",
        "keywords": ["studio", "available", "private", "book", "reserve"],
    },
    {
        "id":       "uniscopio",
        "name":     "Uniscopio Pamplona",
        "url":      "https://uniscopio.com/residencias-universitarias/pamplona",
        "keywords": ["bano privado", "cocina privada", "estudio", "individual"],
    },
]

SEARCH_QUERIES = [
    "residencia universitaria UPNA Pamplona estudio individual bano privado 2026",
    "alojamiento estudiantes campus Arrosadia Pamplona habitacion individual",
    "student residence Pamplona UPNA 2026 private studio available",
]


# ── UTILITIES ──────────────────────────────────────────────────────────────────

def fetch_page(url, timeout=12):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as resp:
            raw = resp.read()
            enc = resp.headers.get_content_charset("utf-8")
            return raw.decode(enc, errors="replace")
    except Exception as exc:
        logging.warning("Fetch fallito [%s]: %s", url, exc)
        return None


def keywords_found(html, keywords):
    low = html.lower()
    return [k for k in keywords if k.lower() in low]


def extract_price(html):
    """Cerca un prezzo tra 400 e 2000 nel testo."""
    m = re.search(r"\b([4-9]\d{2}|1\d{3}|2000)\b", html)
    if m:
        return m.group(1) + " EUR/mese"
    return None


def search_duckduckgo(query):
    results = []
    try:
        url  = "https://html.duckduckgo.com/html/?q=" + urllib.parse.quote_plus(query)
        html = fetch_page(url, timeout=15)
        if not html:
            return results
        titles   = re.findall(r'class="result__title"[^>]*>.*?<a[^>]*>(.*?)</a>', html, re.S)
        snippets = re.findall(r'class="result__snippet"[^>]*>(.*?)</span>', html, re.S)
        urls_raw = re.findall(r'class="result__url"[^>]*>(.*?)</span>', html, re.S)
        for i, (t, s, u) in enumerate(zip(titles, snippets, urls_raw)):
            ct = re.sub(r"<[^>]+>", "", t).strip()
            cs = re.sub(r"<[^>]+>", "", s).strip()
            cu = u.strip()
            if ct and cs:
                results.append({"title": ct[:120], "snippet": cs[:220], "url": cu[:200]})
            if i >= 4:
                break
    except Exception as exc:
        logging.warning("DuckDuckGo search fallita: %s", exc)
    return results


def make_hash(text):
    """Hash deterministico (sha256) — non cambia tra sessioni Python."""
    return hashlib.sha256(text[:80].encode("utf-8")).hexdigest()[:16]


def load_existing_data():
    if DATA_FILE.exists():
        try:
            return json.loads(DATA_FILE.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {"seen_hashes": [], "updates": []}


def save_data(data):
    DATA_FILE.write_text(
        json.dumps(data, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )


# ── DAILY SCAN ─────────────────────────────────────────────────────────────────

def run_daily_scan():
    data      = load_existing_data()
    seen      = set(data.get("seen_hashes", []))
    new_items = []
    today_str = datetime.date.today().strftime("%d/%m/%Y")
    now_str   = datetime.datetime.now().strftime("%H:%M")

    logging.info("=== Avvio scansione CasaUPNA ===")

    # 1. Siti diretti
    for site in SITES:
        logging.info("Controllo: %s", site["name"])
        html = fetch_page(site["url"])
        if not html:
            continue
        found_kw = keywords_found(html, site["keywords"])
        if not found_kw:
            logging.info("  Nessuna keyword trovata.")
            continue

        avail = any(w in html.lower() for w in ["disponible","available","reserva","book","plaza"])
        price = extract_price(html)
        price_str = " | Prezzo stimato: " + price if price else ""

        summary = "{} - {} | {}{}".format(
            site["name"], today_str,
            "Disponibile - verifica subito!" if avail else "Aggiornamento rilevato",
            price_str
        )
        h = make_hash(summary)
        if h in seen:
            logging.info("  Gia visto, salto.")
            continue

        seen.add(h)
        new_items.append({
            "icon":      "",
            "iconClass": "green" if avail else "amber",
            "title":     "{} — aggiornamento {}".format(site["name"], today_str),
            "desc":      summary,
            "time":      "Oggi · " + now_str,
            "url":       site["url"],
            "urlLabel":  "Vedi sito"
        })
        logging.info("  Nuova entry: %s", summary[:80])

    # 2. Ricerca DuckDuckGo
    for query in SEARCH_QUERIES:
        logging.info("Ricerca: %s", query[:60])
        for r in search_duckduckgo(query):
            h = make_hash(r["title"] + r["snippet"])
            if h in seen:
                continue
            rel = ["pamplona", "upna", "arrosad", "navarra", "estudio", "studio", "habitacion"]
            if not any(w in (r["title"] + r["snippet"]).lower() for w in rel):
                continue
            seen.add(h)
            url_val = r["url"] if r["url"].startswith("http") else "#"
            new_items.append({
                "icon":      "",
                "iconClass": "blue",
                "title":     r["title"][:80],
                "desc":      r["snippet"][:180],
                "time":      "Oggi · " + now_str,
                "url":       url_val,
                "urlLabel":  "Apri link"
            })
            logging.info("  Risultato web: %s", r["title"][:60])

    # 3. Fallback voce "nessuna novita"
    if not new_items:
        new_items.append({
            "icon":      "",
            "iconClass": "blue",
            "title":     "Scansione completata · " + today_str,
            "desc":      "Nessuna nuova disponibilita rilevata oggi. Tutti i siti monitorati sono stati controllati.",
            "time":      "Oggi · " + now_str,
            "url":       "https://uniscopio.com/residencias-universitarias/pamplona",
            "urlLabel":  "Cerca manualmente"
        })

    # Salva stato
    data["seen_hashes"] = list(seen)[-500:]
    data["updates"]     = new_items + data.get("updates", [])
    data["last_run"]    = datetime.datetime.now().isoformat()
    save_data(data)

    logging.info("=== Completata: %d nuove voci ===", len(new_items))
    return new_items, data["updates"]


# ── PATCH app.js ───────────────────────────────────────────────────────────────

ICON_EMOJI = {
    "green":  "[OK]",
    "amber":  "[!]",
    "blue":   "[i]",
    "red":    "[X]",
}


def js_str(value):
    """
    Serializza una stringa Python come stringa JS sicura.
    Usa ensure_ascii=False per evitare sequenze \\uXXXX
    che causano 'bad escape' in re.sub replacement.
    """
    return json.dumps(value, ensure_ascii=False)


def build_updates_block(feed):
    """Costruisce il blocco JS `const updates = [...]` come stringa."""
    items = []
    for u in feed:
        item = (
            "  {\n"
            "    icon: " + js_str(u.get("icon", "blue")) + ",\n"
            "    iconClass: " + js_str(u.get("iconClass", "blue")) + ",\n"
            "    title: " + js_str(u.get("title", "")) + ",\n"
            "    desc: " + js_str(u.get("desc", "")) + ",\n"
            "    time: " + js_str(u.get("time", "")) + ",\n"
            "    url: " + js_str(u.get("url", "#")) + ",\n"
            "    urlLabel: " + js_str(u.get("urlLabel", "Vedi")) + "\n"
            "  }"
        )
        items.append(item)
    return "const updates = [\n" + ",\n".join(items) + "\n];"


def patch_appjs(new_items, all_updates):
    if not APPJS_FILE.exists():
        logging.error("app.js non trovato: %s", APPJS_FILE)
        return

    content   = APPJS_FILE.read_text(encoding="utf-8")
    feed      = all_updates[:20]
    new_block = build_updates_block(feed)

    pattern = r"const updates\s*=\s*\[[\s\S]*?\];"

    if re.search(pattern, content):
        # IMPORTANTE: usa lambda per il replacement cosi re.sub
        # non interpreta \u come escape nella stringa di sostituzione.
        patched = re.sub(pattern, lambda _: new_block, content, count=1)
    else:
        patched = content + "\n\n" + new_block
        logging.warning("Blocco 'const updates' non trovato — aggiunto in fondo.")

    APPJS_FILE.write_text(patched, encoding="utf-8")
    logging.info("app.js aggiornato con %d voci.", len(feed))


# ── ENTRY POINT ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    try:
        new_items, all_updates = run_daily_scan()
        patch_appjs(new_items, all_updates)
        print("[OK] CasaUPNA aggiornata - {} nuove voci - {}".format(
            len(new_items), datetime.date.today()
        ))
        sys.exit(0)
    except Exception as exc:
        tb = traceback.format_exc()
        logging.error("Errore critico:\n%s", tb)
        print("[ERRORE] {}\n{}".format(exc, tb), file=sys.stderr)
        sys.exit(1)
