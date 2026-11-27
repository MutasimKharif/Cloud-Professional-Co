// Shared site data, layout and components for the static build.
import { readFileSync } from 'node:fs';
import { icon, logoMark } from './icons.mjs';
import { DETAILS } from './service-details.mjs';

const images = JSON.parse(readFileSync(new URL('./images.json', import.meta.url), 'utf8'));

export const SITE = {
  name: 'CloudPros',
  // Set your live domain (no trailing slash), e.g. 'https://www.example.com', then rebuild.
  // When set, pages get canonical, hreflang and absolute social-preview URLs.
  url: process.env.SITE_URL || '',
  email: 'info@cloudpros.com',
  phone: '+966568783539',
  phoneDisplay: '+966 56 878 3539',
  linkedinCeo: 'https://www.linkedin.com/in/mutasim-kharif-465a03310',
  year: new Date().getFullYear(),
};

// ---------- Services registry ----------
export const SERVICES = {
  'cloud-mig': { icon: 'cloudUp', area: 'aws',
    title: { en: 'Cloud migration & strategy', ar: 'الترحيل إلى السحابة والاستراتيجية' },
    short: { en: 'Assessment, migration plan and a low-disruption move to AWS.', ar: 'تقييم الجاهزية وخطة الترحيل وانتقال إلى AWS بأقل تعطّل ممكن.' } },
  'service-devops-automation': { icon: 'code', area: 'aws',
    title: { en: 'DevOps & automation', ar: 'DevOps والأتمتة' },
    short: { en: 'CI/CD pipelines, infrastructure as code and containers.', ar: 'خطوط CI/CD والبنية التحتية ككود والحاويات.' } },
  'service-security-compliance': { icon: 'shield', area: 'aws',
    title: { en: 'Security & compliance', ar: 'الأمن والامتثال' },
    short: { en: 'Posture reviews, IAM, threat detection and audit-ready controls.', ar: 'تقييم الوضع الأمني وإدارة الهويات واكتشاف التهديدات وضوابط جاهزة للتدقيق.' } },
  'service-network-architecture': { icon: 'share', area: 'network',
    title: { en: 'Network architecture & design', ar: 'تصميم وهندسة الشبكات' },
    short: { en: 'VPC design, DNS and routing, hybrid networks and global delivery.', ar: 'تصميم VPC وأنظمة DNS والتوجيه والشبكات الهجينة والتوزيع العالمي.' } },
  'service-connectivity-solutions': { icon: 'swap', area: 'network',
    title: { en: 'Connectivity solutions', ar: 'حلول الربط والاتصال' },
    short: { en: 'Site-to-Site VPN, Direct Connect and VPC peering.', ar: 'شبكات VPN بين المواقع وDirect Connect وربط VPC.' } },
  'service-infrastructure-maintenance': { icon: 'wrench', area: 'network',
    title: { en: 'IT infrastructure maintenance', ar: 'صيانة البنية التحتية لتقنية المعلومات' },
    short: { en: 'Monitoring, patching, hardware lifecycle, backup and support.', ar: 'المراقبة والتحديثات ودورة حياة الأجهزة والنسخ الاحتياطي والدعم.' } },
  'service-data-center': { icon: 'server', area: 'data-center',
    title: { en: 'Data center design & build', ar: 'تصميم وبناء مراكز البيانات' },
    short: { en: 'Facility build, power, cooling, fire suppression and monitoring.', ar: 'بناء المرافق والطاقة والتبريد وأنظمة الإطفاء والمراقبة البيئية.' } },
  'service-cctv': { icon: 'camera', area: 'on-premise',
    title: { en: 'CCTV surveillance', ar: 'أنظمة المراقبة بالكاميرات' },
    short: { en: 'IP camera systems, remote viewing and ongoing maintenance.', ar: 'أنظمة كاميرات IP والمشاهدة عن بُعد والصيانة المستمرة.' } },
  'service-meeting-rooms': { icon: 'display', area: 'on-premise',
    title: { en: 'Meeting room solutions', ar: 'حلول قاعات الاجتماعات' },
    short: { en: 'Audio-visual, video conferencing, room control and booking panels.', ar: 'الصوتيات والمرئيات ومؤتمرات الفيديو والتحكم بالقاعة ولوحات الحجز.' } },
};

