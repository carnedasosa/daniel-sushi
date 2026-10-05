# Daniel's Sushi — design system «Carta e indaco»

Seconda versione del design system (ottobre 2026). Sostituisce la prima, esportata da Claude Design (archi e kraft), che resta nella cronologia di git e in `daniel-sushi-design-system.zip`.

Il riferimento è lo stile **Pa'lais** da Refero Styles, salvato in `riferimenti/palais-DESIGN.md`: un ricettario illustrato a mano su carta crema, con un solo inchiostro indaco e accenti caldi in forme organiche. Da Pa'lais prendiamo **struttura, palette e regole**; da Daniel's Sushi restano **logo, illustrazioni dei post, foto e tono di voce**. Non è una copia del marchio Pa'lais: niente nomi, prodotti o illustrazioni loro.

## Perché questo stile

- L'**indaco** di Pa'lais è quasi il blu cobalto dei post Instagram del locale (pesce inciso, ramen): le nostre illustrazioni ci stanno dentro senza ritocchi.
- L'**arancio bruciato** è quello del packaging d'asporto.
- I **titoli condensati maiuscoli** erano già la voce dei post.
- La **carta crema** con card bianche fa pensare a un menù stampato, non a un'app.

## Come usarlo nel codice

- Font Google: `https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@600&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Jost:wght@400;500&display=swap` (tutti con licenza OFL).
- Importa `tokens.css` (variabili `--indaco`, `--carta`, `--sp-16`, `--radius-card`… e classi tipografiche `.display`, `.heading`, `.eyebrow`, `.script`…).
- Importa `components/bundle.css` per i componenti (`ds-btn`, `ds-chip`, `ds-badge`, `ds-card`, `ds-blob`, `ds-wave`, `ds-illustration`) e il movimento `m-*`. `motion.css` contiene solo il movimento.
- `tokens.json` è l'elenco dei token con il ruolo di ognuno.
- Logo: `assets/Logos/logo-trasparente.png` (fondo trasparente, ricavato dall'originale senza ricolorarlo). L'originale su kraft resta in `assets/Logos/logo.png`.

## Colore

| Token | Valore | Ruolo |
|---|---|---|
| `--carta` | `#FBF9F6` | Fondo di ogni pagina |
| `--bianco` | `#FFFFFF` | Card e pannelli sopra la carta |
| `--indaco` | `#234386` | **Unico colore freddo**: titoli, link, nav, bottone pieno, fasce scure e footer |
| `--inchiostro` | `#000000` | Testo corrente, filetti netti, bordi dei chip |
| `--inchiostro-tenue` | `#5C5A55` | Descrizioni dei piatti e note |
| `--filetto` | `#E2D9CA` | Separatori sottili tra le voci del menù |
| `--arancio` | `#ED7328` | Blob, bordo del bottone secondario, fascia arancio |
| `--arancio-ink` | `#BC5110` | L'arancio quando è testo (l'arancio pieno su carta non è leggibile: 2.8:1) |
| `--miele` | `#FFC400` | Solo blob |
| `--salvia` | `#A2D3A6` | Solo blob (richiama pistacchio e wasabi) |
| `--salvia-ink` | `#3A6640` | Testo del badge Vegetariano |
| `--sabbia` | `#D2B68C` | Dettagli decorativi |
| `--cielo` | `#6AA8DC` | Illustrazioni a tratto, mai testo |

Regole:
- **Corsie separate**: l'indaco porta tutta la struttura (tipo, link, azioni); i caldi vivono solo in blob, onde, illustrazioni e bordi. Non mettere caldi nel testo corrente né l'indaco nei blob.
- **Un solo bottone pieno per schermata** nel contenuto (oltre a «Ordina ora» nell'header), indaco con testo bianco. L'arancio non è mai il fondo di un bottone: le azioni secondarie sono outline arancio con freccia.
- Superfici: carta → card bianca → fascia arancio → fascia indaco. Niente grigi per separare.
- Sulla fascia arancio: titoli indaco solo grandi (3.2:1, almeno 32px), testi piccoli in `--inchiostro` (7:1), contenuti dentro card bianche.
- Tema unico chiaro: la carta crema è l'identità, non c'è un tema scuro.

## Tipografia

| Voce | Font | Uso |
|---|---|---|
| Display | **Bebas Neue** (al posto di hwt-artz/Delivery Note di Pa'lais) | Titoli, sempre maiuscoli, indaco, spaziatura .03–.043em. Un solo `.display` per pagina |
| Etichette | **Jost** (al posto di Avant Garde/Axiforma) | Occhielli, nav, bottoni, chip, badge: maiuscolo e molto spaziato (.12–.2em) |
| Testo | **DM Sans** | Paragrafi, descrizioni, prezzi, nomi dei piatti |
| Script | **Caveat** 600 | Una frase d'emozione sotto il titolo principale, in indaco. Mai in bottoni, etichette o menù |

- Nomi dei piatti in DM Sans 700, esattamente come nel menù (niente maiuscolo forzato): «32. Daniel's roll», «GamberOne».
- Prezzi `14,00 €` in DM Sans 700 con cifre tabellari.

## Forma, spazio, elevazione

- Bottoni a pillola `--radius-btn` (32px), card `--radius-card` (8px), chip e badge `--radius-tag` (16px). Il contrasto pillola/card squadrata è voluto.
- Unità di spazio 4px (`--sp-4` … `--sp-128`); sezioni distanziate di 64–128px; contenitore 1200px.
- **Ombra solo sulle card**: `--ombra-card`, morbida e spostata in basso a sinistra. Bottoni e nav senza ombre.
- Ogni elemento toccabile è alto almeno `--tap` (44px); focus = anello indaco 2px con 3px di distacco.

## Forme organiche e illustrazioni

- **Blob**: SVG pieni in un solo colore caldo (`ds-blob--miele`, `--salvia`, `--arancio`, `--sabbia`), dietro foto e illustrazioni o ai bordi delle sezioni. Mai sfumature, mai più colori in un blob.
- **Onde** (`ds-wave`): separano le fasce di colore al posto delle linee dritte; prendono il colore della sezione sotto.
- **Illustrazioni a tratto** (pesce inciso, ramen dei post): mai chiuse in un riquadro; ruotate di ±5–10°, possono sovrapporsi ai bordi e uscire dalla pagina. Si usano così come sono, non si ridisegnano.

## Immagini

Foto di cibo con luce naturale, inquadrature ravvicinate o dall'alto, dentro card bianche (8px) con l'ombra del sistema. Nessun filtro o duotono. Le foto attuali sono d'archivio con licenza libera (crediti in `crediti.html`): vanno sostituite con foto del locale appena possibile.

## Tono di voce (invariato)

- Italiano, si dà del **tu**: «Effettua il tuo ordine!», «Ti aspettiamo questa sera».
- Frasi brevi, calde. Avvisi diretti. Niente emoji; punto esclamativo solo nelle call to action.
- Nomi dei piatti esattamente come nel menù. Nota allergeni sempre presente: «Per gli allergeni chiedere l'apposito menù al personale».

## Movimento

Vedi `motion.md`: breve e morbido; un solo momento d'effetto per pagina (i blob dell'hero che si allargano).
