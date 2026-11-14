// Converts the source photos in assets/images/ into responsive WebP files in assets/img/.
// Run: npm run images   (needs the `sharp` dev dependency)
import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'assets/images');
const OUT = path.join(root, 'assets/img');

// source file -> output name. Only clean photographs; images with garbled
// AI-generated text or placeholder copy are intentionally left out.
const MAP = {
  'Datacenter-build.jpg': 'dc-build',
  'datacenter-building.png': 'dc-raised-floor',
  'EMS.png': 'dc-ems',
  'firefight.png': 'dc-fire',
  'HVAC.png': 'dc-cooling',
  'UPS.png': 'dc-ups',
  'HWlifecycle.png': 'mt-lifecycle',
  'proactive.png': 'mt-monitoring',
  'patch-mgm.png': 'mt-patching',
  'on-premise-sever-backup.png': 'mt-backup',
  'TechSupp.png': 'mt-support',
  'Prof.installations.png': 'cctv-install',
  'Remote.monitoring.png': 'cctv-remote',
  'Integration.png': 'cctv-integration',
  'Readiness-Assess.jpg': 'mig-assessment',
  'data-mig.jpg': 'mig-data',
  'devops-isometric.jpg': 'devops-platform',
  'devops-on-desktop.jpg': 'devops-desk',
  'mutasim-kharif.jpg': 'team-mutasim',
};
const WIDTHS = [640, 1200];

await mkdir(OUT, { recursive: true });
const manifest = {};
for (const [file, name] of Object.entries(MAP)) {
  const input = sharp(path.join(SRC, file));
  const meta = await input.metadata();
  const variants = [];
  for (const w of WIDTHS) {
    const width = Math.min(w, meta.width);
    if (variants.includes(width)) continue;
    await sharp(path.join(SRC, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 74, effort: 5 })
      .toFile(path.join(OUT, `${name}-${width}.webp`));
    variants.push(width);
  }
  manifest[name] = { w: meta.width, h: meta.height, variants };
  console.log(`${file} -> ${name} ${variants.join(',')}`);
}
await writeFile(path.join(root, 'build/images.json'), JSON.stringify(manifest, null, 2) + '\n');