export const AREAS = [
  { id: 'aws', num: '01', icon: 'cloud',
    title: { en: 'AWS cloud', ar: 'سحابة AWS' },
    blurb: { en: 'Move to AWS, automate delivery and keep it secure.', ar: 'انتقل إلى AWS وأتمت عمليات التسليم وحافظ على أمانها.' },
    services: ['cloud-mig', 'service-devops-automation', 'service-security-compliance'] },
  { id: 'network', num: '02', icon: 'share',
    title: { en: 'Networking', ar: 'الشبكات' },
    blurb: { en: 'The network that connects your offices, data center and cloud.', ar: 'الشبكة التي تربط مكاتبك ومركز بياناتك والسحابة.' },
    services: ['service-network-architecture', 'service-connectivity-solutions', 'service-infrastructure-maintenance'] },
  { id: 'data-center', num: '03', icon: 'server',
    title: { en: 'Data centers', ar: 'مراكز البيانات' },
    blurb: { en: 'Mission-critical rooms, from raised floor to UPS.', ar: 'غرف بيانات حرجة، من الأرضيات المرفوعة إلى أنظمة UPS.' },
    services: ['service-data-center'],
    anchors: [
      ['build', { en: 'Data center build', ar: 'بناء مركز البيانات' }],
      ['ems', { en: 'Environmental monitoring', ar: 'المراقبة البيئية' }],
      ['cooling', { en: 'Precision cooling', ar: 'التبريد الدقيق' }],
      ['fire', { en: 'Fire suppression', ar: 'أنظمة الإطفاء' }],
      ['power', { en: 'UPS & power', ar: 'أنظمة UPS والطاقة' }],
    ] },
  { id: 'on-premise', num: '04', icon: 'building',
    title: { en: 'Workplace systems', ar: 'أنظمة بيئة العمل' },
    blurb: { en: 'Security cameras and meeting rooms that just work.', ar: 'كاميرات مراقبة وقاعات اجتماعات تعمل بسلاسة.' },
    services: ['service-cctv', 'service-meeting-rooms'] },
];

// ---------- Context ----------
export function makeCtx(lang, page) {
  const t = (en, ar) => (lang === 'ar' ? ar : en);
  const L = (obj) => (typeof obj === 'string' ? obj : obj[lang]);
  const base = lang === 'ar' ? '../' : '';
  const href = (slug, hash = '') => `${slug === 'index' ? 'index' : slug}.html${hash ? '#' + hash : ''}`;
  const asset = (p) => `${base}${p}`;
  const php = (p) => `${base}${p}`;
  const img = (name, alt, { sizes = '(min-width: 960px) 560px, 100vw', eager = false, cls = '' } = {}) => {
    const m = images[name];
    if (!m) throw new Error(`Unknown image ${name}`);
    const largest = m.variants[m.variants.length - 1];
    const srcset = m.variants.map((w) => `${asset(`assets/img/${name}-${w}.webp`)} ${w}w`).join(', ');
    const h = Math.round((m.h / m.w) * largest);
    return `<img src="${asset(`assets/img/${name}-${largest}.webp`)}" srcset="${srcset}" sizes="${sizes}" width="${largest}" height="${h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${cls ? ` class="${cls}"` : ''}>`;
  };
  return { lang, t, L, base, href, asset, php, img, icon, page, dir: lang === 'ar' ? 'rtl' : 'ltr' };
}

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- Layout ----------
const NAV = [
  ['services', { en: 'Services', ar: 'الخدمات' }],
  ['about', { en: 'About', ar: 'من نحن' }],
  ['teammembers', { en: 'Team', ar: 'الفريق' }],
  ['blog', { en: 'Insights', ar: 'المقالات' }],
  ['contact', { en: 'Contact', ar: 'تواصل معنا' }],
];

