# Daniel's Sushi — sito web

Sito di Daniel's Sushi, Via Beato Giacomo 72, Bitetto (BA). È un sito statico (HTML, CSS e un piccolo script) costruito sul design system esportato da Claude Design in `design-system/`.

## Avvio in locale

Non servono dipendenze. Da questa cartella:

```sh
npm start            # equivale a: python3 -m http.server 8000
```

Poi apri http://localhost:8000. I file vanno serviti da un server: aprire `index.html` con doppio clic funziona quasi del tutto, ma è meglio usare il server.

## Struttura

| Percorso | Contenuto |
|---|---|
| `index.html` | Home: avviso, hero con gli archi, piatti della casa, box, ordine e contatti |
| `menu.html` | Menù completo con la barra delle categorie fissa in alto |
| `data/menu.json` | **Fonte del menù**: categorie, voci, prezzi, badge, «Componi la tua Poke» |
| `scripts/genera-menu.mjs` | Rigenera le categorie dentro `menu.html` a partire da `data/menu.json` |
| `css/site.css` | Solo layout del sito; colori, font e componenti vengono dal design system |
| `js/menu.js` | Segna la categoria visibile nella barra del menù (senza JS i chip restano link) |
| `assets/img/` | Illustrazioni ritagliate dai post Instagram e favicon |
| `design-system/` | Design system di Claude Design (token, componenti, movimento): non modificarlo a mano |
| `menu.pdf` | Menù originale, scaricabile dal sito |

## Aggiornare il menù

1. Modifica `data/menu.json`. Ogni voce ha `num`, `nome` (esatto come nel menù), `prezzo` (numero, es. `10.5`) e, se servono, `desc`, `pz`, `piccante` (`true` o un testo), `veg`, `casa`, `info`.
2. Esegui `npm run menu` (oppure `node scripts/genera-menu.mjs`).
3. Lo script riscrive solo la parte tra i marcatori `<!-- genera-menu:... -->` in `menu.html`; il resto della pagina si modifica a mano.

I piatti in evidenza e le box della home sono scritti direttamente in `index.html`: se cambiano i prezzi, aggiornali anche lì.

## Da completare

Questi dati mancano nel design system e nel menù e vanno chiesti al locale:

- **Orari di apertura** e **numero di telefono**: in `index.html` sono segnaposto `[ORARI DI APERTURA]` e `[NUMERO DI TELEFONO]`. Il bottone «Chiama per ordinare» ha un `href="tel:"` vuoto (cerca `DA COMPLETARE`).
- **Avviso** in cima alla home: aggiornalo o toglilo quando non è più valido.
- **Foto dei piatti**: non ce ne sono ancora. Il design system prevede che entrino in un arco o in un rettangolo `radius-sm` su fondo `kraft`.
- Logo vettoriale o su fondo trasparente: per ora si usa `design-system/assets/Logos/logo.png`.

## Pubblicazione

Essendo statico, il sito si pubblica così com'è, per esempio con GitHub Pages (cartella radice del branch) o Netlify.
