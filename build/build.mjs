// Static site build: renders every page in English (/) and Arabic (/ar/).
// Run: npm run build
import { writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderPage, SITE } from './lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pagesDir = path.join(root, 'build/pages');
const only = process.argv.slice(2);

const files = (await readdir(pagesDir)).filter((f) => f.endsWith('.mjs')).sort();
await mkdir(path.join(root, 'ar'), { recursive: true });
const urls = [];
for (const f of files) {
  const mod = await import(pathToFileURL(path.join(pagesDir, f)).href);
  const pages = Array.isArray(mod.default) ? mod.default : [mod.default];
  for (const page of pages) {
    if (only.length && !only.includes(page.slug)) continue;
    for (const lang of page.langs || ['en', 'ar']) {
      const html = page.raw ? page.raw(lang) : renderPage(page, lang);
      const out = path.join(root, lang === 'ar' ? 'ar' : '', `${page.slug}.html`);
      await writeFile(out, html);
      if (!page.noindex && !page.raw) urls.push(`${lang === 'ar' ? 'ar/' : ''}${page.slug === 'index' ? '' : page.slug + '.html'}`);
    }
    console.log(`built ${page.slug}`);
  }
}
if (SITE.url && !only.length) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE.url}/${u}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile(path.join(root, 'sitemap.xml'), xml);
  await writeFile(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /adminpanel.php\nSitemap: ${SITE.url}/sitemap.xml\n`);
  console.log('wrote sitemap.xml and robots.txt');
}
