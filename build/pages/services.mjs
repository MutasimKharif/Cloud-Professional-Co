import { AREAS, SERVICES, pageHero, serviceCard, ctaBand, btn } from '../lib.mjs';

const services = {
  slug: 'services',
  title: { en: 'Services', ar: 'الخدمات' },
  description: {
    en: 'AWS cloud migration, DevOps and security; network architecture and connectivity; data center design and build; CCTV and meeting room systems — delivered by one team in Riyadh.',
    ar: 'الترحيل إلى سحابة AWS وDevOps والأمن، وتصميم الشبكات والربط، وتصميم مراكز البيانات وبناؤها، وأنظمة المراقبة بالكاميرات وقاعات الاجتماعات — من فريق واحد في الرياض.',
  },
  render(ctx) {
    const { t, L, href, icon } = ctx;
    const sections = AREAS.map((a, i) => `
<section class="section${i % 2 ? ' section--alt' : ''}" id="${a.id}" aria-labelledby="h-${a.id}">
  <div class="container">
    <div class="section-head section-head--row">
      <div class="stack-4">
        <p class="eyebrow">${a.num} · ${t('Practice', 'المجال')}</p>
        <h2 id="h-${a.id}">${L(a.title)}</h2>
      </div>
      <p class="lead">${L(a.blurb)} ${L(AREA_MORE[a.id])}</p>
    </div>
    <div class="grid ${a.services.length === 1 ? 'grid--2' : a.services.length === 2 ? 'grid--2' : 'grid--3'}">
      ${a.services.map((s) => serviceCard(ctx, s)).join('')}
      ${a.anchors ? `<div class="card"><p class="card__tag">${t('Included', 'يشمل')}</p><ul class="checks" style="margin-top:0">${a.anchors.map(([id, label]) => `<li>${icon('check')}<a href="${href(a.services[0], id)}">${L(label)}</a></li>`).join('')}</ul></div>` : ''}
    </div>
  </div>
</section>`).join('');

    return `${pageHero(ctx, {
      eyebrow: t('Services', 'الخدمات'),
      title: t('Everything between your users and the rack', 'كل ما يقع بين مستخدميك والخوادم'),
      lead: t('Four practices that are usually split across several vendors. We deliver them as one team, so designs fit together and someone owns the whole outcome.', 'أربعة مجالات تتوزع عادةً على عدة موردين. نقدمها فريقًا واحدًا، فتتكامل التصاميم ويتحمّل طرف واحد مسؤولية النتيجة كاملة.'),
      crumbs: [[t('Services', 'الخدمات')]],
      actions: AREAS.map((a) => `<a class="btn btn--secondary btn--sm" href="#${a.id}">${L(a.title)}</a>`).join(''),
    })}
${sections}
${ctaBand(ctx, { title: t('Not sure where your project fits?', 'لست متأكدًا من المجال الذي يندرج تحته مشروعك؟'), text: t('Describe what you’re trying to achieve. We’ll tell you which of these it involves — and what it doesn’t.', 'صف لنا ما تسعى إلى تحقيقه، وسنوضح لك ما يتطلبه من هذه الخدمات — وما لا يتطلبه.'), secondary: false })}`;
  },
};

const AREA_MORE = {
  aws: { en: 'From the first readiness assessment to automated pipelines and audit-ready security controls.', ar: 'من أول تقييم للجاهزية إلى خطوط التسليم الآلية وضوابط أمنية جاهزة للتدقيق.' },
  network: { en: 'Cloud and on-premises networks designed as one system, then kept healthy.', ar: 'شبكات سحابية ومحلية مصممة كنظام واحد، ثم نحافظ على سلامتها.' },
  'data-center': { en: 'Greenfield builds and upgrades, with the power, cooling, fire and monitoring systems that keep them running.', ar: 'بناء مرافق جديدة وتطوير القائمة، مع أنظمة الطاقة والتبريد والإطفاء والمراقبة التي تضمن استمرار عملها.' },
  'on-premise': { en: 'Physical security and collaboration spaces, installed properly and maintained.', ar: 'أمن مادي ومساحات تعاون، تُركَّب بإتقان وتُصان باستمرار.' },
};

// Old overview URLs kept working as redirects.
const redirect = (slug, target, titleEn) => ({
  slug, noindex: true,
  raw: (lang) => `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${titleEn} | CloudPros</title><meta name="robots" content="noindex"><link rel="canonical" href="${target}"><meta http-equiv="refresh" content="0; url=${target}"></head><body><p><a href="${target}">${lang === 'ar' ? 'انتقل إلى صفحة الخدمات' : 'Continue to Services'}</a></p></body></html>\n`,
});

export default [
  services,
  redirect('AWS-Cloud-Services', 'services.html#aws', 'AWS Cloud Services'),
  redirect('On-Premise', 'services.html#on-premise', 'On-Premise IT'),
];
