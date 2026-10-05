# Motion

Anteprima delle animazioni del sistema: archi che salgono, ingresso dell'hero, pressione dei bottoni, card che si alzano e cambio di categoria nel menù.

Le classi `m-*` stanno in `components/bundle.css`; durate e curve sono i token delle famiglie `durata` ed `easing`. Le regole complete sono nella sezione Movimento (`motion.md`).

Il consumatore aggiunge la classe all'elemento e, per le sequenze, l'indice con `style="--i: 0"`, `--i: 1`… Per il menù alterna `m-swap-a` e `m-swap-b` sul contenitore dell'elenco a ogni cambio di categoria.