// Only this site's own files may load. Keep in step with .htaccess and includes/bootstrap.php.
// (frame-ancestors only works as an HTTP header, so .htaccess sends it.)
const CSP = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; "
  + "connect-src 'self'; font-src 'self'; form-action 'self'; base-uri 'self'; object-src 'none'";

function head(ctx, page) {
  const { lang, L, asset } = ctx;
  const title = page.slug === 'index' ? L(page.title) : `${L(page.title)} | CloudPros`;
  const desc = L(page.description);
  const enPath = `${page.slug === 'index' ? '' : page.slug + '.html'}`;
  const arPath = `ar/${page.slug === 'index' ? '' : page.slug + '.html'}`;
  const abs = SITE.url;
  const seo = abs ? `
  <link rel="canonical" href="${abs}/${lang === 'ar' ? arPath : enPath}">
  <link rel="alternate" hreflang="en" href="${abs}/${enPath}">
  <link rel="alternate" hreflang="ar" href="${abs}/${arPath}">
  <link rel="alternate" hreflang="x-default" href="${abs}/${enPath}">
  <meta property="og:url" content="${abs}/${lang === 'ar' ? arPath : enPath}">` : '';
  const ogImage = abs ? `${abs}/assets/og/cloudpros-${lang}.png` : asset(`assets/og/cloudpros-${lang}.png`);
  const fonts = lang === 'ar'
    ? ['assets/fonts/plex-arabic-400.woff2', 'assets/fonts/plex-arabic-700.woff2']
    : ['assets/fonts/inter-var.woff2', 'assets/fonts/archivo-var.woff2'];
  return `<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Security-Policy" content="${CSP}">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  ${page.noindex ? '<meta name="robots" content="noindex">' : ''}
  <meta name="theme-color" content="#0B0F15">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="CloudPros">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:locale" content="${lang === 'ar' ? 'ar_SA' : 'en_US'}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">${seo}
  <link rel="icon" href="${asset('favicon.svg')}" type="image/svg+xml">
  <link rel="icon" href="${asset('favicon-32.png')}" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="${asset('apple-touch-icon.png')}">
${fonts.map((f) => `  <link rel="preload" href="${asset(f)}" as="font" type="font/woff2" crossorigin>`).join('\n')}
  <link rel="stylesheet" href="${asset('assets/css/site.css')}">
  <script src="${asset('assets/js/site.js')}" defer></script>${page.jsonld ? `\n  <script type="application/ld+json">${JSON.stringify(page.jsonld(ctx))}</script>` : ''}
</head>`;
}

function header(ctx, page) {
  const { t, L, href, asset } = ctx;
  const current = page.nav || page.slug;
  const navLinks = NAV.map(([slug, label]) =>
    `<li><a class="nav__link" href="${href(slug)}"${current === slug ? ' aria-current="page"' : ''}>${L(label)}</a></li>`).join('');
  const otherLang = ctx.lang === 'ar'
    ? { href: `../${page.slug === 'index' ? 'index' : page.slug}.html`, label: 'English', code: 'en' }
    : { href: `ar/${page.slug === 'index' ? 'index' : page.slug}.html`, label: 'العربية', code: 'ar' };
  const langLink = (cls) => `<a class="${cls}" href="${otherLang.href}" hreflang="${otherLang.code}" lang="${otherLang.code}">${icon('language')}<span>${otherLang.label}</span></a>`;
  return `<a class="skip-link" href="#main">${t('Skip to content', 'تخطَّ إلى المحتوى')}</a>
<header class="site-header" data-header>
  <div class="container site-header__bar">
    <a class="brand" href="${href('index')}" aria-label="${t('CloudPros home', 'الصفحة الرئيسية لـ CloudPros')}">${logoMark}<span>CloudPros</span></a>
    <nav class="nav" aria-label="${t('Main', 'الرئيسية')}"><ul class="nav__list">${navLinks}</ul></nav>
    <div class="header-actions">
      ${langLink('lang-link')}
      <a class="lang-link header-cta" href="${href('signin')}"${current === 'signin' ? ' aria-current="page"' : ''}>${icon('user')}<span>${t('Sign in', 'تسجيل الدخول')}</span></a>
      <a class="btn btn--primary btn--sm header-cta" href="${href('contact')}">${t('Talk to an engineer', 'تحدّث مع مهندس')}</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-nav" data-menu-btn>
        <span class="sr-only">${t('Menu', 'القائمة')}</span>${icon('menu', 'icon-open')}${icon('close', 'icon-close')}
      </button>
    </div>
  </div>
  <div class="mobile-nav" id="mobile-nav" hidden data-mobile-nav>
    <nav aria-label="${t('Mobile', 'قائمة الجوال')}"><ul>
      <li><a href="${href('index')}"${current === 'index' ? ' aria-current="page"' : ''}>${t('Home', 'الرئيسية')}</a></li>
      ${NAV.map(([slug, label]) => `<li><a href="${href(slug)}"${current === slug ? ' aria-current="page"' : ''}>${L(label)}</a></li>`).join('')}
      <li><a href="${href('signin')}">${t('Sign in', 'تسجيل الدخول')}</a></li>
    </ul></nav>
    <a class="btn btn--primary" href="${href('contact')}">${t('Talk to an engineer', 'تحدّث مع مهندس')}</a>
  </div>
</header>`;
}

