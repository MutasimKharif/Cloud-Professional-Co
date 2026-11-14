import { SITE, pageHero, ctaBand, btn } from '../lib.mjs';
import { linkedinIcon } from '../icons.mjs';

const about = {
  slug: 'about',
  title: { en: 'About us', ar: 'من نحن' },
  description: {
    en: 'CloudPros was founded in Riyadh by AWS-certified engineers to close the gap between what cloud technology can do and how businesses in the region adopt it.',
    ar: 'تأسست CloudPros في الرياض على يد مهندسين معتمدين من AWS لسد الفجوة بين ما تتيحه التقنيات السحابية وبين تبنّي الشركات في المنطقة لها.',
  },
  render(ctx) {
    const { t, icon, href } = ctx;
    const values = [
      ['people', t('Customer success', 'نجاح العميل'), t('Your goals are our goals. We measure ourselves by the outcomes we help you reach.', 'أهدافك هي أهدافنا. نقيس نجاحنا بالنتائج التي نساعدك على تحقيقها.')],
      ['badge', t('Technical excellence', 'التميز التقني'), t('We keep learning so you always get current, best-in-class solutions.', 'نواصل التعلّم لتحصل دائمًا على أحدث الحلول وأفضلها.')],
      ['shield', t('Integrity', 'النزاهة'), t('Transparent communication and honest advice — including when the answer is “you don’t need this”.', 'تواصل شفاف ونصيحة صادقة — حتى حين تكون الإجابة «لا تحتاج إلى هذا».')],
      ['link', t('Collaborative partnership', 'شراكة تعاونية'), t('We work with you, not just for you, and leave knowledge behind in your team.', 'نعمل معك لا من أجلك فقط، ونترك المعرفة لدى فريقك.')],
    ];
    const faqs = [
      [t('What makes CloudPros different from other cloud consultants?', 'ما الذي يميز CloudPros عن غيرها من مستشاري السحابة؟'),
        t('We cover the whole stack — AWS, the network and the physical data center — with one team, and we work as an extension of yours. You get certified expertise, designs tailored to your business and transparent communication, not just a delivered project.', 'نغطي البنية بالكامل — AWS والشبكة ومركز البيانات المادي — بفريق واحد، ونعمل امتدادًا لفريقك. تحصل على خبرة معتمدة وتصاميم مفصّلة لأعمالك وتواصل شفاف، لا مجرد مشروع مُسلَّم.')],
      [t('Which industries do you work with?', 'ما القطاعات التي تعملون معها؟'),
        t('We have experience across FinTech, e-commerce, government and enterprise IT. The principles we build on — security, scalability and compliance — apply to any organization moving to the cloud.', 'لدينا خبرة في قطاعات التقنية المالية والتجارة الإلكترونية والجهات الحكومية وتقنية المعلومات في المؤسسات. والمبادئ التي نبني عليها — الأمان وقابلية التوسع والامتثال — تنطبق على أي جهة تنتقل إلى السحابة.')],
      [t('How do you keep my data and infrastructure secure?', 'كيف تحافظون على أمان بياناتي وبنيتي التحتية؟'),
        t('Security is designed in from the start. We follow the AWS Well-Architected Framework with defense in depth: strict IAM policies, network segmentation, encryption at rest and in transit, and continuous threat monitoring. We also help clients meet standards such as ISO 27001 and SOC 2.', 'الأمان جزء من التصميم منذ البداية. نتبع إطار AWS Well-Architected بنهج الدفاع متعدد الطبقات: سياسات IAM صارمة، وتقسيم الشبكة، والتشفير أثناء التخزين والنقل، ومراقبة مستمرة للتهديدات. كما نساعد عملاءنا على استيفاء معايير مثل ISO 27001 وSOC 2.')],
    ];
    return `${pageHero(ctx, {
      eyebrow: t('About CloudPros', 'عن CloudPros'),
      title: t('Cloud transformation, built in Riyadh', 'التحول السحابي، من الرياض'),
      lead: t('We are more than a service provider: we are a partner for organizations navigating cloud, network and data center decisions.', 'نحن أكثر من مزوّد خدمة: نحن شريك للمؤسسات في قراراتها المتعلقة بالسحابة والشبكات ومراكز البيانات.'),
      crumbs: [[t('About', 'من نحن')]],
    })}
<section class="section">
  <div class="container split split--sticky">
    <div class="stack-4"><p class="eyebrow">${t('Our story', 'قصتنا')}</p><h2>${t('Closing the gap between potential and adoption', 'سد الفجوة بين الإمكانات والتبنّي')}</h2></div>
    <div class="prose lead" style="max-width:none">
      <p>${t('CloudPros was founded in Riyadh by a team of AWS-certified engineers who saw a clear gap: the cloud’s potential was enormous, but many businesses in the region weren’t getting the benefit. We set out to be a true partner in that transformation, not just another vendor.', 'أسس CloudPros في الرياض فريق من المهندسين المعتمدين من AWS لاحظوا فجوة واضحة: إمكانات السحابة هائلة، لكن كثيرًا من الشركات في المنطقة لا تستفيد منها. فانطلقنا لنكون شريكًا حقيقيًا في هذا التحول، لا مجرد مورّد آخر.')}</p>
      <p>${t('From our first migration to our work today across cloud strategy, DevOps, security, networking and data centers, the commitment has stayed the same: give regional organizations the world-class tools and expertise they need to compete globally.', 'من أول عملية ترحيل إلى عملنا اليوم في استراتيجية السحابة وDevOps والأمن والشبكات ومراكز البيانات، بقي التزامنا كما هو: تزويد المؤسسات في المنطقة بالأدوات والخبرات العالمية التي تحتاجها للمنافسة عالميًا.')}</p>
    </div>
  </div>
</section>
<section class="section section--alt">
  <div class="container grid grid--2">
    <div class="panel stack-3"><p class="eyebrow">${t('Mission', 'رسالتنا')}</p><p class="lead" style="color:var(--text)">${t('To design, build and manage secure, scalable and cost-effective solutions that deliver real business value and accelerate innovation for our clients.', 'تصميم حلول آمنة وقابلة للتوسع وفعّالة التكلفة وبناؤها وإدارتها، بما يحقق قيمة حقيقية لأعمال عملائنا ويسرّع ابتكارهم.')}</p></div>
    <div class="panel stack-3"><p class="eyebrow">${t('Vision', 'رؤيتنا')}</p><p class="lead" style="color:var(--text)">${t('To be the leading catalyst for digital transformation in the Middle East, known for technical excellence, integrity and genuine partnership.', 'أن نكون المحفّز الرائد للتحول الرقمي في الشرق الأوسط، معروفين بالتميز التقني والنزاهة والشراكة الحقيقية.')}</p></div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t('Values', 'قيمنا')}</p><h2>${t('The principles behind every decision', 'المبادئ التي توجّه كل قرار')}</h2></div>
    <div class="grid grid--4">${values.map(([ic, h, p]) => `<div class="stack-3"><span class="card__icon">${icon(ic)}</span><h3 style="font-size:var(--fs-h4)">${h}</h3><p class="muted" style="color:var(--text-2)">${p}</p></div>`).join('')}</div>
  </div>
</section>
<section class="section section--alt">
  <div class="container split">
    <div class="stack-4"><p class="eyebrow">FAQ</p><h2>${t('Questions we hear often', 'أسئلة تتكرر علينا')}</h2><p class="muted">${t('Something else on your mind?', 'لديك سؤال آخر؟')} <a href="${href('contact')}">${t('Ask us directly', 'اسألنا مباشرة')}</a>.</p></div>
    <div class="faq">${faqs.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}${icon('plus')}</summary><p>${a}</p></details>`).join('')}</div>
  </div>
