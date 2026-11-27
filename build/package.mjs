// Copies only the files the web server needs into dist/cloudpros/, ready to copy to
// C:\wamp64\www\cloudpros (or any Apache web folder).
// Run: npm run package   (after npm run build)
//
// Left out on purpose: build/, deploy/, .github/, original photos (assets/images/),
// docs, package files and your own config.local.php (the server keeps its own).
import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist', 'cloudpros');

const ROOT_FILES = /^(.*\.(html|php|svg|png|ico|txt|xml)|\.htaccess)$/i;
const NEVER = new Set(['config.local.php']);
const DIRS = ['ar', 'assets', 'includes', 'database'];
const SKIP_IN_DIRS = [path.join('assets', 'images')];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

let files = 0;
let bytes = 0;
const count = async (p) => { files += 1; bytes += (await stat(p)).size; };

for (const name of await readdir(root)) {
  const src = path.join(root, name);
  if (!(await stat(src)).isFile() || NEVER.has(name) || !ROOT_FILES.test(name)) continue;
  await cp(src, path.join(out, name));
  await count(src);
}

for (const dir of DIRS) {
  await cp(path.join(root, dir), path.join(out, dir), {
    recursive: true,
    filter: async (src) => {
      const rel = path.relative(root, src);
      if (SKIP_IN_DIRS.some((s) => rel === s || rel.startsWith(s + path.sep))) return false;
      if ((await stat(src)).isFile()) await count(src);
      return true;
    },
  });
}

console.log(`dist/cloudpros: ${files} files, ${(bytes / 1048576).toFixed(1)} MB`);
console.log('Copy the contents of dist/cloudpros to the web folder (keep the server\'s config.local.php).');
