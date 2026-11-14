import { AREAS, SERVICES, SITE, btn, ctaBand } from '../lib.mjs';
import { heroStack } from '../diagrams.mjs';

export default {
  slug: 'index',
  nav: 'index',
  title: {
    en: 'CloudPros — AWS cloud, networking and data centers in Riyadh',
    ar: 'CloudPros — سحابة AWS والشبكات ومراكز البيانات في الرياض',
  },
  description: {
    en: 'CloudPros designs, builds and runs AWS environments, enterprise networks and data center facilities for organizations across Saudi Arabia. One accountable team from rack to region.',
    ar: 'تصمم CloudPros وتبني وتشغّل بيئات AWS والشبكات المؤسسية ومرافق مراكز البيانات للمؤسسات في المملكة العربية السعودية. فريق واحد مسؤول من الخادم إلى السحابة.',
  },
  jsonld: (ctx) => ({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'CloudPros',
    description: ctx.t('AWS cloud, networking and data center engineering in Riyadh, Saudi Arabia.', 'هندسة سحابة AWS والشبكات ومراكز البيانات في الرياض، المملكة العربية السعودية.'),
    email: SITE.email,
    telephone: SITE.phone,
    address: { '@type': 'PostalAddress', addressLocality: 'Riyadh', addressCountry: 'SA' },
    areaServed: 'SA',
    ...(SITE.url ? { url: SITE.url } : {}),
  }),
  render(ctx) {
    const { t, L, href, icon } = ctx;
    const practice = AREAS.map((a) => {
      const links = a.anchors
        ? a.anchors.map(([id, label]) => `<li><a href="${href(a.services[0], id)}"><span>${L(label)}</span>${icon('chevron')}</a></li>`).join('')
        : a.services.map((s) => `<li><a href="${href(s)}"><span>${L(SERVICES[s].title)}</span>${icon('chevron')}</a></li>`).join('');
      return `<div class="practice__row" id="${a.id}">
        <span class="practice__num">${a.num}</span>
        <div class="practice__title"><h3>${L(a.title)}</h3><p>${L(a.blurb)}</p></div>
        <ul class="practice__list">${links}</ul>
        <a class="link-arrow practice__more" href="${href('services', a.id)}">${t('Overview', 'نظرة عامة')}${icon('arrow')}</a>
      </div>`;
    }).join('');

    return `
<section class="hero">
  <div class="container hero__inner">
    <div>
      <p class="eyebrow">${t('AWS · Networking · Data centers — Riyadh', 'AWS · الشبكات · مراكز البيانات — الرياض')}</p>
      <h1 class="mt-4">${t('One team for your cloud, your network <em>and</em> your data center.', 'فريق واحد لسحابتك وشبكتك <em>و</em>مركز بياناتك.')}</h1>
      <p class="lead mt-5">${t('CloudPros designs, builds and runs AWS environments, enterprise networks and the physical facilities underneath them — so every layer of your infrastructure has one accountable partner.', 'تصمم CloudPros وتبني وتشغّل بيئات AWS والشبكات المؤسسية والمرافق المادية التي تقوم عليها — ليكون لكل طبقة من بنيتك التحتية شريك واحد مسؤول.')}</p>
      <div class="btn-row mt-6">
        ${btn(ctx, t('Book a consultation', 'احجز استشارة'), href('contact'), 'primary', true)}
        ${btn(ctx, t('Explore services', 'استكشف الخدمات'), href('services'), 'secondary')}
      </div>
      <div class="hero__meta">
        <span>${icon('badge')}${t('AWS-certified engineers', 'مهندسون معتمدون من AWS')}</span>
        <span>${icon('pin')}${t('Based in Riyadh', 'مقرنا الرياض')}</span>
        <span>${icon('language')}${t('Arabic & English', 'العربية والإنجليزية')}</span>
      </div>
    </div>
    <div class="hero__visual">${heroStack(t)}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head section-head--row">
      <div class="stack-4">
        <p class="eyebrow">${t('What we cover', 'ما نغطيه')}</p>
        <h2>${t('Four practices, one delivery team', 'أربعة مجالات، وفريق تنفيذ واحد')}</h2>
      </div>
      <p class="lead">${t('Most projects cross more than one layer: a migration needs connectivity, a new data hall needs monitoring, a hybrid network needs both sides designed together. We cover all of it, so nothing falls between vendors.', 'معظم المشاريع تمتد عبر أكثر من طبقة: الترحيل يحتاج إلى ربط شبكي، وقاعة البيانات الجديدة تحتاج إلى مراقبة، والشبكة الهجينة تحتاج إلى تصميم طرفيها معًا. نحن نغطي ذلك كله، فلا يضيع شيء بين الموردين.')}</p>
    </div>
    <div class="practice">${practice}</div>
  </div>
</section>

<section class="section section--alt">
  <div class="container split">
    <div class="stack-4">
      <p class="eyebrow">${t('Why CloudPros', 'لماذا CloudPros')}</p>
      <h2>${t('More than technology — a partner that stays', 'أكثر من مجرد تقنية — شريك يبقى معك')}</h2>
      <p class="lead">${t('We work as an extension of your IT team: we design with you, build alongside you, and leave your people able to run what we deliver.', 'نعمل امتدادًا لفريق تقنية المعلومات لديك: نصمم معك، وننفّذ إلى جانبك، ونترك فريقك قادرًا على تشغيل ما نسلّمه.')}</p>
    </div>
    <div class="points">
      <div class="point"><span class="point__icon">${icon('badge')}</span><div><h3>${t('Certified expertise', 'خبرة معتمدة')}</h3><p>${t('AWS-certified architects and engineers with hands-on experience in complex, multi-site deployments.', 'معماريون ومهندسون معتمدون من AWS بخبرة عملية في عمليات النشر المعقدة متعددة المواقع.')}</p></div></div>
      <div class="point"><span class="point__icon">${icon('sliders')}</span><div><h3>${t('Designed for your business', 'مصمم لأعمالك')}</h3><p>${t('No one-size-fits-all packages. Every design starts from your workloads, budget and compliance needs.', 'لا حلول جاهزة تناسب الجميع. كل تصميم ينطلق من أحمال عملك وميزانيتك ومتطلبات الامتثال لديك.')}</p></div></div>
      <div class="point"><span class="point__icon">${icon('people')}</span><div><h3>${t('Partnership, not hand-off', 'شراكة لا مجرد تسليم')}</h3><p>${t('Clear communication, documented decisions and knowledge transfer, so you are never locked in.', 'تواصل واضح وقرارات موثقة ونقل للمعرفة، حتى لا تبقى مقيدًا بنا.')}</p></div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">${t('How we work', 'كيف نعمل')}</p>
      <h2>${t('From first assessment to day-two operations', 'من التقييم الأول إلى التشغيل اليومي')}</h2>
    </div>
    <ol class="steps steps--4">
      <li class="step"><span class="step__num">01</span><h3>${t('Assess', 'التقييم')}</h3><p>${t('We map what you run today — applications, network, facilities — and the risks and costs attached to it.', 'نرسم خريطة لما تشغّله اليوم — التطبيقات والشبكة والمرافق — والمخاطر والتكاليف المرتبطة بها.')}</p></li>
      <li class="step"><span class="step__num">02</span><h3>${t('Design', 'التصميم')}</h3><p>${t('A target architecture and a phased plan you can review, budget and approve before anything changes.', 'معمارية مستهدفة وخطة على مراحل يمكنك مراجعتها ووضع ميزانيتها واعتمادها قبل أي تغيير.')}</p></li>
      <li class="step"><span class="step__num">03</span><h3>${t('Build', 'التنفيذ')}</h3><p>${t('Our engineers implement, test and document each phase, with cut-overs planned around your operations.', 'ينفّذ مهندسونا كل مرحلة ويختبرونها ويوثقونها، مع تخطيط عمليات التحويل بما يناسب سير عملك.')}</p></li>
      <li class="step"><span class="step__num">04</span><h3>${t('Run & improve', 'التشغيل والتحسين')}</h3><p>${t('Monitoring, patching and support after go-live, plus regular reviews of cost, performance and security.', 'مراقبة وتحديثات ودعم بعد الإطلاق، مع مراجعات دورية للتكلفة والأداء والأمان.')}</p></li>
    </ol>
  </div>
</section>

<section class="section section--alt">
  <div class="container split split--center">
    <div class="stack-4">
      <p class="eyebrow">${t('Standards we design to', 'المعايير التي نصمم وفقها')}</p>
      <h2>${t('Built on published frameworks, not guesswork', 'مبني على أطر منشورة، لا على التخمين')}</h2>
      <p class="lead">${t('Every design is checked against the AWS Well-Architected Framework, and we help you put the controls in place for the compliance standards your sector requires.', 'يُراجَع كل تصميم وفق إطار AWS Well-Architected، ونساعدك على تطبيق الضوابط اللازمة لمعايير الامتثال التي يتطلبها قطاعك.')}</p>
    </div>
    <ul class="tags" aria-label="${t('Frameworks and standards', 'الأطر والمعايير')}">
      <li class="tag">AWS Well-Architected</li><li class="tag">ISO 27001</li><li class="tag">SOC 2</li><li class="tag">GDPR</li><li class="tag">HIPAA</li><li class="tag">Infrastructure as Code</li><li class="tag">Defense in depth</li><li class="tag">${t('Least-privilege access', 'مبدأ أقل الصلاحيات')}</li>
    </ul>
  </div>
</section>

${ctaBand(ctx, {})}`;
  },
};
