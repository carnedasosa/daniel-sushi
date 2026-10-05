// Barra delle categorie del menù: segna con aria-current la categoria visibile
// e la porta in vista nella barra che scorre in orizzontale. Senza JS i chip restano semplici link.
(function () {
  var bar = document.querySelector('.menu-bar .ds-cats');
  if (!bar || !('IntersectionObserver' in window)) return;

  var chips = Array.prototype.slice.call(bar.querySelectorAll('a[href^="#"]'));
  var byId = {};
  chips.forEach(function (chip) { byId[chip.getAttribute('href').slice(1)] = chip; });
  var sections = chips
    .map(function (chip) { return document.getElementById(chip.getAttribute('href').slice(1)); })
    .filter(Boolean);
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  var current = null;

  function setCurrent(id) {
    if (id === current || !byId[id]) return;
    current = id;
    chips.forEach(function (chip) {
      if (chip === byId[id]) chip.setAttribute('aria-current', 'true');
      else chip.removeAttribute('aria-current');
    });
    var chip = byId[id];
    var left = chip.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2;
    bar.scrollTo({ left: Math.max(0, left), behavior: calm.matches ? 'auto' : 'smooth' });
  }

  // Una categoria è "attiva" quando attraversa la fascia appena sotto la barra.
  var visible = new Set();
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) visible.add(e.target);
      else visible.delete(e.target);
    });
    var first = sections.find(function (s) { return visible.has(s); });
    if (first) setCurrent(first.id);
  }, { rootMargin: '-80px 0px -60% 0px' });

  sections.forEach(function (s) { observer.observe(s); });
})();
