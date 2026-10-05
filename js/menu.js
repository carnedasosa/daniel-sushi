// Barra delle categorie del menù: mostra una categoria alla volta, come nel prototipo.
// Il chip scelto prende aria-current e l'elenco rientra con m-swap-a / m-swap-b (motion.md).
// L'indirizzo con #id apre direttamente quella categoria (es. menu.html#poke-bowl dalla home).
// Senza JavaScript la classe .js manca, tutte le categorie restano visibili e i chip sono semplici ancore.
(function () {
  var bar = document.querySelector('.menu-bar .ds-cats');
  if (!bar) return;

  var chips = Array.prototype.slice.call(bar.querySelectorAll('a[href^="#"]'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('.menu-cat'));
  var byId = {};
  sections.forEach(function (s) { byId[s.id] = s; });
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  var current = (sections.filter(function (s) { return s.classList.contains('is-active'); })[0] || sections[0]).id;
  var flip = false;

  function show(id, fromClick) {
    if (!byId[id]) return;
    var changed = id !== current;
    current = id;
    sections.forEach(function (s) { s.classList.toggle('is-active', s.id === id); });
    chips.forEach(function (chip) {
      if (chip.getAttribute('href') === '#' + id) chip.setAttribute('aria-current', 'true');
      else chip.removeAttribute('aria-current');
    });

    // Breve ingresso dell'elenco a ogni cambio di categoria.
    if (changed) {
      var list = byId[id].querySelector('.dishes');
      list.classList.remove('m-swap-a', 'm-swap-b');
      list.classList.add(flip ? 'm-swap-a' : 'm-swap-b');
      flip = !flip;
    }

    // Il chip attivo resta visibile nella barra che scorre in orizzontale.
    var chip = bar.querySelector('a[aria-current="true"]');
    var left = chip.offsetLeft - bar.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2;
    bar.scrollTo({ left: Math.max(0, left), behavior: calm.matches ? 'auto' : 'smooth' });

    // Se si era scesi in un elenco lungo, si riparte dall'inizio della nuova categoria.
    if (fromClick) {
      var barBottom = bar.getBoundingClientRect().bottom;
      var top = byId[id].getBoundingClientRect().top;
      if (top < barBottom) window.scrollBy(0, top - barBottom - 24);
    }
  }

  bar.addEventListener('click', function (e) {
    var chip = e.target.closest('a[href^="#"]');
    if (!chip) return;
    e.preventDefault();
    var id = chip.getAttribute('href').slice(1);
    show(id, true);
    history.replaceState(null, '', '#' + id);
  });

  function fromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (byId[id]) show(id, false);
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();
})();