</section>
${ctaBand(ctx, { secondary: t('Meet the team', 'تعرّف على الفريق') }).replace(`href="${href('services')}"`, `href="${href('teammembers')}"`)}`;
  },
};

const team = {
  slug: 'teammembers',
  title: { en: 'Leadership team', ar: 'فريق القيادة' },
  description: {
    en: 'Meet the CloudPros leadership: cloud architecture, DevOps and cloud security specialists based in Riyadh.',
    ar: 'تعرّف على قيادة CloudPros: متخصصون في هندسة السحابة وDevOps وأمن السحابة مقرهم الرياض.',
  },
  render(ctx) {
    const { t, img } = ctx;
    const people = [
      { name: 'Mutasim Kharif', role: t('CEO & Cloud Architect', 'الرئيس التنفيذي ومعماري السحابة'), photo: 'team-mutasim', linkedin: SITE.linkedinCeo,
        bio: t('Crafts high-level cloud strategies and designs resilient, scalable AWS architectures. Leads clients through complex digital transformations.', 'يضع استراتيجيات السحابة ويصمم معماريات AWS مرنة وقابلة للتوسع. يقود العملاء خلال مشاريع التحول الرقمي المعقدة.') },
      { name: 'Bashar Wahsh', role: t('Head of DevOps', 'رئيس قسم DevOps'), mono: 'BW',
        bio: t('Specializes in CI/CD automation and infrastructure as code. Focused on shortening development cycles and improving operational efficiency.', 'متخصص في أتمتة CI/CD والبنية التحتية ككود. يركز على تقصير دورات التطوير ورفع الكفاءة التشغيلية.') },
      { name: 'Mohammed Al-Zahrani', role: t('Lead Security Analyst', 'كبير محللي الأمن'), mono: 'MZ',
        bio: t('Cloud security specialist covering threat detection, identity management and compliance with standards such as ISO 27001 and SOC 2.', 'متخصص في أمن السحابة يغطي اكتشاف التهديدات وإدارة الهويات والامتثال لمعايير مثل ISO 27001 وSOC 2.') },
    ];
    return `${pageHero(ctx, {
      eyebrow: t('Leadership', 'القيادة'),
      title: t('The people you’ll work with', 'الأشخاص الذين ستعمل معهم'),
      lead: t('Our leadership combines deep technical expertise with strategic vision to deliver world-class cloud solutions.', 'تجمع قيادتنا بين الخبرة التقنية العميقة والرؤية الاستراتيجية لتقديم حلول سحابية بمستوى عالمي.'),
      crumbs: [[t('Team', 'الفريق')]],
    })}
