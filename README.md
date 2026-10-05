# Daniel's Sushi — sito web

Sito di Daniel's Sushi, Via Beato Giacomo 72, Bitetto (BA). È un sito statico (HTML, CSS e un piccolo script) costruito sul design system esportato da Claude Design in `design-system/` e ricalcato sui prototipi ad alta fedeltà di `Design.html` (home e menù, desktop e mobile).

## Avvio in locale

Non servono dipendenze. Da questa cartella:

```sh
npm start            # equivale a: python3 -m http.server 8000
```

Poi apri http://localhost:8000. I file vanno serviti da un server: aprire `index.html` con doppio clic funziona quasi del tutto, ma è meglio usare il server.

## Struttura

| Percorso | Contenuto |
|---|---|
| `index.html` | Home: hero con gli archi, materia prima, roll della casa, box, anteprima del menù, «Componi la tua poke», dove siamo |
| `menu.html` | Menù: una categoria alla volta, scelta dalla barra fissa in alto (`menu.html#poke-bowl` apre direttamente quella) |
| `data/menu.json` | **Fonte del menù**: categorie, voci, prezzi, badge, «Componi la tua Poke» |
| `scripts/genera-menu.mjs` | Rigenera le categorie dentro `menu.html` a partire da `data/menu.json` |
| `css/site.css` | Solo layout del sito; colori, font e componenti vengono dal design system |
| `js/menu.js` | Cambio di categoria nel menù (senza JS si vedono tutte le categorie e i chip sono ancore) |
| `assets/img/` | Illustrazioni (ramen, pesce) prese dai prototipi e favicon |
| `Design.html` | Prototipi di Claude Design: si apre nel browser, è il riferimento visivo |
| `design-system/` | Design system di Claude Design (token, componenti, movimento): non modificarlo a mano |
| `menu.pdf` | Menù originale, scaricabile dal bottone «Scarica il menù PDF» (**al momento manca**: va rimesso nella cartella radice) |

## Aggiornare il menù

1. Modifica `data/menu.json`. Ogni voce ha `num`, `nome` (esatto come nel menù), `prezzo` (numero, es. `10.5`) e, se servono, `desc`, `piccante` (`true` o un testo), `veg`, `casa`. Il campo `pezzi` della categoria compare accanto al titolo («8 pz. · 40 piatti»).
2. Esegui `npm run menu` (oppure `node scripts/genera-menu.mjs`).
3. Lo script riscrive solo la parte tra i marcatori `<!-- genera-menu:... -->` in `menu.html`; il resto della pagina si modifica a mano.

I roll della casa, le box e «Componi la tua poke» della home sono scritti direttamente in `index.html`: se cambiano i prezzi, aggiornali anche lì. La categoria aperta all'arrivo sul menù è `CATEGORIA_INIZIALE` nello script (oggi Special roll, come nel prototipo).

## Da completare

Questi dati mancano nel design system e nel menù e vanno chiesti al locale:

- **Orari di apertura** e **numero di telefono**: in `index.html` sono segnaposto `[ORARI DI APERTURA]` e `[NUMERO DI TELEFONO]`. Il bottone «Chiama per ordinare» ha un `href="tel:"` vuoto (cerca `DA COMPLETARE`).
- **Prezzo della poke composta**: segnaposto `[PREZZO]` in `index.html`, come nel prototipo.
- **Foto**: i prototipi prevedono sette foto (`hero-salmone.jpg`, `salmone.jpg`, `tonno.jpg`, `gambero-rosso.jpg`, `pistacchio.jpg`, `roll.jpg`, `poke.jpg`). Finché mancano si vede il riquadro kraft con l'etichetta «FOTO · …», come nel prototipo. Per inserirne una basta mettere un `<img>` dentro il riquadro `.photo`: copre l'etichetta e prende la forma dell'arco.
- **menu.pdf**: è stato tolto dalla cartella; senza, il bottone «Scarica il menù PDF» non scarica nulla.
- Logo vettoriale o su fondo trasparente: per ora si usa `design-system/assets/Logos/logo.png`.

## Pubblicazione

Essendo statico, il sito si pubblica così com'è, per esempio con GitHub Pages (cartella radice del branch) o Netlify.