function footer(ctx) {
  const { t, L, href, php } = ctx;
  const svc = Object.entries(SERVICES).map(([slug, s]) => `<li><a href="${href(slug)}">${L(s.title)}</a></li>`).join('');
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        <a class="brand" href="${href('index')}">${logoMark}<span>CloudPros</span></a>
        <p>${t('AWS cloud, networking and data center engineering for organizations across Saudi Arabia — from one accountable team in Riyadh.', 'هندسة سحابة AWS والشبكات ومراكز البيانات للمؤسسات في جميع أنحاء المملكة العربية السعودية — من فريق واحد مسؤول في الرياض.')}</p>
      </div>
      <div class="footer__col">
        <h2>${t('Services', 'الخدمات')}</h2>
        <ul>${svc}</ul>
      </div>
      <div class="footer__col">
        <h2>${t('Company', 'الشركة')}</h2>
        <ul>
          <li><a href="${href('about')}">${t('About us', 'من نحن')}</a></li>
          <li><a href="${href('teammembers')}">${t('Leadership team', 'فريق القيادة')}</a></li>
          <li><a href="${href('blog')}">${t('Insights', 'المقالات')}</a></li>
          <li><a href="${href('contact')}">${t('Contact', 'تواصل معنا')}</a></li>
          <li><a href="${href('signin')}">${t('Client sign in', 'دخول العملاء')}</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h2>${t('Contact', 'التواصل')}</h2>
        <ul>
          <li>${t('Riyadh, Saudi Arabia', 'الرياض، المملكة العربية السعودية')}</li>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li><a href="tel:${SITE.phone}" dir="ltr">${SITE.phoneDisplay}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__news">
      <div>
        <h2>${t('Cloud and infrastructure notes, once a month', 'ملاحظات عن السحابة والبنية التحتية، مرة كل شهر')}</h2>
        <p>${t('Practical guidance from our engineers. No spam; unsubscribe any time.', 'إرشادات عملية من مهندسينا. بلا رسائل مزعجة، ويمكنك إلغاء الاشتراك في أي وقت.')}</p>
      </div>
      <form class="news-form" action="${php('newsletter.php')}" method="post" data-async-form novalidate>
        <input type="hidden" name="lang" value="${ctx.lang}">
        <div class="hp" aria-hidden="true"><label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <label class="sr-only" for="news-email">${t('Email address', 'البريد الإلكتروني')}</label>
        <div class="news-form__row">
          <input class="input" id="news-email" type="email" name="email" required autocomplete="email" placeholder="${t('you@company.com', 'you@company.com')}" data-msg-required="${t('Enter your email address.', 'أدخل بريدك الإلكتروني.')}" data-msg-type="${t('Enter a valid email, like name@company.com.', 'أدخل بريدًا إلكترونيًا صحيحًا، مثل name@company.com.')}">
          <button class="btn btn--primary" type="submit"><span class="spinner" aria-hidden="true"></span><span>${t('Subscribe', 'اشترك')}</span></button>
        </div>
        <p class="field__error" data-error-for="news-email" id="news-email-error">${icon('alert')}<span></span></p>
        <div class="alert alert--success" role="status" data-form-success>${icon('checkCircle')}<span>${t("You're subscribed. Look out for the next issue.", 'تم اشتراكك. ترقّب العدد القادم.')}</span></div>
        <div class="alert alert--error" role="alert" data-form-failure>${icon('alert')}<span>${t("We couldn't subscribe you just now. Please try again in a moment.", 'تعذّر إتمام اشتراكك الآن. حاول مرة أخرى بعد قليل.')}</span></div>
      </form>
    </div>
    <div class="footer__legal">
      <p>© ${SITE.year} CloudPros. ${t('All rights reserved.', 'جميع الحقوق محفوظة.')}</p>
      <ul><li><a href="${href('privacy')}">${t('Privacy policy', 'سياسة الخصوصية')}</a></li></ul>
    </div>
  </div>
</footer>`;
}

export function renderPage(page, lang) {
  const ctx = makeCtx(lang, page);
  const body = page.render(ctx);
  return `<!doctype html>
<html lang="${lang}" dir="${ctx.dir}">
${head(ctx, page)}
<body${page.bodyClass ? ` class="${page.bodyClass}"` : ''}>
${header(ctx, page)}
<main id="main">
${body}
</main>
${page.minimalFooter ? '' : footer(ctx)}
</body>
</html>
`;
}

// ---------- Components ----------
export function pageHero(ctx, { eyebrow, title, lead, crumbs = [], actions = '', aside = '', meta = '' }) {
  const { t, href } = ctx;
  const items = [[t('Home', 'الرئيسية'), href('index')], ...crumbs];
  const bc = items.map(([label, url], i) => i === items.length - 1 && !url
    ? `<li><span aria-current="page">${label}</span></li>`
    : `<li><a href="${url}">${label}</a></li>`).join('');
  const main = `${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${meta}
    ${actions ? `<div class="btn-row mt-3">${actions}</div>` : ''}`;
  return `<section class="page-hero">
  <div class="container page-hero__inner">
    <nav aria-label="${t('Breadcrumb', 'مسار التنقل')}"><ol class="breadcrumb">${bc}</ol></nav>
    ${aside ? `<div class="page-hero__grid"><div class="page-hero__inner" style="padding:0">${main}</div>${aside}</div>` : main}
  </div>
</section>`;
}

export function btn(ctx, label, url, kind = 'primary', withArrow = false) {
  return `<a class="btn btn--${kind}" href="${url}">${label}${withArrow ? icon('arrow', 'icon-arrow') : ''}</a>`;
}

export function ctaBand(ctx, { title, text, primary, secondary }) {
  const { t, href } = ctx;
  return `<section class="cta-band">
  <div class="container cta-band__inner">
    <h2>${title || t('Tell us what you run today. We’ll show you the next step.', 'أخبرنا بما تشغّله اليوم، وسنوضح لك الخطوة التالية.')}</h2>
    <p>${text || t('A short call with one of our engineers to understand your environment and where we can help.', 'مكالمة قصيرة مع أحد مهندسينا لفهم بيئتك وأين يمكننا المساعدة.')}</p>
    <div class="btn-row">
      ${btn(ctx, primary || t('Talk to an engineer', 'تحدّث مع مهندس'), href('contact'), 'primary', true)}
      ${secondary === false ? '' : btn(ctx, secondary || t('Browse services', 'تصفّح الخدمات'), href('services'), 'secondary')}
    </div>
    <p class="cta-band__contact"><a href="tel:${SITE.phone}" dir="ltr">${SITE.phoneDisplay}</a><span aria-hidden="true">·</span><a href="mailto:${SITE.email}">${SITE.email}</a></p>
  </div>
</section>`;
}

export function feature(ctx, { id, index, title, text, checks = [], media }) {
  const { icon: ic } = ctx;
  return `<article class="feature"${id ? ` id="${id}"` : ''}>
  <div class="feature__body">
    ${index ? `<span class="eyebrow feature__index">${index}</span>` : ''}
    <h3>${title}</h3>
    ${(Array.isArray(text) ? text : [text]).map((p) => `<p>${p}</p>`).join('')}
    ${checks.length ? `<ul class="checks">${checks.map((c) => `<li>${ic('check')}<span>${c}</span></li>`).join('')}</ul>` : ''}
  </div>
  <div class="feature__media">${media}</div>
</article>`;
}

export function mediaImg(ctx, name, alt, cls = '') {
  return `<figure class="media ${cls}">${ctx.img(name, alt)}</figure>`;
}

export function relatedServices(ctx, slugs, title, alt = true) {
  const { t, L, href } = ctx;
  return `<section class="section${alt ? ' section--alt' : ''}">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t('Related', 'خدمات ذات صلة')}</p><h2>${title || t('Often delivered together', 'غالبًا ما تُنفّذ معًا')}</h2></div>
    <div class="grid grid--3">
      ${slugs.map((s) => serviceCard(ctx, s)).join('')}
    </div>
  </div>
</section>`;
}

export function serviceCard(ctx, slug) {
  const { t, L, href, icon: ic } = ctx;
  const s = SERVICES[slug];
  return `<a class="card card--link" href="${href(slug)}">
    <span class="card__icon">${ic(s.icon)}</span>
    <h3>${L(s.title)}</h3>
    <p>${L(s.short)}</p>
    <span class="card__foot link-arrow">${t('Learn more', 'اعرف المزيد')}${ic('arrow')}</span>
  </a>`;
}

// [en, ar] pair -> current language
const pick = (ctx, pair) => (ctx.lang === 'ar' ? pair[1] : pair[0]);

export function glanceList(ctx, rows) {
  // In Arabic, lists of Latin product names read better split by an Arabic comma than joined with "و",
  // which the bidi algorithm attaches to the wrong neighbour.
  const val = (v) => (ctx.lang === 'ar' ? pick(ctx, v).replace(/ و(?=[A-Za-z])/g, '، ') : pick(ctx, v));
  return `<ul class="glance" aria-label="${ctx.t('At a glance', 'لمحة سريعة')}">${rows.map(([k, v]) => `<li><span class="glance__k">${pick(ctx, k)}</span><span class="glance__v">${val(v)}</span></li>`).join('')}</ul>`;
}

export function faqList(ctx, items, { openFirst = true } = {}) {
  return `<div class="faq">${items.map(([q, a], i) => `<details${openFirst && i === 0 ? ' open' : ''}><summary>${q}${ctx.icon('plus')}</summary><p>${a}</p></details>`).join('')}</div>`;
}

function faqJsonLd(items) {
  const strip = (h) => h.replace(/<[^>]+>/g, '');
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) })}</script>`;
}