<section class="section">
  <div class="container grid grid--3">
    ${people.map((p) => `<article class="person">
      <div class="person__photo">${p.photo ? img(p.photo, p.name, { sizes: '(min-width: 1024px) 380px, (min-width: 720px) 50vw, 100vw' }) : `<div class="person__mono" aria-hidden="true">${p.mono}</div>`}</div>
      <div class="stack-2">
        <p class="person__role">${p.role}</p>
        <h2 style="font-size:var(--fs-h3)">${p.name}</h2>
        <p>${p.bio}</p>
        ${p.linkedin ? `<p><a class="link-arrow" href="${p.linkedin}" rel="noopener" target="_blank">${linkedinIcon.replace('<svg', '<svg style="width:16px;height:16px"')}LinkedIn<span class="sr-only"> ${t('(opens in a new tab)', '(يفتح في علامة تبويب جديدة)')}</span></a></p>` : ''}
      </div>
    </article>`).join('')}
  </div>
</section>
${ctaBand(ctx, { title: t('Talk to the team directly', 'تحدث مع الفريق مباشرة'), secondary: false })}`;
  },
};

const contact = {
  slug: 'contact',
  title: { en: 'Contact us', ar: 'تواصل معنا' },
  description: {
    en: 'Book a consultation with CloudPros in Riyadh. Tell us about your cloud, network or data center project and an engineer will get back to you.',
    ar: 'احجز استشارة مع CloudPros في الرياض. أخبرنا عن مشروعك في السحابة أو الشبكات أو مراكز البيانات وسيتواصل معك أحد مهندسينا.',
  },
  render(ctx) {
    const { t, icon, php } = ctx;
    const err = (id) => `<p class="field__error" id="${id}-error" data-error-for="${id}">${icon('alert')}<span></span></p>`;
    return `${pageHero(ctx, {
      eyebrow: t('Contact', 'تواصل معنا'),
      title: t('Tell us what you’re working on', 'أخبرنا بما تعمل عليه'),
      lead: t('Send a few lines about your project and an engineer will reply by email to arrange a call. Prefer to talk now? Call us.', 'أرسل بضعة أسطر عن مشروعك وسيرد عليك أحد مهندسينا عبر البريد لترتيب مكالمة. تفضّل الحديث الآن؟ اتصل بنا.'),
      crumbs: [[t('Contact', 'تواصل معنا')]],
    })}
