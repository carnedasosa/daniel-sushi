# Movimento

Il sito si muove come un foglio di carta: niente rimbalzi, parallax o elementi che volano. Il movimento fa capire cosa reagisce al tocco e dà un solo momento di carattere: i blob colorati dell'hero che si allargano sotto la foto.

## Regole

- Si animano solo `transform` e `opacity` (più l'ombra delle card al passaggio).
- Durate: `--dur-fast` per hover e pressione, `--dur-base` per i cambi di stato, `--dur-slow` per gli ingressi, `--dur-blob` solo per i blob dell'hero. Niente oltre il secondo.
- Curva: `--ease-out` per tutto ciò che entra o reagisce; `--ease-in-out` solo per ciò che esce. Niente curve elastiche.
- **Un solo momento d'effetto per pagina**: i blob dell'hero (`m-blob`, sfalsati con `--i`).
- Ogni elemento parte già visibile: un ingresso va da opacità 0.35/0.4 a 1, mai da 0.
- La comparsa allo scroll (`m-reveal`) usa le scroll-driven animations del CSS; dove non sono supportate la sezione è ferma. Nessuno script.
- Con `prefers-reduced-motion: reduce` tutto resta fermo.

## Cosa si muove

| Classe | Dove | Movimento |
|---|---|---|
| `ds-btn`, `ds-chip` | Bottoni e chip | Colori in `--dur-fast`; il bottone sale di 1px al passaggio e scende alla pressione |
| `m-press` | Controlli fuori dai componenti | Sale di 1px, scende alla pressione |
| `m-lift` | Card di piatti, box, ingredienti | Sale di 4px al passaggio |
| `m-zoom` | Contenitore di una foto | La foto si ingrandisce del 4%; il contenitore taglia |
| `m-blob` | Blob SVG dell'hero | Si allargano e ruotano appena fino al loro posto, sfalsati con `--i` |
| `m-enter` | Occhiello, titolo, frase e bottoni dell'hero | Ingresso al caricamento, sfalsato con `--i` |
| `m-reveal` | Titoli di sezione e griglie | Ingresso mentre entrano nello schermo |
| `m-swap-a` / `m-swap-b` | Elenco dei piatti nel menù | Breve ingresso a ogni cambio di categoria |

## Da non fare

- Animare il logo, le illustrazioni a tratto o le onde.
- Cursori personalizzati, testo che si scrive da solo, contatori che girano.
- Più di un gruppo di blob animato al caricamento.