function serviceDetails(ctx, slug, startAlt) {
  const { t, L, icon: ic } = ctx;
  const d = DETAILS[slug];
  if (!d) return { html: '', alt: startAlt };
  let alt = startAlt;
  const cls = () => { const c = `section${alt ? ' section--alt' : ''}`; alt = !alt; return c; };
  const deliver = `<section class="${cls()}" aria-labelledby="deliver-h">
  <div class="container">
    <div class="section-head section-head--row">
      <div class="stack-4"><p class="eyebrow">${t('Deliverables', 'المخرجات')}</p><h2 id="deliver-h">${t('What you get', 'ما الذي تحصل عليه')}</h2></div>
      <p class="lead">${t('What you’ll have in hand at the end — written down, so your team can run it with or without us.', 'ما سيكون بين يديك في النهاية — موثّقًا، ليستطيع فريقك تشغيله معنا أو من دوننا.')}</p>
    </div>
    <ul class="deliver">${d.deliver.map(([h, p]) => `<li>${ic('check')}<div><b>${pick(ctx, h)}</b><span>${pick(ctx, p)}</span></div></li>`).join('')}</ul>
  </div>
</section>`;
  const faqs = d.faqs.map(([q, a]) => [pick(ctx, q), pick(ctx, a)]);
  const faq = `<section class="${cls()}" aria-labelledby="faq-h">
  <div class="container split">
    <div class="stack-4"><p class="eyebrow">FAQ</p><h2 id="faq-h">${t('Questions we hear about this', 'أسئلة تتكرر حول هذه الخدمة')}</h2><p class="muted">${t('Something else on your mind?', 'لديك سؤال آخر؟')} <a href="${ctx.href('contact')}">${t('Ask an engineer', 'اسأل مهندسًا')}</a>.</p></div>
    ${faqList(ctx, faqs)}
  </div>
  ${faqJsonLd(faqs)}
</section>`;
  return { html: deliver + '\n' + faq, alt };
}