<section class="section">
  <div class="container split contact-split">
    <aside class="stack-6" aria-labelledby="contact-details">
      <div class="stack-3">
        <h2 id="contact-details" style="font-size:var(--fs-h3)">${t('Contact details', 'بيانات التواصل')}</h2>
        <ul class="spec">
          <li><span class="spec__k">${t('Phone', 'الهاتف')}</span><span class="spec__v"><a href="tel:${SITE.phone}" dir="ltr">${SITE.phoneDisplay}</a></span></li>
          <li><span class="spec__k">${t('Email', 'البريد')}</span><span class="spec__v"><a href="mailto:${SITE.email}">${SITE.email}</a></span></li>
          <li><span class="spec__k">${t('Office', 'المكتب')}</span><span class="spec__v">${t('Riyadh, Saudi Arabia', 'الرياض، المملكة العربية السعودية')}</span></li>
        </ul>
      </div>
      <div class="stack-3">
        <h2 style="font-size:var(--fs-h4)">${t('What happens next', 'ماذا يحدث بعد ذلك')}</h2>
        <ol class="steps" style="grid-template-columns:1fr">
          <li class="step"><span class="step__num">01</span><p style="margin-top:8px">${t('An engineer reads your message and replies by email.', 'يقرأ أحد المهندسين رسالتك ويرد عليك عبر البريد.')}</p></li>
          <li class="step"><span class="step__num">02</span><p style="margin-top:8px">${t('We schedule a call to understand your environment and goals.', 'نحدد موعد مكالمة لفهم بيئتك وأهدافك.')}</p></li>
          <li class="step"><span class="step__num">03</span><p style="margin-top:8px">${t('If it’s a good fit, we send a written proposal with scope and approach.', 'إن كان المشروع مناسبًا، نرسل لك عرضًا مكتوبًا يوضح النطاق والنهج.')}</p></li>
        </ol>
      </div>
    </aside>
    <div class="panel">
      <form class="form" action="${php('process_form.php')}" method="post" data-async-form novalidate>
        <input type="hidden" name="lang" value="${ctx.lang}">
        <div class="hp" aria-hidden="true"><label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="form__row form__row--2">
          <div class="field">
            <label for="c-name">${t('Full name', 'الاسم الكامل')}</label>
            <input class="input" id="c-name" name="name" type="text" required autocomplete="name" maxlength="100" data-msg-required="${t('Enter your name.', 'أدخل اسمك.')}">
            ${err('c-name')}
          </div>
          <div class="field">
            <label for="c-email">${t('Work email', 'البريد الإلكتروني للعمل')}</label>
            <input class="input" id="c-email" name="email" type="email" required autocomplete="email" maxlength="100" data-msg-required="${t('Enter your email address.', 'أدخل بريدك الإلكتروني.')}" data-msg-type="${t('Enter a valid email, like name@company.com.', 'أدخل بريدًا إلكترونيًا صحيحًا، مثل name@company.com.')}">
            ${err('c-email')}
          </div>
        </div>
        <div class="form__row form__row--2">
          <div class="field">
            <label for="c-company">${t('Company', 'الشركة')} <span class="optional">${t('(optional)', '(اختياري)')}</span></label>
            <input class="input" id="c-company" name="company" type="text" autocomplete="organization" maxlength="100">
          </div>
          <div class="field">
            <label for="c-phone">${t('Phone', 'رقم الهاتف')} <span class="optional">${t('(optional)', '(اختياري)')}</span></label>
            <input class="input" id="c-phone" name="phone" type="tel" autocomplete="tel" dir="ltr" maxlength="30" placeholder="+966 5x xxx xxxx" pattern="[0-9+()\\s-]{7,30}" data-msg-type="${t('Use digits, spaces and + only.', 'استخدم الأرقام والمسافات و+ فقط.')}">
            ${err('c-phone')}
          </div>
        </div>
        <div class="field">
          <label for="c-message">${t('How can we help?', 'كيف يمكننا مساعدتك؟')}</label>
          <span class="hint" id="c-message-hint">${t('A few lines is plenty: what you run today and what you’d like to change.', 'بضعة أسطر تكفي: ما تشغّله اليوم وما ترغب في تغييره.')}</span>
          <textarea class="textarea" id="c-message" name="message" required minlength="10" maxlength="5000" aria-describedby="c-message-hint" data-msg-required="${t('Tell us a little about your project.', 'أخبرنا قليلًا عن مشروعك.')}" data-msg-short="${t('Add a little more detail (at least 10 characters).', 'أضف مزيدًا من التفاصيل (10 أحرف على الأقل).')}"></textarea>
          ${err('c-message')}
        </div>
        <div class="alert alert--success" role="status" data-form-success data-status-msg="sent">${icon('checkCircle')}<span>${t('Thanks — your message is in. An engineer will reply by email.', 'شكرًا لك — وصلتنا رسالتك. سيرد عليك أحد مهندسينا عبر البريد.')}</span></div>
        <div class="alert alert--error" role="alert" data-form-failure data-status-msg="failed">${icon('alert')}<span>${t('Your message didn’t send. Please try again, or email us at', 'لم تُرسل رسالتك. حاول مرة أخرى أو راسلنا على')} ${SITE.email}.</span></div>
        <div>
          <button class="btn btn--primary" type="submit"><span class="spinner" aria-hidden="true"></span><span>${t('Send message', 'أرسل الرسالة')}</span></button>
          <p class="small muted mt-3">${t('We use your details only to reply to you. See our', 'نستخدم بياناتك فقط للرد عليك. اطّلع على')} <a href="${ctx.href('privacy')}">${t('privacy policy', 'سياسة الخصوصية')}</a>.</p>
        </div>
      </form>
    </div>
  </div>
