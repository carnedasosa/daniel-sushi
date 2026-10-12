// Collega i bottoni «Ordina» all'app degli ordini.
// Scrivi qui l'indirizzo dell'app, per esempio 'https://ordini.danielsushi.it'.
// Finché resta vuoto, i bottoni portano alla sezione «Dove siamo» come prima.
const URL_ORDINI = '';

if (URL_ORDINI) {
  const base = URL_ORDINI.replace(/\/+$/, '');
  // data-ordina vuoto → menù dell'app; data-ordina="box" → categoria Box del menù.
  document.querySelectorAll('a[data-ordina]').forEach((link) => {
    const categoria = link.dataset.ordina;
    link.href = categoria ? `${base}/#${categoria}` : `${base}/`;
  });
}