export function servicePage(ctx, { slug, eyebrowArea, lead, intro, features, extra = '', related, cta }) {
  const { t, L, href } = ctx;
  const s = SERVICES[slug];
  const area = AREAS.find((a) => a.id === s.area);
  const d = DETAILS[slug];
  // Sections after the features alternate backgrounds; `extra` blocks are always the alt colour.
  const details = serviceDetails(ctx, slug, !extra);
  return `${pageHero(ctx, {
    eyebrow: L(area.title),
    title: L(s.title),
    lead,
    crumbs: [[t('Services', 'الخدمات'), href('services')], [L(area.title), href('services', area.id)], [L(s.title)]],
    actions: btn(ctx, cta || t('Talk to an engineer', 'تحدّث مع مهندس'), href('contact'), 'primary', true),
    aside: d ? glanceList(ctx, d.glance) : '',
  })}
${intro ? `<section class="section section--tight"><div class="container"><div class="section-head section-head--row" style="margin-bottom:0">${intro}</div></div></section>` : ''}
<section class="section"${intro ? ' style="padding-top:0"' : ''} aria-labelledby="included-h">
  <div class="container">
    <h2 class="sr-only" id="included-h">${t('What’s included', 'ما الذي تشمله الخدمة')}</h2>
    <div class="features">
      ${features.join('\n')}
    </div>
  </div>
</section>
${extra}
${details.html}
${related ? relatedServices(ctx, related, undefined, details.alt) : ''}
${ctaBand(ctx, {})}`;
}

