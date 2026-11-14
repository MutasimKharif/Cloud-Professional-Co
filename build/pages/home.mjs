import { AREAS, SERVICES, SITE, btn, ctaBand, selectedWork } from '../lib.mjs';
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
        <div class="practice__title"><h3>${L(a.title)}</h3><p>${L(a.blurb)}</p><a class="link-arrow practice__more" href="${href('services', a.id)}">${t('Practice overview', 'نظرة عامة على المجال')}${icon('arrow')}</a></div>
        <ul class="practice__list">${links}</ul>
      </div>`;
    }).join('');

    return `
<section class="hero">
  <div class="container hero__inner">
    <div>
      <p class="eyebrow">${t('AWS · Networking · Data centers — Riyadh', 'AWS · الشبكات · مراكز البيانات — الرياض')}</p>
      <h1 class="mt-4">${t('<em>One team</em> for your cloud, your network and your data center.', '<em>فريق واحد</em> لسحابتك وشبكتك ومركز بياناتك.')}</h1>
      <p class="lead mt-5">${t('CloudPros designs, builds and runs AWS environments, enterprise networks and the physical facilities underneath them — so every layer of your infrastructure has one accountable partner.', 'تصمم CloudPros وتبني وتشغّل بيئات AWS والشبكات المؤسسية والمرافق المادية التي تقوم عليها — ليكون لكل طبقة من بنيتك التحتية شريك واحد مسؤول.')}</p>
      <div class="btn-row mt-6">
        ${btn(ctx, t('Talk to an engineer', 'تحدّث مع مهندس'), href('contact'), 'primary', true)}
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
      <h2>${t('What changes when one team owns every layer', 'ما الذي يتغير حين يتولى فريق واحد كل الطبقات')}</h2>
      <p class="lead">${t('We work as an extension of your IT team: we design with you, build alongside you, and leave your people able to run what we deliver.', 'نعمل امتدادًا لفريق تقنية المعلومات لديك: نصمم معك، وننفّذ إلى جانبك، ونترك فريقك قادرًا على تشغيل ما نسلّمه.')}</p>
    </div>
    <div class="points">
      <div class="point"><span class="point__icon">${icon('link')}</span><div><h3>${t('No gaps between vendors', 'لا فجوات بين الموردين')}</h3><p>${t('The engineers who design your AWS environment also design the network that reaches it and the room your servers sit in. When something breaks across layers, there is one team to call — not three pointing at each other.', 'المهندسون الذين يصممون بيئة AWS لديك يصممون أيضًا الشبكة التي تصل إليها والغرفة التي تقف فيها خوادمك. وحين يتعطل شيء بين الطبقات، هناك فريق واحد تتصل به — لا ثلاثة يلقي كل منهم المسؤولية على الآخر.')}</p></div></div>
      <div class="point"><span class="point__icon">${icon('docCheck')}</span><div><h3>${t('Designed for Saudi regulation', 'مصمم وفق الأنظمة السعودية')}</h3><p>${t('Designs are mapped to the NCA controls — and SAMA’s framework or the PDPL where they apply — from the first diagram, not patched in before an audit.', 'تُطابَق التصاميم مع ضوابط الهيئة الوطنية للأمن السيبراني — وإطار ساما أو نظام حماية البيانات الشخصية حيث ينطبقان — منذ المخطط الأول، لا قبيل التدقيق.')}</p></div></div>
      <div class="point"><span class="point__icon">${icon('people')}</span><div><h3>${t('Written down, never locked in', 'موثّق، دون أن تبقى مقيدًا بنا')}</h3><p>${t('Diagrams, runbooks and access are handed to your team with a walkthrough. Run it yourselves, or keep us on for support — your choice.', 'تُسلَّم المخططات وأدلة التشغيل والصلاحيات لفريقك مع جلسة شرح. شغّلها بنفسك أو أبقنا معك للدعم — القرار لك.')}</p></div></div>
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

<section class="section section--alt" aria-labelledby="standards-h">
  <div class="container split">
    <div class="stack-4">
      <p class="eyebrow">${t('Standards we design to', 'المعايير التي نصمم وفقها')}</p>
      <h2 id="standards-h">${t('Built for the rules your auditors check', 'مبني على الضوابط التي يراجعها مدققوك')}</h2>
      <p class="lead">${t('We map every design to the Saudi frameworks that apply to you and check AWS designs against the Well-Architected Framework, so the evidence exists before anyone asks for it.', 'نطابق كل تصميم مع الأطر السعودية التي تنطبق عليك، ونراجع تصاميم AWS وفق إطار Well-Architected، لتكون الأدلة جاهزة قبل أن يطلبها أحد.')}</p>
    </div>
    <div>
      <ul class="standards">
        <li><b>NCA ECC-2:2024</b><span>${t('The National Cybersecurity Authority’s Essential Cybersecurity Controls — the baseline for organizations in the Kingdom.', 'الضوابط الأساسية للأمن السيبراني من الهيئة الوطنية للأمن السيبراني — الأساس للجهات في المملكة.')}</span></li>
        <li><b>NCA CCC-2:2024</b><span>${t('Cloud Cybersecurity Controls — the extra requirements when your systems or data run in the cloud.', 'ضوابط الأمن السيبراني للحوسبة السحابية — المتطلبات الإضافية حين تعمل أنظمتك أو بياناتك في السحابة.')}</span></li>
        <li><b>SAMA CSF</b><span>${t('The Saudi Central Bank’s Cyber Security Framework, for banks, insurers, finance and payment companies.', 'إطار الأمن السيبراني من البنك المركزي السعودي، للبنوك وشركات التأمين والتمويل والمدفوعات.')}</span></li>
        <li><b>PDPL</b><span>${t('The Personal Data Protection Law, which governs how personal data is collected, stored and transferred.', 'نظام حماية البيانات الشخصية، الذي ينظّم جمع البيانات الشخصية وتخزينها ونقلها.')}</span></li>
        <li><b>ISO 27001</b><span>${t('The international standard for information security management.', 'المعيار الدولي لإدارة أمن المعلومات.')}</span></li>
        <li><b>AWS Well-Architected</b><span>${t('AWS’s review of security, reliability, performance and cost — applied to every AWS design.', 'مراجعة AWS للأمان والاعتمادية والأداء والتكلفة — نطبقها على كل تصميم في AWS.')}</span></li>
      </ul>
      <p class="residency">${icon('pin')}<span><b>${t('Need data to stay in the Kingdom?', 'تحتاج أن تبقى البيانات داخل المملكة؟')}</b> ${t('We design for it: on-premises, in Saudi data centers, or in the AWS Region in Saudi Arabia, which AWS has announced for launch by December 2026.', 'نصمم لذلك: في مقرك، أو في مراكز بيانات داخل المملكة، أو في منطقة AWS في المملكة التي أعلنت AWS إطلاقها بحلول ديسمبر 2026.')}</span></p>
    </div>
  </div>
</section>

${selectedWork(ctx)}

${ctaBand(ctx, {})}`;
  },
};
