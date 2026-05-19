"""
CasaUPNA · Updater giornaliero automatico
==========================================
Gira ogni mattina alle 09:00 tramite GitHub Actions (cloud) 
oppure Windows Task Scheduler (locale).
Cerca nuove disponibilità vicino all'UPNA e aggiorna app.js.
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
from pathlib import Path

# ── CONFIG ─────────────────────────────────────────────────────────────────────
BASE_DIR   = Path(__file__).parent
LOG_FILE   = BASE_DIR / "updater.log"
APPJS_FILE = BASE_DIR / "app.js"
DATA_FILE  = BASE_DIR / "updates_data.json"

logging.basicConfig(
    filename=str(LOG_FILE),
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0 Safari/537.36"
    ),
    "Accept-Language": "es-ES,es;q=0.9,it;q=0.8,en;q=0.7",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

SITES = [
    {
        "id":           "resa-abedules",
        "name":         "Resa Los Abedules",
        "url":          "https://www.resa.es/es/residencias/pamplona/campus-upna",
        "icon":         "🌳",
        "keywords":     ["estudio", "disponible", "reserva", "individual", "privado"],
        "price_pattern": r"(\d{3,4})\s*[Eu20ac$]|[Eu20ac$]\s*(\d{3,4})",
    },
    {
        "id":           "camplus-soto",
        "name":         "Camplus Soto House",
        "url":          "https://www.camplus.es/residencias/pamplona/soto-house",
        "icon":         "🏠",
        "keywords":     ["studio", "disponible", "reserva", "privado", "habitacion"],
        "price_pattern": r"(\d{3,4})\s*[Eu20ac$]|[Eu20ac$]\s*(\d{3,4})",
    },
    {
        "id":           "amro",
        "name":         "AMRO Pamplona",
        "url":          "https://www.amroestudiantes.es/pamplona",
        "icon":         "🏢",
        "keywords":     ["estudio", "disponible", "plaza", "privado"],
        "price_pattern": r"(\d{3,4})\s*[Eu20ac$]|[Eu20ac$]\s*(\d{3,4})",
    },
    {
        "id":           "homeandco",
        "name":         "Home & Co Pamplona",
        "url":          "https://www.homeand.co/pamplona",
        "icon":         "🏡",
        "keywords":     ["available", "studio", "room", "private", "book"],
        "price_pattern": r"(\d{3,4})\s*[Eu20ac$]|[Eu20ac$]\s*(\d{3,4})",
    },
    {
        "id":           "livensa",
        "name":         "Livensa Living Pamplona",
        "url":          "https://www.livensaliving.com/en/properties/pamplona",
        "icon":         "✨",
        "keywords":     ["studio", "available", "private", "book", "reserve"],
        "price_pattern": r"(\d{3,4})\s*[Eu20ac$]|[Eu20ac$]\s*(\d{3,4})",
    },
    {
        "id":           "uniscopio",
        "name":         "Uniscopio Pamplona",
        "url":          "https://uniscopio.com/residencias-universitarias/pamplona",
        "icon":         "🔍",
        "keywords":     ["bano privado", "cocina privada", "estudio", "individual"],
        "price_pattern": r"(\d{3,4})\s*[Eu20ac$]|[Eu20ac$]\s*(\d{3,4})",
    },
]

GOOGLE_QUERIES = [
    "residencia universitaria UPNA Pamplona estudio individual bano privado 2026",
    "alojamiento estudiantes campus Arrosadia Pamplona habitacion individual",
    "student residence Pamplona UPNA 2026 private studio available",
]


def fetch_page(url, timeout=12):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as resp:
            raw = resp.read()
            enc = resp.headers.get_content_charset("utf-8")
            return raw.decode(enc, errors="replace")
    except Exception as e:
        logging.warning("Fetch fallito [%s]: %s", url, e)
        return None


def extract_price(html, pattern):
    m = re.search(pattern, html)
    if m:
        val = m.group(1) or m.group(2)
        if val and 400 < int(val) < 2000:
            return "EUR {}/mese".format(val)
    return None


def keywords_found(html, keywords):
    html_lower = html.lower()
    return [k for k in keywords if k.lower() in html_lower]


def search_duckduckgo(query):
    results = []
    try:
        encoded = urllib.parse.quote_plus(query)
        url = "https://html.duckduckgo.com/html/?q=" + encoded
        html = fetch_page(url, timeout=15)
        if not html:
            return results
        titles   = re.findall(r'class="result__title"[^>]*>.*?<a[^>]*>(.*?)</a>', html, re.S)
        snippets = re.findall(r'class="result__snippet"[^>]*>(.*?)</span>', html, re.S)
        urls_raw = re.findall(r'class="result__url"[^>]*>(.*?)</span>', html, re.S)
        for i, (t, s, u) in enumerate(zip(titles, snippets, urls_raw)):
            clean_t = re.sub(r'<[^>]+>', '', t).strip()
            clean_s = re.sub(r'<[^>]+>', '', s).strip()
            clean_u = u.strip()
            if clean_t and clean_s:
                results.append({
                    "title":   clean_t[:120],
                    "snippet": clean_s[:220],
                    "url":     clean_u[:200],
                })
            if i >= 4:
                break
    except Exception as e:
        logging.warning("DuckDuckGo search fallita: %s", e)
    return results


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


def make_hash(text):
    return str(abs(hash(text[:80])))


def run_daily_scan():
    data      = load_existing_data()
    seen      = set(data.get("seen_hashes", []))
    new_items = []
    today_str = datetime.date.today().strftime("%d/%m/%Y")
    now_str   = datetime.datetime.now().strftime("%H:%M")

    logging.info("=== Avvio scansione giornaliera CasaUPNA ===")

    # 1. Siti diretti
    for site in SITES:
        logging.info("Controllo: %s", site["name"])
        html = fetch_page(site["url"])
        if not html:
            continue

        found_kw = keywords_found(html, site["keywords"])
        price    = extract_price(html, site["price_pattern"])

        if not found_kw:
            logging.info("  Nessuna keyword trovata.")
            continue

        avail_words = ["disponible", "available", "reserva", "book", "plaza"]
        is_available = any(w in html.lower() for w in avail_words)

        price_str = " | Prezzo: " + price if price else ""
        summary = (
            "{} - {} | {}{}".format(
                site["name"],
                today_str,
                "Disponibile - verifica subito!" if is_available else "Aggiornamento rilevato",
                price_str
            )
        )

        h = make_hash(summary)
        if h in seen:
            logging.info("  Gia visto, salto.")
            continue

        seen.add(h)
        new_items.append({
            "icon":      "checkmark" if is_available else "search",
            "iconClass": "green" if is_available else "amber",
            "title":     "{} — {}".format(site["name"], today_str),
            "desc":      summary,
            "time":      "Oggi · " + now_str,
            "url":       site["url"],
            "urlLabel":  "Vedi sito"
        })
        logging.info("  Nuova entry: %s", summary[:80])

    # 2. DuckDuckGo search
    for query in GOOGLE_QUERIES:
        logging.info("Ricerca: %s", query[:60])
        results = search_duckduckgo(query)
        for r in results:
            h = make_hash(r["title"] + r["snippet"])
            if h in seen:
                continue
            relevance = ["pamplona", "upna", "arrosad", "navarra", "estudio", "studio", "habitacion"]
            combined  = (r["title"] + r["snippet"]).lower()
            if not any(w in combined for w in relevance):
                continue

            seen.add(h)
            url_val = r["url"] if r["url"].startswith("http") else "#"
            new_items.append({
                "icon":      "link",
                "iconClass": "blue",
                "title":     r["title"][:80],
                "desc":      r["snippet"][:180],
                "time":      "Oggi · " + now_str,
                "url":       url_val,
                "urlLabel":  "Apri link"
            })
            logging.info("  Risultato web: %s", r["title"][:60])

    # 3. Voce default se nessuna novita
    if not new_items:
        new_items.append({
            "icon":      "check",
            "iconClass": "blue",
            "title":     "Scansione completata · " + today_str,
            "desc":      "Nessuna nuova disponibilita rilevata oggi. Tutti i siti monitorati sono stati controllati.",
            "time":      "Oggi · " + now_str,
            "url":       "https://uniscopio.com/residencias-universitarias/pamplona",
            "urlLabel":  "Cerca manualmente"
        })

    # 4. Salva stato
    data["seen_hashes"] = list(seen)[-500:]
    data["updates"]     = new_items + data.get("updates", [])
    data["last_run"]    = datetime.datetime.now().isoformat()
    save_data(data)

    logging.info("=== Completata: %d nuove voci ===", len(new_items))
    return new_items, data.get("updates", [])


ICON_MAP = {
    "checkmark": "✅",
    "search":    "🔍",
    "link":      "🔗",
    "check":     "✓",
}


def patch_appjs(new_items, all_updates):
    if not APPJS_FILE.exists():
        logging.error("app.js non trovato in: %s", APPJS_FILE)
        return

    content = APPJS_FILE.read_text(encoding="utf-8")
    feed    = (new_items + all_updates)[:20]

    js_items = []
    for u in feed:
        icon_char = ICON_MAP.get(u.get("icon", ""), u.get("icon", "🔍"))
        js_items.append(
            "  {{\n"
            "    icon: {icon},\n"
            "    iconClass: {iconClass},\n"
            "    title: {title},\n"
            "    desc: {desc},\n"
            "    time: {time},\n"
            "    url: {url},\n"
            "    urlLabel: {urlLabel}\n"
            "  }}".format(
                icon=json.dumps(icon_char),
                iconClass=json.dumps(u["iconClass"]),
                title=json.dumps(u["title"]),
                desc=json.dumps(u["desc"]),
                time=json.dumps(u["time"]),
                url=json.dumps(u["url"]),
                urlLabel=json.dumps(u["urlLabel"]),
            )
        )

    new_block = "const updates = [\n" + ",\n".join(js_items) + "\n];"
    pattern   = r"const updates\s*=\s*\[[\s\S]*?\];"

    if re.search(pattern, content):
        patched = re.sub(pattern, new_block, content, count=1)
    else:
        patched = content + "\n\n" + new_block
        logging.warning("Blocco 'const updates' non trovato — aggiunto in fondo.")

    APPJS_FILE.write_text(patched, encoding="utf-8")
    logging.info("app.js aggiornato con %d voci.", len(feed))


if __name__ == "__main__":
    try:
        new_items, all_updates = run_daily_scan()
        patch_appjs(new_items, all_updates)
        print("[OK] CasaUPNA aggiornata · {} nuove voci · {}".format(
            len(new_items), datetime.date.today()
        ))
        sys.exit(0)
    except Exception as e:
        logging.exception("Errore critico: %s", e)
        print("[ERRORE] {}".format(e), file=sys.stderr)
        sys.exit(1)