// ---------- Selected work ----------
// Real client projects only. Add entries like the commented example and rebuild;
// the "Selected work" section appears on the home page once this list isn't empty.
export const CASES = [
  // {
  //   sector: { en: 'FinTech', ar: 'التقنية المالية' },
  //   title: { en: 'Core banking reporting moved to AWS', ar: '…' },
  //   problem: { en: '…', ar: '…' },
  //   work: { en: '…', ar: '…' },
  //   result: { en: '…', ar: '…' },
  // },
];

export function selectedWork(ctx) {
  if (!CASES.length) return '';
  const { t, L } = ctx;
  return `<section class="section" aria-labelledby="work-h">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t('Selected work', 'من أعمالنا')}</p><h2 id="work-h">${t('Recent projects', 'مشاريع حديثة')}</h2></div>
    <div class="grid grid--${CASES.length >= 3 ? 3 : 2}">
      ${CASES.map((c) => `<article class="case">
        <p class="card__tag">${L(c.sector)}</p>
        <h3 style="font-size:var(--fs-h4)">${L(c.title)}</h3>
        <dl>
          <div><dt>${t('The problem', 'المشكلة')}</dt><dd>${L(c.problem)}</dd></div>
          <div><dt>${t('What we did', 'ما قمنا به')}</dt><dd>${L(c.work)}</dd></div>
          <div><dt>${t('Result', 'النتيجة')}</dt><dd>${L(c.result)}</dd></div>
        </dl>
      </article>`).join('')}
    </div>
  </div>
</section>`;
}
