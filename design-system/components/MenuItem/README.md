# MenuItem

Una voce del menù: numero, nome, prezzo, descrizione e badge, separata dalla successiva da un filetto `linea`.

Il consumatore fornisce: `num` (il numero del menù, es. 32), `name` (esatto come nel menù), `price` in formato `14,00 €`, `desc` (ingredienti, testo del menù) e zero-tre badge (`Badge`).

- Nome in `dish-name` (serif), numero in `caption` `arancio-ink`, prezzo in `price` con cifre tabellari.
- Le voci stanno in colonna, larghe al massimo ~640px; su mobile la griglia resta a tre colonne e la descrizione va a capo.
- Non mettere foto in ogni voce: le foto vanno nelle card in evidenza.