</section>`;
  },
};

const blog = {
  slug: 'blog',
  title: { en: 'Insights', ar: 'المقالات' },
  description: {
    en: 'Practical guides from CloudPros engineers on AWS security, cost optimization, DevOps and cloud migration.',
    ar: 'أدلة عملية من مهندسي CloudPros حول أمن AWS وتحسين التكاليف وDevOps والترحيل إلى السحابة.',
  },
  render(ctx) {
    const { t } = ctx;
    const posts = [
      [t('Cloud security', 'أمن السحابة'), t('Securing your S3 buckets: a practical guide', 'تأمين حاويات S3: دليل عملي'), t('Misconfigured S3 buckets remain a leading cause of data breaches. The settings, IAM policies and monitoring that keep your data private.', 'لا تزال حاويات S3 سيئة الإعداد سببًا رئيسيًا لتسرب البيانات. الإعدادات وسياسات IAM والمراقبة التي تبقي بياناتك خاصة.'), 'Mohammed Al-Zahrani'],
      [t('Cost optimization', 'تحسين التكاليف'), t('5 strategies for lowering your AWS bill', '5 استراتيجيات لخفض فاتورة AWS'), t('From right-sizing instances to Savings Plans: practical steps that reduce monthly spend without hurting performance.', 'من ضبط أحجام الخوادم إلى خطط التوفير: خطوات عملية تخفض الإنفاق الشهري دون المساس بالأداء.'), 'Mutasim Kharif'],
      [t('DevOps', 'DevOps'), t('The future of DevOps: trends to watch', 'مستقبل DevOps: توجهات تستحق المتابعة'), t('From GitOps to AI-assisted automation — what will shape delivery pipelines in the year ahead.', 'من GitOps إلى الأتمتة بمساعدة الذكاء الاصطناعي — ما الذي سيشكّل خطوط التسليم في العام المقبل.'), 'Bashar Wahsh'],
      [t('Cloud migration', 'الترحيل إلى السحابة'), t('A step-by-step cloud migration checklist', 'قائمة تحقق خطوة بخطوة للترحيل إلى السحابة'), t('Planning a move to AWS? Every stage, from assessment to post-migration optimization.', 'تخطط للانتقال إلى AWS؟ كل المراحل، من التقييم إلى التحسين بعد الترحيل.'), t('CloudPros team', 'فريق CloudPros')],
    ];
    return `${pageHero(ctx, {
      eyebrow: t('Insights', 'المقالات'),
      title: t('Notes from the field', 'ملاحظات من الميدان'),
      lead: t('Practical writing from our engineers on cloud, DevOps, security and infrastructure. The first articles are being written now.', 'كتابات عملية من مهندسينا عن السحابة وDevOps والأمن والبنية التحتية. نعمل الآن على كتابة المقالات الأولى.'),
      crumbs: [[t('Insights', 'المقالات')]],
    })}
