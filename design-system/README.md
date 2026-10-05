# Daniel's Sushi — design system

Esportato da Claude Design (sistema «Daniel's Sushi», versione 1791220080-f497, 5 ottobre 2026). La fonte di verità per colori, tipografia e componenti è questa cartella; se il design system cambia in Claude Design, riesporta e sostituisci la cartella.

## Come usarlo nel codice

- Carica i font Google: `https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Oswald:wght@500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap`.
- Importa `tokens.css` (variabili CSS `--riso`, `--arancio`, `--space-4`, `--font-display`… e le classi tipografiche `.display-xl`, `.dish-name`, `.price`…). Il tema scuro «Sera» si attiva con `prefers-color-scheme: dark` o `data-theme="dark"` su `<html>`.
- Importa `components/bundle.css` per le classi dei componenti (`ds-btn`, `ds-item`, `ds-chip`, `ds-badge`, `ds-announce`, `ds-info`, `ds-header`, `ds-arch`, `ds-box`).
- Ogni componente ha `components/<Nome>/README.md` (quando usarlo, cosa fornire) e `preview.html` (markup di riferimento, apribile nel browser).
- `tokens.json` è la sorgente dei token, con una nota d'uso per ognuno; `tokens.css` è generato da lì.
- Logo e materiali di riferimento sono in `assets/`. Il logo va usato così com'è.

| Percorso | Contenuto |
|---|---|
| `tokens.json` | Token: colori (temi Giorno/Sera), tipografia, spaziature, raggi, layout |
| `tokens.css` | Gli stessi token come variabili CSS e classi tipografiche |
| `components/bundle.css` | Stili condivisi dei componenti |
| `components/*/` | Linee guida e anteprima di ogni componente |
| `assets/` | Logo e riferimenti visivi (packaging, post Instagram) |
| `design-system.json` | Indice originale di Claude Design |

## Brand book

Daniel's Sushi è un ristorante di sushi in Via Beato Giacomo 72 a Bitetto (BA). Si presenta come «#ITALIANSUSHI»: cucina giapponese con ingredienti e gusti pugliesi (stracciatella, pistacchio, mandorla, olio extravergine). Il sito deve far venire voglia di ordinare e far trovare il menù in due tocchi, soprattutto da telefono.

## Da dove viene lo stile

Tre fonti reali, tutte negli asset:

- **Logo** (`assets/Logos/logo.png`): serif nero su kraft, con le bacchette che formano la «h» di Sushi e un maki come puntino.
- **Packaging** (`assets/Riferimenti/packaging-sushi.jpg`): archi e semicerchi sovrapposti in ardesia, arancio bruciato, crema e kraft.
- **Post Instagram** (`assets/Riferimenti/grafica-*.png`): fondo crema, titoli condensati maiuscoli, illustrazioni a una o due tinte in cobalto, arancio e bordeaux.

Il sito unisce le tre cose: fondi carta (riso, kraft), tipografia da manifesto per i titoli, serif del logo per i piatti, archi del packaging come unico motivo grafico.

## Tono di voce

- Si scrive in italiano, dando del **tu** al cliente: «Effettua il tuo ordine!», «Ti aspettiamo questa sera».
- Frasi brevi, calde, da locale di paese. Gli avvisi sono diretti e concreti, come nei post: «Domani siamo regolarmente aperti», «Martedì aperto, mercoledì chiuso».
- I nomi dei piatti restano esattamente come nel menù, con il loro numero: «32. Daniel's roll», «GamberOne», «Philadelphia's poke». Non tradurli e non cambiarne le maiuscole.
- Prezzi in formato italiano: `14,00 €` (virgola, euro dopo, spazio). Pezzi come `8 pz.`.
- Niente emoji nel sito. Il punto esclamativo è ammesso solo nelle call to action.
- La nota sugli allergeni è sempre presente nel menù: «Per gli allergeni chiedere l'apposito menù al personale».

## Colore

- Pagina su `riso`, card su `carta`, sezioni alternate su `kraft`, footer su `ardesia` con testo `on-ardesia`.
- Testo in `sumi`; descrizioni e note in `sumi-muted`.
- Un solo colore d'azione: `arancio`. Il bottone primario è arancio con testo `on-arancio` (scuro), mai bianco. L'arancio come testo è sempre `arancio-ink`.
- `cobalto` è il colore degli avvisi e dei link; `shoyu` per i titoli promozionali e il badge Piccante; `wasabi` solo per Vegetariano.
- Al massimo due colori d'accento per schermata (di norma arancio + cobalto). Il resto è carta e inchiostro.
- I `brand-*` sono fissi in entrambi i temi e servono solo per archi e campiture decorative.
- Tema **Sera**: stessi ruoli, fondi scuri caldi. Ogni coppia testo/fondo dichiarata nelle note dei token regge 4.5:1 in entrambi i temi.

## Tipografia

- Titoli in **Oswald** (`display-xl`, `display-l`, `display-m`), sempre MAIUSCOLI, come i post. Un solo `display-xl` per pagina.
- Nomi dei piatti in **Source Serif 4** (`dish-name`): è il ponte con il serif del logo. `lead` in corsivo per una frase d'apertura per sezione.
- Tutto il resto in **Archivo**: `body`, `body-s`, `label` per i comandi, `price` con cifre tabellari, `caption` per badge e pezzi.
- Occhielli (`eyebrow`) maiuscoli e spaziati sopra i titoli: «DANIEL'S SUSHI · BITETTO».
- Tutti e tre i caratteri sono Google Fonts: `family=Oswald:wght@500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Archivo:wght@400;600;700`.

## Forma e spazio

- Il motivo grafico è l'**arco**: pannelli con la testa a semicerchio (`radius-arch-s`, `radius-arch-l`, o `border-radius: 999px 999px 0 0` in CSS) e semicerchi sovrapposti, come sul packaging. Usalo per incorniciare le foto dei piatti e per una fascia divisoria per pagina, non come sfondo ovunque.
- Bottoni e chip a pillola (`radius-pill`), card a `radius-md`, input e badge a `radius-sm`.
- Bordi e filetti, non ombre: separa le voci del menù con `linea`; i controlli hanno bordo `linea-forte`.
- Contenitore massimo `container`, testo al massimo `measure`. Margine laterale `space-4` su mobile, `space-12` da tablet. Sezioni distanziate di `space-16` (mobile) e `space-24` (desktop).
- Tutto ciò che si tocca è alto almeno `tap` (44px). Il focus da tastiera è un anello pieno di 2px in `focus` con 2px di distacco.

## Immagini

- Le foto dei piatti stanno dentro un arco o in un rettangolo `radius-sm`, su fondo `kraft`.
- Le illustrazioni dei post (pesce inciso, ramen, sushi isometrico) possono entrare nel sito come immagini a una tinta; non ridisegnarle.
- Il logo si usa così com'è, su `kraft` o `riso`. Non ricolorarlo e non ricostruirlo in testo.

## Iconografia

Il sistema non ha un set di icone proprio. Usa icone lineari a tratto 1.75px, angoli arrotondati, nel colore del testo (`currentColor`), sempre accompagnate da una parola per orari, indirizzo, telefono e Instagram. Niente emoji.

## Contenuti del menù

Il menù reale è organizzato in: Tartare, Sashimi, Starter, Sushi Gio, Hosomaki, Nigiri, Triangolini, Uramaki, Special roll, Poke bowl (anche «Componi la tua Poke»), Box, Primi, Dessert, Beverage. Usa questi nomi per la navigazione per categorie (`CategoryNav`) e le voci come in `MenuItem`.
