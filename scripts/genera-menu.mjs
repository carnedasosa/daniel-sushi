// Genera le categorie del menù dentro menu.html a partire da data/menu.json.
// Uso: node scripts/genera-menu.mjs  (oppure npm run menu)
// Sostituisce solo il contenuto tra i marcatori <!-- genera-menu:... --> e <!-- /genera-menu:... -->.

import { readFile, writeFile } from 'node:fs/promises';

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

function badge(voce, categoria) {
  const out = [];
  const pz = voce.pz ?? categoria.pezzi;
  if (pz) out.push(`<span class="ds-badge ds-badge--pz">${esc(pz)}</span>`);
  if (voce.piccante) out.push(`<span class="ds-badge ds-badge--spicy">${esc(voce.piccante === true ? 'Piccante' : voce.piccante)}</span>`);
  if (voce.veg) out.push('<span class="ds-badge ds-badge--veg">Vegetariano</span>');
  if (voce.casa) out.push('<span class="ds-badge ds-badge--new">Della casa</span>');
  if (voce.info) out.push(`<span class="ds-badge ds-badge--info">${esc(voce.info)}</span>`);
  if (out.length > 3) throw new Error(`Troppi badge (massimo tre) per «${voce.nome}»`);
  return out;
}

function voce(v, categoria, rientro) {
  const righe = [
    '<article class="ds-item">',
    `  <span class="ds-item__num">${v.num ?? ''}</span>`,
    `  <h3 class="ds-item__name">${esc(v.nome)}</h3>`,
    `  <span class="ds-item__price">${prezzo(v.prezzo)}</span>`,
  ];
  if (v.desc) righe.push(`  <p class="ds-item__desc">${esc(v.desc)}</p>`);
  const b = badge(v, categoria);
  if (b.length) righe.push(`  <div class="ds-item__meta">${b.join('')}</div>`);
  righe.push('</article>');
  return righe.map((r) => rientro + r).join('\n');
}

function componi(c, rientro) {
  const gruppi = c.gruppi.map((g) => [
    '    <div>',
    `      <h4 class="ds-eyebrow">${esc(g.nome)}</h4>`,
    '      <ul class="body-s">',
    ...g.voci.map((x) => `        <li>${esc(x)}</li>`),
    '      </ul>',
    '    </div>',
  ].join('\n')).join('\n');
  return [
    '<section class="ds-info poke-builder" id="componi" aria-labelledby="componi-titolo">',
    `  <h3 id="componi-titolo">${esc(c.titolo)}</h3>`,
    '  <p class="body-s box-desc">Scegli una base e aggiungi proteine, condimenti, salse e topping.</p>',
    '  <div class="poke-builder__groups">',
    gruppi,
    '  </div>',
    '</section>',
  ].map((r) => r.split('\n').map((l) => rientro + l).join('\n')).join('\n');
}

const r = '      ';
const rn = '        ';
const nav = [
  `${rn}<nav class="ds-cats" aria-label="Categorie del menù">`,
  ...dati.categorie.map((c, i) =>
    `${rn}  <a class="ds-chip" href="#${c.id}"${i === 0 ? ' aria-current="true"' : ''}>${esc(c.nome)}</a>`),
  `${rn}</nav>`,
].join('\n');

const sezioni = dati.categorie.map((c) => {
  const parti = [
    `${r}<section class="menu-cat" id="${c.id}" aria-labelledby="${c.id}-titolo">`,
    `${r}  <div class="menu-cat__head">`,
    `${r}    <h2 class="display-m" id="${c.id}-titolo">${esc(c.nome)}</h2>`,
  ];
  if (c.pezzi) parti.push(`${r}    <span class="ds-badge ds-badge--pz">${esc(c.pezzi)}</span>`);
  parti.push(`${r}  </div>`, `${r}  <div class="dish-list">`);
  parti.push(...c.voci.map((v) => voce(v, c, `${r}    `)));
  parti.push(`${r}  </div>`);
  if (c.componi) parti.push(componi(c.componi, `${r}  `));
  parti.push(`${r}</section>`);
  return parti.join('\n');
}).join('\n');

const nota = `${r}<p class="note">${esc(dati.nota)}</p>`;

function sostituisci(html, nome, contenuto) {
  const re = new RegExp(`(<!-- genera-menu:${nome} -->)[\\s\\S]*?(\\n[ \\t]*<!-- /genera-menu:${nome} -->)`);
  if (!re.test(html)) throw new Error(`Marcatore genera-menu:${nome} non trovato in menu.html`);
  return html.replace(re, (_, apre, chiude) => `${apre}\n${contenuto}${chiude}`);
}

pagina = sostituisci(pagina, 'nav', nav);
pagina = sostituisci(pagina, 'sezioni', `${sezioni}\n${nota}`);
await writeFile(percorsoPagina, pagina);

const totale = dati.categorie.reduce((n, c) => n + c.voci.length, 0);
console.log(`menu.html aggiornato: ${dati.categorie.length} categorie, ${totale} voci.`);
