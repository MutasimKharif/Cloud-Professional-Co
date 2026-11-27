# CloudPros website

Marketing site and client area for **CloudPros** — AWS cloud, networking and data
center engineering, Riyadh. English at `/`, Arabic (right-to-left) at `/ar/`.

- **Front end:** static HTML generated from `build/`, one stylesheet
  (`assets/css/site.css`), a small script (`assets/js/site.js`). No CDN, no
  framework, self-hosted fonts. Design rules live in [`DESIGN.md`](DESIGN.md).
- **Back end:** plain PHP 8.1+ with PDO/MySQL for the contact form, newsletter,
  client sign-up/sign-in and the admin panel.
- **Hosting:** Apache on WampServer (Windows). See
  [`deploy/wamp/README.md`](deploy/wamp/README.md).

## Project layout

```
index.html, services.html, …     generated pages (English) — don't edit by hand
ar/*.html                        generated pages (Arabic)
build/                           page sources and the generator
  pages/*.mjs                    content for every page, English + Arabic side by side
  pages/insights.mjs             Insights articles (each becomes its own page)
  lib.mjs                        layout, header/footer, shared components, service list,
                                 and CASES (the "Selected work" section on the home page)
  service-details.mjs            per-service "at a glance", deliverables and FAQ
  diagrams.mjs                   the SVG diagrams
  images.mjs                     converts photos in assets/images/ to WebP in assets/img/
  package.mjs                    copies only the server's files into dist/cloudpros/
assets/css, assets/js            styles and scripts (site + admin)
assets/fonts                     Inter, Archivo, IBM Plex Mono, IBM Plex Sans Arabic (SIL OFL)
assets/img                       optimized photos used by the pages
assets/images                    original source photos (not served by any page)
includes/bootstrap.php           config, DB connection, sessions, CSRF helpers
process_form.php                 contact form → `contacts` table
newsletter.php                   footer sign-up → `newsletter_subscribers`
signup.php / signin.php / signout.php
adminpanel.php + api.php         admin dashboard (admins only, CSRF-protected)
database/schema.sql              tables
database/create-admin.php        CLI script to create the first administrator
.htaccess                        Apache rules: blocks private files, adds security headers
deploy/wamp/                     WampServer guide and virtual host example
```

## Editing content

1. Change the text in `build/pages/*.mjs` (each string is `t('English', 'Arabic')`),
   or the service list in `build/lib.mjs`.
2. Run `npm run build`. It regenerates every page in both languages.
3. Commit the source **and** the generated `.html` files — the server needs no build step.
   A check on every pull request fails if the generated pages don't match `build/`.

### Adding real projects ("Selected work")

The home page has a "Selected work" section that stays hidden until there is at
least one real project. Add entries to `CASES` in `build/lib.mjs` (sector, title,
problem, what we did, result — English and Arabic), then run `npm run build`.

### Adding an article

Add an entry to `ARTICLES` in `build/pages/insights.mjs` (slug, category, title,
summary, takeaways, body in both languages) and rebuild. It appears on
`blog.html` and gets its own page in `/` and `/ar/`.

To add photos, put the original in `assets/images/`, map it in
`build/images.mjs`, then run `npm install` once and `npm run images`.

Set your live domain so pages get canonical URLs, hreflang links, a sitemap and
absolute social-preview URLs:

```bash
SITE_URL=https://www.your-domain.com npm run build
```

Without `SITE_URL` the build still writes a `robots.txt`, just without a sitemap.
If you set it, also add it as a repository variable named `SITE_URL`
(Settings → Secrets and variables → Actions → Variables) so the pull-request check
builds the same pages.

## Running locally for development

```bash
cp config.example.php config.local.php   # fill in your local MySQL details
mysql -u root -p -e "CREATE DATABASE cloudpros CHARACTER SET utf8mb4"
mysql -u root -p cloudpros < database/schema.sql
php database/create-admin.php            # first administrator
php -S localhost:8080                    # then open http://localhost:8080
```

PHP's built-in server ignores `.htaccess`, so use it only on your own PC.

## Deploying (WampServer)

Full steps are in [`deploy/wamp/README.md`](deploy/wamp/README.md). In short:

1. **Change the old database password** wherever it is still used. Earlier versions
   of this repository contained it in plain text, and it remains in the git history.
2. `npm run build`, then `npm run package`, and copy the contents of
   `dist/cloudpros/` to the web folder (for example `C:\wamp64\www\cloudpros`).
3. Add the virtual host from `deploy/wamp/cloudpros-vhost.conf`. It needs
   `AllowOverride All` so `.htaccess` can block private files.
4. Create the database and a dedicated MySQL user (SELECT/INSERT/UPDATE/DELETE only,
   never `root`), import `database/schema.sql`, and fill in `config.local.php`.
5. Create your admin with `php database\create-admin.php`, then turn on HTTPS.

## Security notes

- No credentials in the repository; `config.local.php` is git-ignored and Apache
  refuses to serve it.
- Passwords are hashed with `password_hash`. Sign-in is rate-limited per IP and per
  username (10 failures each / 15 min) and regenerates the session. Signed-in sessions
  end after 30 minutes without activity.
- The visitor IP used for rate limits comes from the connection itself, not from
  headers the visitor can fake. `TRUSTED_PROXIES` covers a reverse proxy, if you add one.
- The admin API rejects anyone who isn't a signed-in admin, and every change
  requires a CSRF token.
- Forms have server-side validation, a honeypot field and basic flood limits.
- All database queries use prepared statements.
- Every response carries a Content-Security-Policy (only the site's own files may load),
  `nosniff`, frame blocking and a referrer policy; HSTS is added over HTTPS. PHP errors
  are never shown to visitors.
- `.htaccess` blocks the page generator, SQL and admin scripts, PHP includes, original
  photos, docs, git data and settings files.
- Report a vulnerability privately: see [`SECURITY.md`](SECURITY.md).

## Contact

info@cloudpros.com · +966 56 878 3539
