import { servicePage, feature, mediaImg } from '../lib.mjs';
import { pipeline, securityLayers } from '../diagrams.mjs';

const diagram = (svg, caption) => `<figure class="diagram">${svg}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;

const migration = {
  slug: 'cloud-mig',
  title: { en: 'Cloud migration & strategy', ar: 'الترحيل إلى السحابة والاستراتيجية' },
  description: {
    en: 'A planned move to AWS: readiness assessment, the right migration path for each application, secure data transfer and post-migration cost and performance tuning.',
    ar: 'انتقال مخطط إلى AWS: تقييم الجاهزية، والمسار المناسب لترحيل كل تطبيق، ونقل آمن للبيانات، وتحسين التكلفة والأداء بعد الترحيل.',
  },
  render(ctx) {
    const { t } = ctx;
    const paths = [
      [t('Rehost', 'إعادة الاستضافة'), t('“Lift and shift”', '«الرفع والنقل»'), t('Move applications to AWS with minimal changes. The fastest route to leaving ageing hardware, and immediate infrastructure savings.', 'نقل التطبيقات إلى AWS بأقل قدر من التغييرات. أسرع طريق للتخلص من الأجهزة المتقادمة وتحقيق وفورات فورية في البنية التحتية.')],
      [t('Replatform', 'إعادة التهيئة'), t('“Lift and reshape”', '«الرفع مع التحسين»'), t('Move while making targeted cloud optimizations — for example, managed databases on Amazon RDS — for better performance and resilience.', 'النقل مع إجراء تحسينات سحابية محددة — مثل قواعد البيانات المُدارة على Amazon RDS — لأداء ومرونة أفضل.')],
      [t('Refactor', 'إعادة البناء'), t('Cloud-native', 'سحابي أصيل'), t('Rebuild applications as cloud-native services — serverless or microservices — where the business case justifies maximum scalability and agility.', 'إعادة بناء التطبيقات كخدمات سحابية أصيلة — بلا خوادم أو خدمات مصغّرة — حين يبرر العائد الحاجة إلى أقصى قابلية للتوسع والمرونة.')],
    ];
    return servicePage(ctx, {
      slug: 'cloud-mig',
      lead: t('A strategic path to AWS: we assess what you run, choose the right approach for each application, and move it with minimal disruption to your business.', 'مسار استراتيجي إلى AWS: نقيّم ما تشغّله، ونختار النهج المناسب لكل تطبيق، وننقله بأقل تعطيل ممكن لأعمالك.'),
      features: [
        feature(ctx, {
          index: '01', title: t('Cloud readiness assessment', 'تقييم الجاهزية للسحابة'),
          text: t('We analyze your infrastructure, applications and their dependencies to build a detailed migration roadmap — including total cost of ownership and a risk assessment you can take to management.', 'نحلل بنيتك التحتية وتطبيقاتك والترابط بينها لإعداد خارطة طريق مفصلة للترحيل — تشمل تحليل التكلفة الإجمالية للملكية وتقييمًا للمخاطر يمكنك عرضه على الإدارة.'),
          checks: [t('Application and dependency inventory', 'حصر التطبيقات والترابطات بينها'), t('TCO comparison: on-premises vs. AWS', 'مقارنة التكلفة الإجمالية: محليًا مقابل AWS'), t('Phased roadmap with risks and owners', 'خارطة طريق مرحلية مع المخاطر والمسؤولين')],
          media: mediaImg(ctx, 'mig-assessment', t('Cloud readiness assessment showing an infrastructure review, TCO analysis and risk assessment', 'تقييم الجاهزية للسحابة يوضح مراجعة البنية التحتية وتحليل التكلفة وتقييم المخاطر'), 'media--wide'),
        }),
        feature(ctx, {
          index: '02', title: t('Secure data migration', 'ترحيل آمن للبيانات'),
          text: t('We transfer critical data to AWS securely and efficiently using services such as AWS Database Migration Service, keeping systems in sync so the final cut-over window is as short as possible.', 'ننقل بياناتك الحرجة إلى AWS بأمان وكفاءة باستخدام خدمات مثل AWS Database Migration Service، مع إبقاء الأنظمة متزامنة لتكون نافذة التحويل النهائي أقصر ما يمكن.'),
          checks: [t('Encrypted in transit and at rest', 'تشفير أثناء النقل والتخزين'), t('Continuous replication until cut-over', 'نسخ متواصل حتى لحظة التحويل'), t('Validation and rollback plan', 'التحقق من البيانات وخطة للتراجع')],
          media: mediaImg(ctx, 'mig-data', t('Illustration of data moving from servers into the cloud', 'رسم توضيحي لانتقال البيانات من الخوادم إلى السحابة'), 'media--wide'),
        }),
      ],
      extra: `<section class="section section--alt">
  <div class="container">
    <div class="section-head section-head--row">
      <div class="stack-4"><p class="eyebrow">${t('Migration paths', 'مسارات الترحيل')}</p><h2>${t('The right move for each application', 'الخطوة المناسبة لكل تطبيق')}</h2></div>
      <p class="lead">${t('Not everything should be rebuilt, and not everything should be lifted as-is. The assessment decides, application by application.', 'ليس كل شيء يستحق إعادة البناء، وليس كل شيء يُنقل كما هو. التقييم هو ما يحدد ذلك، تطبيقًا تلو الآخر.')}</p>
    </div>
    <div class="grid grid--3">
      ${paths.map(([h, k, p]) => `<div class="card"><p class="card__tag">${k}</p><h3>${h}</h3><p>${p}</p></div>`).join('')}
    </div>
    <div class="mt-7 split split--even">
      <div class="stack-3"><p class="eyebrow">${t('After go-live', 'بعد الإطلاق')}</p><h3>${t('Post-migration optimization', 'التحسين بعد الترحيل')}</h3></div>
      <p class="lead">${t('Once you’re running on AWS, we tune the environment for cost, performance and security — right-sizing, Savings Plans and storage tiers — so you get the most out of your investment.', 'بعد التشغيل على AWS، نضبط البيئة لتحقيق أفضل تكلفة وأداء وأمان — من ضبط أحجام الموارد إلى خطط التوفير وفئات التخزين — لتحصل على أقصى عائد من استثمارك.')}</p>
    </div>
  </div>
