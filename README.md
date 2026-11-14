# CloudPros website

Marketing site and client area for **CloudPros** — AWS cloud, networking and data
center engineering, Riyadh. English at `/`, Arabic (right-to-left) at `/ar/`.

- **Front end:** static HTML generated from `build/`, one stylesheet
  (`assets/css/site.css`), a small script (`assets/js/site.js`). No CDN, no
  framework, self-hosted fonts. Design rules live in [`DESIGN.md`](DESIGN.md).
- **Back end:** plain PHP 8.1+ with PDO/MySQL for the contact form, newsletter,
  client sign-up/sign-in and the admin panel.

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
```

## Editing content

1. Change the text in `build/pages/*.mjs` (each string is `t('English', 'Arabic')`),
   or the service list in `build/lib.mjs`.
2. Run `npm run build`. It regenerates every page in both languages.
3. Commit the source **and** the generated `.html` files — the server needs no build step.

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

## Running locally

```bash
cp config.example.php config.local.php   # fill in your local MySQL details
mysql -u root -p -e "CREATE DATABASE cloudpros CHARACTER SET utf8mb4"
mysql -u root -p cloudpros < database/schema.sql
php database/create-admin.php            # first administrator
php -S localhost:8080                    # then open http://localhost:8080
```

## Deploying (Azure App Service, PHP 8)

1. **Rotate the old database password.** Earlier versions of this repository
   contained it in plain text, and it remains in the git history.
2. In the App Service, set these application settings (environment variables):
   `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`, and `DB_SSL_CA` if your
   MySQL requires TLS. Use a dedicated database user with only
   SELECT/INSERT/UPDATE/DELETE on this database — not `root`.
3. Run `database/schema.sql` against the database. If you are upgrading the old
   `moedb` database, read the notes at the bottom of that file (it also removes
   the old sample admin with a published password).
4. Create your admin with `php database/create-admin.php` (from the App Service
   SSH console or locally against the same database).
5. Deploy with `.github/workflows/azure-webapps-php.yml` — set `AZURE_WEBAPP_NAME`
   and the `AZURE_WEBAPP_PUBLISH_PROFILE` secret first (the workflow stops with a
   clear error while the name is still `your-app-name`). It publishes only the
   public files — about 3.5 MB — and leaves out `build/`, the original photos in
   `assets/images/`, SQL files and docs. Run `database/schema.sql` from your own
   machine or the Azure portal.

## Security notes

- No credentials in the repository; `config.local.php` is git-ignored.
- Passwords are hashed with `password_hash`; sign-in is rate-limited per IP
  (10 failures / 15 min) and regenerates the session.
- The admin API rejects anyone who isn't a signed-in admin, and every change
  requires a CSRF token.
- Forms have server-side validation, a honeypot field and basic flood limits.
- All database queries use prepared statements.

## Contact

info@cloudpros.com · +966 56 878 3539
