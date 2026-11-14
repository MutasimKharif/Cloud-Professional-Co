# CloudPros design system

**Direction: engineering-grade.** CloudPros sells something rare: one team that
covers AWS, the network, and the physical data center underneath. The site
should feel like a well-run facility — calm, precise, documented — not like a
startup landing page. Warm paper backgrounds, ink-dark bands, and the brand
orange used the way a facility uses safety orange: sparingly, to mark what
matters.

Source of truth for values: `assets/css/site.css` (`:root` and the dark-mode
block). Pages use the variable names below, never raw values.

## Color

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `#FAFAF7` | `#0B0F15` | Page background |
| `--surface` | `#FFFFFF` | `#121821` | Cards, inputs, raised panels |
| `--surface-2` | `#F2F2EE` | `#0F141C` | Alternate section background |
| `--line` | `#E3E3DD` | `#232B37` | Dividers, card borders |
| `--line-strong` | `#8A8F96` | `#5B6573` | Input borders (3:1 against surface) |
| `--text` | `#12161C` | `#EEF0EC` | Headings, body |
| `--text-2` | `#3D434C` | `#BAC1CA` | Secondary text, leads |
| `--text-3` | `#5F6670` | `#8D96A2` | Captions, meta, labels |
| `--ink` | `#0B0F15` | `#05070B` | Dark bands (hero, CTA, footer) |
| `--ink-2` | `#151B24` | `#0D1219` | Panels inside dark bands |
| `--on-ink` / `--on-ink-2` | `#F3F4F1` / `#A9B0BA` | same | Text on ink |
| `--signal` | `#FF9900` | `#FF9900` | Brand orange: primary button fill, markers, diagram highlights. **Never as text on light backgrounds.** |
| `--signal-hover` | `#FFAD33` | `#FFAD33` | Primary button hover |
| `--on-signal` | `#12161C` | `#12161C` | Text on orange (8.5:1) |
| `--link` | `#9A5300` | `#FFB23F` | Text links on light / dark |
| `--success` | `#1E7B45` | `#4ADE80` | Form success |
| `--error` | `#B42318` | `#F87171` | Form errors |

Rules: one brand color, no gradients, no second accent. White text never sits
on orange (2.1:1 fails); orange buttons carry ink text. All body text pairs
are ≥ 4.5:1 in both themes.

## Typography

- **Display — Archivo** (variable, 600–750): headings only. Slightly tight
  tracking (−0.02em) at large sizes.
- **Text — Inter** (variable, 400/500/600): body, UI, buttons.
- **Labels — IBM Plex Mono 500**: eyebrows, step numbers, spec labels.
  Uppercase, +0.08em tracking. Used to make the "documented" feel.
- **Arabic — IBM Plex Sans Arabic** (400/600/700) for all Arabic text, headings
  included. Mono labels fall back to it in Arabic.

All fonts are self-hosted from `assets/fonts/` (SIL OFL) — no third-party
requests.

| Token | Size / line height | Use |
|---|---|---|
| `--fs-display` | clamp(2.5rem → 4rem) / 1.04 | Home hero only |
| `--fs-h1` | clamp(2.125rem → 3rem) / 1.08 | Page titles |
| `--fs-h2` | clamp(1.75rem → 2.25rem) / 1.15 | Section titles |
| `--fs-h3` | 1.375rem / 1.3 | Block titles |
| `--fs-h4` | 1.125rem / 1.4 | Card titles |
| `--fs-lead` | 1.1875rem / 1.6 | Intro paragraphs |
| `--fs-body` | 1rem / 1.65 | Body |
| `--fs-small` | 0.875rem / 1.5 | Meta, captions |
| `--fs-label` | 0.75rem / 1.4 | Mono labels |

Body copy max width 68ch.

## Spacing

4-based scale: `--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 ·
`--s-6` 32 · `--s-7` 48 · `--s-8` 64 · `--s-9` 96 · `--s-10` 128 (px).

- Section padding: `--s-9` desktop, `--s-8` on phones.
- Content width: 1200px (`--container`), gutters 24px (20px on phones).
- Layouts are left-aligned on a 12-column grid. Centered text is reserved for
  the closing CTA band.

## Shape and depth

- Radius: `--r-sm` 6px (buttons, inputs, tags) · `--r-md` 10px (cards) ·
  `--r-lg` 16px (images, diagrams).
- Depth comes from borders (`--line`). One shadow, `--shadow-raised`, only on
  the sticky header after scroll and on hovered linked cards.

## Components

- **Buttons**: *primary* (orange fill, ink text), *secondary* (1px
  `--line-strong` outline, text color), *quiet* (text + arrow, link color).
  Height 48px (44px small). Hover: primary lightens, secondary fills
  `--surface-2`. Focus: 3px `--signal` outline with 2px offset on every
  interactive element. Disabled: 50% opacity, no pointer.
- **Links**: `--link`, underline on hover; inside body text always underlined.
- **Inputs**: visible label above, 48px height, `--surface` fill,
  `--line-strong` border; error text below in `--error` with an icon, linked
  via `aria-describedby`. Placeholders only for format hints.
- **Cards**: `--surface`, 1px `--line`, `--r-md`, 24–32px padding. Linked
  cards lift 2px and gain `--shadow-raised` on hover.
- **Spec list**: mono label + value rows separated by `--line` — used for
  "what's included" and contact details.
- **Header**: 72px, paper background, sticky; current page marked with an
  orange 2px underline, not a filled pill. Phone: full-width sheet menu.
- **Footer**: ink band, four columns (brand, services, company, contact),
  newsletter row, legal line.
- **CTA band**: ink background, centered heading, primary + secondary action.

## Imagery and icons

- **Icons**: one set — 24px line icons, 1.5px stroke, `currentColor`
  (Heroicons outline style). In orange only when they mark a step or status.
- **Diagrams**: original SVG schematics (topology, layers, pipelines) drawn
  with `--line`, `--text-2` and one `--signal` highlight. They explain the
  service; they are not decoration.
- **Photos**: only real-looking photographs of facilities, equipment and
  people at work, served as WebP with explicit width/height, `--r-lg`
  corners. No images with garbled AI-generated text, no stock "futuristic
  city" backgrounds.
- **Logo**: cloud outline mark in `--signal` + "CloudPros" wordmark in Archivo
  700.

## Motion

Transitions 150–200ms ease-out on color, background, border, transform and
opacity only. Everything respects `prefers-reduced-motion`.
