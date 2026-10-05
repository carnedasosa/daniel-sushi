// Genera la barra delle categorie e le categorie del menù dentro menu.html a partire da data/menu.json.
// Uso: node scripts/genera-menu.mjs  (oppure npm run menu)
// Sostituisce solo il contenuto tra i marcatori <!-- genera-menu:... --> e <!-- /genera-menu:... -->.

import { readFile, writeFile } from 'node:fs/promises';

// Categoria aperta all'arrivo sulla pagina (se l'indirizzo non ne indica un'altra con #id).
const CATEGORIA_INIZIALE = 'special-roll';

const radice = new URL('..', import.meta.url);
const dati = JSON.parse(await readFile(new URL('data/menu.json', radice), 'utf8'));
const percorsoPagina = new URL('menu.html', radice);
let pagina = await readFile(percorsoPagina, 'utf8');

const esc = (s) => String(s)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

// Prezzi in formato italiano: 14,00 € (spazio non separabile prima dell'euro).
const prezzo = (n) => `${n.toFixed(2).replace('.', ',')}&nbsp;€`;

function badge(v) {
  const out = [];
  if (v.piccante) out.push(`<span class="ds-badge ds-badge--spicy">${esc(v.piccante === true ? 'Piccante' : v.piccante)}</span>`);
  if (v.veg) out.push('<span class="ds-badge ds-badge--veg">Vegetariano</span>');
  if (v.casa) out.push('<span class="ds-badge ds-badge--new">Della casa</span>');
  if (out.length > 3) throw new Error(`Troppi badge (massimo tre) per «${v.nome}»`);
  return out;
}

function voce(v, rientro) {
  const righe = [
    '<article class="dish">',
    `  <span class="dish__num">${v.num ?? ''}</span>`,
    `  <h3 class="dish__name">${esc(v.nome)}</h3>`,
    `  <span class="dish__price">${prezzo(v.prezzo)}</span>`,
  ];
  if (v.desc) righe.push(`  <p class="dish__desc">${esc(v.desc)}</p>`);
  const b = badge(v);
  if (b.length) righe.push(`  <div class="dish__tags">${b.join('')}</div>`);
  righe.push('</article>');
  return righe.map((r) => rientro + r).join('\n');
}

function componi(c, rientro) {
  return [
    '<div class="poke-builder" id="componi">',
    `  <h3>${esc(c.titolo)}</h3>`,
    '  <div class="poke-builder__groups">',
    ...c.gruppi.map((g, i) =>
      `    <div><p class="poke-builder__title">${i + 1} · ${esc(g.nome)}</p><p class="poke-builder__list">${g.voci.map(esc).join(' · ')}</p></div>`),
    '  </div>',
    '</div>',
  ].map((l) => rientro + l).join('\n');
}

// «8 pz. · 40 piatti» quando la categoria ha i pezzi, altrimenti «7 voci».
const nota = (c) => (c.pezzi ? `${c.pezzi} · ${c.voci.length} piatti` : `${c.voci.length} voci`);

if (!dati.categorie.some((c) => c.id === CATEGORIA_INIZIALE)) {
  throw new Error(`Categoria iniziale «${CATEGORIA_INIZIALE}» non presente in data/menu.json`);
}

const rn = '      ';
const nav = [
  `${rn}<nav class="ds-cats" aria-label="Categorie del menù">`,
  ...dati.categorie.map((c) =>
    `${rn}  <a class="ds-chip" href="#${c.id}"${c.id === CATEGORIA_INIZIALE ? ' aria-current="true"' : ''}>${esc(c.nome)}</a>`),
  `${rn}</nav>`,
].join('\n');

const r = '        ';
const sezioni = dati.categorie.map((c) => {
  const attiva = c.id === CATEGORIA_INIZIALE ? ' is-active' : '';
  const parti = [
    `${r}<section class="menu-cat${attiva}" id="${c.id}" aria-labelledby="${c.id}-titolo">`,
    `${r}  <div class="menu-cat__head">`,
    `${r}    <h2 id="${c.id}-titolo">${esc(c.nome)}</h2>`,
    `${r}    <span class="menu-cat__note">${esc(nota(c))}</span>`,
    `${r}  </div>`,
    `${r}  <div class="dishes">`,
    ...c.voci.map((v) => voce(v, `${r}    `)),
    `${r}  </div>`,
  ];
  if (c.componi) parti.push(componi(c.componi, `${r}  `));
  parti.push(`${r}</section>`);
  return parti.join('\n');
}).join('\n');

const allergeni = `${r}<p class="menu-allergeni">${esc(dati.nota)}.</p>`;

function sostituisci(html, nome, contenuto) {
  const re = new RegExp(`(<!-- genera-menu:${nome} -->)[\\s\\S]*?(\\n[ \\t]*<!-- /genera-menu:${nome} -->)`);
  if (!re.test(html)) throw new Error(`Marcatore genera-menu:${nome} non trovato in menu.html`);
  return html.replace(re, (_, apre, chiude) => `${apre}\n${contenuto}${chiude}`);
}

pagina = sostituisci(pagina, 'nav', nav);
pagina = sostituisci(pagina, 'sezioni', `${sezioni}\n${allergeni}`);
await writeFile(percorsoPagina, pagina);

const totale = dati.categorie.reduce((n, c) => n + c.voci.length, 0);
console.log(`menu.html aggiornato: ${dati.categorie.length} categorie, ${totale} voci.`);
