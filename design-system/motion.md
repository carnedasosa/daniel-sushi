# Movimento

Il sito si muove poco, come un foglio di carta: niente rimbalzi, parallax o elementi che volano. Il movimento serve a far capire cosa reagisce al tocco e a dare un solo momento di carattere, gli archi del packaging che salgono.

## Regole

- Si animano solo `transform` e `opacity`. Mai larghezze, altezze, margini o colori di sfondo delle sezioni.
- Durate: `dur-fast` per hover e pressione, `dur-base` per i cambi di stato, `dur-slow` per gli ingressi, `dur-arch` solo per gli archi. Niente oltre i 700ms.
- Curva: `ease-out` per tutto ciò che entra o reagisce; `ease-in-out` solo per ciò che esce. Niente curve elastiche.
- **Un solo momento d'effetto per pagina**: gli archi che salgono dal bordo inferiore uno dopo l'altro (`m-arches`, sfalsati di `stagger`). In home stanno nell'hero; la fascia divisoria li ripete solo allo scroll (`m-arches--scroll`).
- Ogni elemento parte già visibile: un ingresso va da opacità 0.35 a 1, mai da 0. Se l'animazione non parte, la pagina è comunque completa.
- La comparsa allo scroll (`m-reveal`) usa le scroll-driven animations del CSS; dove il browser non le supporta la sezione è semplicemente ferma. Nessuno script.
- Con `prefers-reduced-motion: reduce` tutto resta fermo: niente transizioni né animazioni.

## Cosa si muove

| Classe | Dove | Movimento |
|---|---|---|
| `ds-btn`, `ds-chip`, `ds-nav a` | Bottoni, chip, link di navigazione | Colori in `dur-fast`; il bottone sale di 1px al passaggio e scende di 1px alla pressione |
| `m-press` | Qualsiasi controllo a pillola fuori dai componenti | Sale di 1px e scurisce del 5% al passaggio; anello `focus` da tastiera |
| `m-lift` | Card dei piatti, delle box e della materia prima | Sale di 4px al passaggio, senza ombre |
| `m-zoom` | Contenitore di una foto (arco o card) | La foto si ingrandisce del 4% al passaggio; il contenitore taglia |
| `m-arches` | Gruppo di archi nell'hero | Ogni arco sale dal basso, sfalsato di `stagger` × `--i` |
| `m-arches--scroll` | Fascia divisoria ad archi | Gli archi salgono mentre la fascia entra nello schermo |
| `m-enter` | Occhiello, titolo, frase e bottoni dell'hero | Ingresso al caricamento, sfalsato con `--i` |
| `m-reveal` | Titoli di sezione e griglie di card | Ingresso mentre entrano nello schermo |
| `m-swap-a` / `m-swap-b` | Elenco dei piatti nel menù | Breve ingresso a ogni cambio di categoria: alterna le due classi per farlo ripartire |

## Da non fare

- Animare il logo o le illustrazioni dei post.
- Cursori personalizzati, testo che si scrive da solo, contatori che girano.
- Più di un gruppo di archi animato al caricamento.