</section>`,
      related: ['service-connectivity-solutions', 'service-devops-automation', 'service-security-compliance'],
      cta: t('Plan your migration', 'خطط لترحيلك'),
    });
  },
};

const devops = {
  slug: 'service-devops-automation',
  title: { en: 'DevOps & automation', ar: 'DevOps والأتمتة' },
  description: {
    en: 'CI/CD pipelines, infrastructure as code with Terraform or CloudFormation, and containers on Amazon EKS — so your teams release faster and more reliably.',
    ar: 'خطوط CI/CD، والبنية التحتية ككود باستخدام Terraform أو CloudFormation، والحاويات على Amazon EKS — لتطلق فرقك التحديثات بسرعة وموثوقية أعلى.',
  },
  render(ctx) {
    const { t } = ctx;
    return servicePage(ctx, {
      slug: 'service-devops-automation',
      lead: t('Automated pipelines that speed up software delivery, make releases predictable and give your engineers time back for real work.', 'خطوط تسليم آلية تسرّع إصدار البرمجيات، وتجعل الإطلاقات متوقعة، وتعيد لمهندسيك الوقت للعمل الحقيقي.'),
      intro: `<div class="stack-4"><p class="eyebrow">${t('Our approach', 'نهجنا')}</p><h2>${t('A cultural and technical shift, not just tools', 'تحول ثقافي وتقني، لا مجرد أدوات')}</h2></div><p class="lead">${t('DevOps bridges development and operations. We automate every stage of the software lifecycle so your teams ship higher-quality software faster, with fewer manual steps and fewer surprises in production.', 'تربط DevOps بين التطوير والتشغيل. نؤتمت كل مرحلة من دورة حياة البرمجيات لتطلق فرقك برمجيات أعلى جودة بسرعة أكبر، بخطوات يدوية أقل ومفاجآت أقل في بيئة الإنتاج.')}</p>`,
      features: [
        feature(ctx, {
          index: '01', title: t('CI/CD pipeline implementation', 'تنفيذ خطوط CI/CD'),
          text: t('We automate build, test and deployment with AWS CodePipeline, Jenkins or GitLab CI. Every change takes the same tested path to production — fewer manual errors, faster time to market.', 'نؤتمت البناء والاختبار والنشر باستخدام AWS CodePipeline أو Jenkins أو GitLab CI. يسلك كل تغيير المسار المُختبَر نفسه إلى الإنتاج — أخطاء يدوية أقل ووصول أسرع إلى السوق.'),
          checks: [t('Automated tests on every commit', 'اختبارات آلية مع كل إيداع'), t('Approvals and rollbacks built in', 'موافقات وإمكانية تراجع مدمجة'), t('Blue/green or canary releases', 'إطلاقات Blue/Green أو Canary')],
          media: diagram(pipeline(t)),
        }),
        feature(ctx, {
          index: '02', title: t('Infrastructure as code', 'البنية التحتية ككود'),
          text: t('Your whole environment defined in Terraform or AWS CloudFormation: version-controlled, reviewable and repeatable. No more configuration drift, and every new environment is built from the same tested code.', 'بيئتك بالكامل معرّفة في Terraform أو AWS CloudFormation: خاضعة لإدارة الإصدارات وقابلة للمراجعة والتكرار. لا مزيد من انحراف الإعدادات، وكل بيئة جديدة تُبنى من الكود المُختبَر نفسه.'),
          checks: [t('Peer-reviewed infrastructure changes', 'تغييرات بنية تحتية تخضع للمراجعة'), t('Identical dev, test and production', 'بيئات تطوير واختبار وإنتاج متطابقة'), t('Audit trail for every change', 'سجل تدقيق لكل تغيير')],
          media: mediaImg(ctx, 'devops-desk', t('Engineer’s workstation showing an automated DevOps workflow', 'محطة عمل مهندس تعرض سير عمل DevOps آليًا'), 'media--square'),
        }),
        feature(ctx, {
          index: '03', title: t('Containers & orchestration', 'الحاويات والتنسيق'),
          text: t('Portable, resilient microservices with Docker, orchestrated by Kubernetes on Amazon EKS. Applications are isolated, scale on demand and are far simpler to manage at size.', 'خدمات مصغّرة قابلة للنقل ومرنة باستخدام Docker، يديرها Kubernetes على Amazon EKS. التطبيقات معزولة، وتتوسع حسب الطلب، وإدارتها أبسط بكثير مع النمو.'),
          media: mediaImg(ctx, 'devops-platform', t('Isometric illustration of a cloud platform with connected services', 'رسم متساوي القياس لمنصة سحابية بخدمات مترابطة'), 'media--square'),
        }),
      ],
      related: ['cloud-mig', 'service-security-compliance', 'service-network-architecture'],
      cta: t('Talk to a DevOps engineer', 'تحدث مع مهندس DevOps'),
    });
  },
};

const security = {
  slug: 'service-security-compliance',
  title: { en: 'Security & compliance', ar: 'الأمن والامتثال' },
  description: {
    en: 'Security posture assessments, IAM with least privilege, threat detection with GuardDuty, WAF and Security Hub, and compliance automation for ISO 27001, SOC 2, HIPAA and GDPR.',
    ar: 'تقييم الوضع الأمني، وإدارة الهويات وفق مبدأ أقل الصلاحيات، واكتشاف التهديدات عبر GuardDuty وWAF وSecurity Hub، وأتمتة الامتثال لمعايير ISO 27001 وSOC 2 وHIPAA وGDPR.',
  },
  render(ctx) {
    const { t, icon } = ctx;
    const items = [
      ['search', t('Security posture assessment', 'تقييم الوضع الأمني'), t('A full audit of your environment that finds the gaps and turns them into a prioritized roadmap.', 'تدقيق شامل لبيئتك يكشف الثغرات ويحوّلها إلى خارطة طريق مرتبة حسب الأولوية.')],
      ['key', t('Identity & access management', 'إدارة الهويات والصلاحيات'), t('Least-privilege access, so the right people have the right access to the right resources — and nothing more.', 'صلاحيات وفق مبدأ الحد الأدنى، ليحصل الأشخاص المناسبون على الوصول المناسب إلى الموارد المناسبة — لا أكثر.')],
      ['eye', t('Threat detection & prevention', 'اكتشاف التهديدات ومنعها'), t('Amazon GuardDuty, AWS WAF and Security Hub configured to spot and respond to threats early.', 'تهيئة Amazon GuardDuty وAWS WAF وSecurity Hub لرصد التهديدات والاستجابة لها مبكرًا.')],
      ['docCheck', t('Compliance automation', 'أتمتة الامتثال'), t('Automated controls and reporting that help you meet ISO 27001, SOC 2, HIPAA and GDPR — and stay compliant.', 'ضوابط وتقارير آلية تساعدك على استيفاء ISO 27001 وSOC 2 وHIPAA وGDPR — والبقاء ممتثلًا.')],
    ];
    return servicePage(ctx, {
      slug: 'service-security-compliance',
      lead: t('Security built into every layer of your cloud, so your data is protected and you can show auditors exactly how.', 'أمن مدمج في كل طبقة من سحابتك، لتبقى بياناتك محمية وتستطيع أن تُثبت للمدققين كيف تحميها بالضبط.'),
      features: [
        `<div class="split split--center">
          <div class="stack-5">
            <p class="eyebrow">${t('Defense in depth', 'الدفاع متعدد الطبقات')}</p>
            <h2>${t('Layers that back each other up', 'طبقات يدعم بعضها بعضًا')}</h2>
            <p class="lead">${t('We follow the AWS Well-Architected security pillar: strict identity controls, segmented networks, encryption everywhere and continuous monitoring. If one layer fails, the next one holds.', 'نتبع ركيزة الأمان في إطار AWS Well-Architected: ضوابط هوية صارمة، وشبكات مقسّمة، وتشفير في كل مكان، ومراقبة مستمرة. إذا أخفقت طبقة، صمدت التي تليها.')}</p>
          </div>
          ${diagram(securityLayers(t))}
        </div>`,
        `<div class="grid grid--2">${items.map(([ic, h, p]) => `<div class="card"><span class="card__icon">${icon(ic)}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>`,
      ],
      related: ['service-network-architecture', 'service-devops-automation', 'cloud-mig'],
      cta: t('Request a security review', 'اطلب مراجعة أمنية'),
    });
  },
};

export default [migration, devops, security];