<section class="section">
  <div class="container">
    <div class="kicker-line mb-6" style="margin-bottom:var(--s-6)"><p class="eyebrow">${t('Coming soon', 'قريبًا')}</p></div>
    <div class="grid grid--2">
      ${posts.map(([cat, h, p, by]) => `<article class="post">
        <div class="post__meta"><span class="card__tag">${cat}</span><span class="status">${t('In progress', 'قيد الكتابة')}</span></div>
        <h2 style="font-size:1.375rem">${h}</h2>
        <p>${p}</p>
        <p class="small muted">${t('By', 'بقلم')} ${by}</p>
      </article>`).join('')}
    </div>
    <p class="notice mt-7">${t('Want these when they’re published? Subscribe to our monthly notes at the bottom of this page.', 'هل تريد قراءتها فور نشرها؟ اشترك في ملاحظاتنا الشهرية أسفل هذه الصفحة.')}</p>
  </div>
</section>`;
  },
};

const privacy = {
  slug: 'privacy',
  title: { en: 'Privacy policy', ar: 'سياسة الخصوصية' },
  description: { en: 'How CloudPros collects, uses and protects personal data submitted through this website.', ar: 'كيف تجمع CloudPros البيانات الشخصية المرسلة عبر هذا الموقع وتستخدمها وتحميها.' },
  render(ctx) {
    const { t, href } = ctx;
    const ul = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
    return `${pageHero(ctx, {
      eyebrow: t('Legal', 'قانوني'),
      title: t('Privacy policy', 'سياسة الخصوصية'),
      lead: t('Last updated: July 9, 2025', 'آخر تحديث: 9 يوليو 2025'),
      crumbs: [[t('Privacy policy', 'سياسة الخصوصية')]],
    })}
<section class="section">
  <div class="container"><div class="prose legal">
    <p>${t('CloudPros (“us”, “we”, or “our”) operates this website (the “Service”). This page explains our policies on the collection, use and disclosure of personal data when you use the Service, and the choices you have.', 'تُشغّل CloudPros («نحن») هذا الموقع («الخدمة»). توضح هذه الصفحة سياساتنا بشأن جمع البيانات الشخصية واستخدامها والإفصاح عنها عند استخدامك للخدمة، والخيارات المتاحة لك.')}</p>
    <h2>${t('1. Information we collect', '1. المعلومات التي نجمعها')}</h2>
    <p>${t('While using the Service we may ask you for personally identifiable information that can be used to contact or identify you (“Personal Data”), including:', 'أثناء استخدامك للخدمة قد نطلب منك معلومات تعريف شخصية يمكن استخدامها للتواصل معك أو التعرف عليك («البيانات الشخصية»)، ومنها:')}</p>
    ${ul([t('Email address', 'البريد الإلكتروني'), t('First, middle and last name', 'الاسم الأول والأوسط والأخير'), t('Username', 'اسم المستخدم'), t('Phone number', 'رقم الهاتف'), t('Company name', 'اسم الشركة'), t('Usage data', 'بيانات الاستخدام')])}
    <h2>${t('2. How we use your information', '2. كيف نستخدم معلوماتك')}</h2>
    ${ul([t('To provide and maintain the Service', 'لتقديم الخدمة وصيانتها'), t('To reply to your enquiries and provide customer support', 'للرد على استفساراتك وتقديم الدعم'), t('To send the newsletter you subscribed to', 'لإرسال النشرة التي اشتركت فيها'), t('To notify you about changes to the Service', 'لإبلاغك بالتغييرات على الخدمة'), t('To analyze and improve the Service', 'لتحليل الخدمة وتحسينها'), t('To detect, prevent and address technical issues', 'لاكتشاف المشكلات التقنية ومنعها ومعالجتها')])}
    <h2>${t('3. Data security', '3. أمن البيانات')}</h2>
    <p>${t('The security of your data is important to us, but no method of transmission over the internet or electronic storage is 100% secure. We use commercially acceptable means to protect your Personal Data but cannot guarantee its absolute security.', 'أمن بياناتك مهم لنا، لكن لا توجد وسيلة نقل عبر الإنترنت أو تخزين إلكتروني آمنة بنسبة 100%. نستخدم وسائل مقبولة تجاريًا لحماية بياناتك الشخصية، لكن لا يمكننا ضمان أمنها المطلق.')}</p>
    <h2>${t('4. Your data protection rights', '4. حقوقك في حماية البيانات')}</h2>
    <p>${t('You can ask us to tell you what Personal Data we hold about you, and to correct, update, delete or limit the use of it. To do so, contact us using the details below.', 'يمكنك أن تطلب منا معرفة البيانات الشخصية التي نحتفظ بها عنك، وتصحيحها أو تحديثها أو حذفها أو تقييد استخدامها. للقيام بذلك، تواصل معنا عبر البيانات أدناه.')}</p>
    <h2>${t('5. Changes to this policy', '5. التغييرات على هذه السياسة')}</h2>
    <p>${t('We may update this policy from time to time. We will post the new version on this page, update the date at the top, and where appropriate notify you by email or a notice on the Service before the change takes effect.', 'قد نحدّث هذه السياسة من وقت لآخر. سننشر النسخة الجديدة في هذه الصفحة ونحدّث التاريخ أعلاها، ونبلغك عند الاقتضاء عبر البريد أو بإشعار في الخدمة قبل سريان التغيير.')}</p>
    <h2>${t('6. Contact us', '6. تواصل معنا')}</h2>
    <p>${t('Questions about this policy? Email', 'لديك أسئلة حول هذه السياسة؟ راسلنا على')} <a href="mailto:${SITE.email}">${SITE.email}</a> ${t('or use our', 'أو استخدم')} <a href="${href('contact')}">${t('contact form', 'نموذج التواصل')}</a>.</p>
  </div></div>
</section>`;
  },
};

export default [about, team, contact, blog, privacy];
