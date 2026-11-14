import { servicePage, feature, mediaImg } from '../lib.mjs';
import { networkTopology, connectivity } from '../diagrams.mjs';

const diagram = (svg, caption) => `<figure class="diagram">${svg}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
const cards = (ctx, items) => `<div class="grid grid--2">${items.map(([ic, h, p]) => `<div class="card"><span class="card__icon">${ctx.icon(ic)}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>`;

const architecture = {
  slug: 'service-network-architecture',
  title: { en: 'Network architecture & design', ar: 'تصميم وهندسة الشبكات' },
  description: {
    en: 'Secure, scalable network foundations on AWS: VPC design and subnetting, Route 53 DNS and routing, hybrid networking with Transit Gateway and Direct Connect, and CloudFront content delivery.',
    ar: 'أسس شبكية آمنة وقابلة للتوسع على AWS: تصميم VPC والشبكات الفرعية، وDNS والتوجيه عبر Route 53، والشبكات الهجينة عبر Transit Gateway وDirect Connect، وتوزيع المحتوى عبر CloudFront.',
  },
  render(ctx) {
    const { t } = ctx;
    return servicePage(ctx, {
      slug: 'service-network-architecture',
      lead: t('One network design that covers your AWS accounts, offices and data center — addressed, routed and documented so your team knows where every packet goes.', 'تصميم شبكة واحد يشمل حسابات AWS ومكاتبك ومركز بياناتك — بعناوين وتوجيه وتوثيق يعرف معه فريقك مسار كل حزمة.'),
      features: [
        `<div class="split split--center">
          <div class="stack-5">
            <p class="eyebrow">${t('Our approach', 'نهجنا')}</p>
            <h2>${t('The network decides how everything else performs', 'الشبكة تحدد أداء كل ما عداها')}</h2>
            <p class="lead">${t('A well-designed network is critical for performance, security and scale. Our certified architects build bespoke foundations on AWS best practices — documented, so your team understands every route.', 'الشبكة المصممة جيدًا أساسية للأداء والأمان والتوسع. يبني معماريونا المعتمدون أسسًا مخصصة وفق أفضل ممارسات AWS — موثقة، ليفهم فريقك كل مسار فيها.')}</p>
          </div>
          ${diagram(networkTopology(t), t('Example topology: edge services in front, a Transit Gateway joining VPCs and the on-premises network.', 'مثال على المخطط: خدمات الحافة في الواجهة، وTransit Gateway تربط شبكات VPC والشبكة المحلية.'))}
        </div>`,
        cards(ctx, [
          ['grid', t('VPC design & subnetting', 'تصميم VPC والشبكات الفرعية'), t('Logically isolated networks with deliberate public and private subnets, so resources are secure and organized from the ground up.', 'شبكات معزولة منطقيًا بشبكات فرعية عامة وخاصة مدروسة، لتكون الموارد آمنة ومنظمة من الأساس.')],
          ['globe', t('Scalable DNS & routing', 'DNS وتوجيه قابلان للتوسع'), t('Amazon Route 53 with routing policies — latency, failover, weighted — for reliable, cost-effective traffic management.', 'Amazon Route 53 مع سياسات توجيه — حسب زمن الاستجابة أو التحويل عند الأعطال أو الأوزان — لإدارة حركة موثوقة وفعالة التكلفة.')],
          ['swap', t('Hybrid cloud networking', 'الشبكات السحابية الهجينة'), t('AWS Transit Gateway and Direct Connect to join many VPCs and your physical sites into one routed network.', 'AWS Transit Gateway وDirect Connect لربط العديد من شبكات VPC ومواقعك المادية في شبكة موحّدة.')],
          ['cloud', t('Global content delivery', 'توزيع المحتوى عالميًا'), t('Amazon CloudFront caches your sites, apps and APIs at edge locations close to your users, securely and with low latency.', 'يخزّن Amazon CloudFront مواقعك وتطبيقاتك وواجهاتك البرمجية مؤقتًا في مواقع حافة قريبة من مستخدميك، بأمان وزمن استجابة منخفض.')],
        ]),
      ],
      related: ['service-connectivity-solutions', 'service-security-compliance', 'service-infrastructure-maintenance'],
      cta: t('Talk to a network engineer', 'تحدّث مع مهندس شبكات'),
    });
  },
};

const connect = {
  slug: 'service-connectivity-solutions',
  title: { en: 'Connectivity solutions', ar: 'حلول الربط والاتصال' },
  description: {
    en: 'Secure, reliable links between your sites and AWS: Site-to-Site VPN, AWS Direct Connect, VPC peering, and analysis to pick the right mix for performance and cost.',
    ar: 'روابط آمنة وموثوقة بين مواقعك وAWS: شبكات VPN بين المواقع، وAWS Direct Connect، وربط VPC، وتحليل لاختيار المزيج الأنسب للأداء والتكلفة.',
  },
  render(ctx) {
    const { t } = ctx;
    return servicePage(ctx, {
      slug: 'service-connectivity-solutions',
      lead: t('Secure, reliable pathways between your data centers, offices and AWS — a true hybrid environment that behaves like one network.', 'مسارات آمنة وموثوقة بين مراكز بياناتك ومكاتبك وAWS — بيئة هجينة حقيقية تعمل كشبكة واحدة.'),
      features: [
        `<figure class="diagram">${connectivity(t)}<figcaption>${t('Two ways in: an encrypted VPN over the internet, and a private Direct Connect circuit. A common pattern is to run both, with the VPN as backup.', 'طريقتان للاتصال: VPN مشفّرة عبر الإنترنت، ودائرة Direct Connect خاصة. من الأنماط الشائعة تشغيل الاثنين معًا، مع VPN كخط احتياطي.')}</figcaption></figure>`,
        feature(ctx, {
          index: '01', title: 'AWS Site-to-Site VPN',
          text: t('Encrypted IPsec tunnels between your network and your Amazon VPC. Flexible and cost-effective — ideal for moderate bandwidth and as a redundant path alongside Direct Connect.', 'أنفاق IPsec مشفّرة بين شبكتك وAmazon VPC. حل مرن وفعّال التكلفة — مثالي للاحتياجات المتوسطة من النطاق الترددي وكمسار احتياطي إلى جانب Direct Connect.'),
          checks: [t('Redundant tunnels for high availability', 'أنفاق مكررة لتوفر عالٍ'), t('Works with your existing firewall or router', 'يعمل مع جدار الحماية أو الموجّه الحالي لديك')],
          media: `<div class="card"><span class="card__icon">${ctx.icon('lock')}</span><p class="card__tag">${t('Best for', 'الأنسب لـ')}</p><p>${t('Branch offices, quick setup, backup links, moderate bandwidth.', 'الفروع، والإعداد السريع، وروابط الاحتياط، والنطاق الترددي المتوسط.')}</p></div>`,
        }),
        feature(ctx, {
          index: '02', title: 'AWS Direct Connect',
          text: t('A dedicated, private connection from your data center to AWS that bypasses the public internet — for consistent high bandwidth, lower latency and more predictable data-transfer costs.', 'اتصال خاص ومخصص من مركز بياناتك إلى AWS يتجاوز الإنترنت العام — لنطاق ترددي عالٍ ومستقر وزمن استجابة أقل وتكاليف نقل بيانات أكثر قابلية للتنبؤ.'),
          media: `<div class="card"><span class="card__icon">${ctx.icon('bolt')}</span><p class="card__tag">${t('Best for', 'الأنسب لـ')}</p><p>${t('Production workloads, large data transfers, latency-sensitive applications.', 'أحمال الإنتاج، ونقل البيانات الكبيرة، والتطبيقات الحساسة لزمن الاستجابة.')}</p></div>`,
        }),
        feature(ctx, {
          index: '03', title: t('VPC peering', 'ربط شبكات VPC'),
          text: t('Connect VPCs — even across AWS accounts — as if they were one private network. Resources are shared securely, and traffic never crosses the public internet.', 'اربط شبكات VPC — حتى عبر حسابات AWS مختلفة — كأنها شبكة خاصة واحدة. تُشارك الموارد بأمان، ولا تمر الحركة عبر الإنترنت العام أبدًا.'),
          media: `<div class="card"><span class="card__icon">${ctx.icon('link')}</span><p class="card__tag">${t('Best for', 'الأنسب لـ')}</p><p>${t('Shared services, multi-account setups, separating production from development.', 'الخدمات المشتركة، والحسابات المتعددة، وفصل بيئة الإنتاج عن التطوير.')}</p></div>`,
        }),
        feature(ctx, {
          index: '04', title: t('Network performance & cost analysis', 'تحليل أداء الشبكة وتكلفتها'),
          text: t('Choosing the connectivity model is a budget decision as much as a technical one. We analyze your traffic patterns, application needs and security requirements and recommend the most efficient mix.', 'اختيار نموذج الاتصال قرار مالي بقدر ما هو تقني. نحلل أنماط حركة بياناتك واحتياجات تطبيقاتك ومتطلباتك الأمنية ونوصي بالمزيج الأكثر كفاءة.'),
          media: `<div class="card"><span class="card__icon">${ctx.icon('pie')}</span><p class="card__tag">${t('You get', 'تحصل على')}</p><p>${t('A written recommendation with expected monthly costs for each option.', 'توصية مكتوبة مع التكاليف الشهرية المتوقعة لكل خيار.')}</p></div>`,
        }),
      ],
      related: ['service-network-architecture', 'cloud-mig', 'service-data-center'],
      cta: t('Design my connectivity', 'صمّم اتصال شبكتي'),
    });
  },
};

const maintenance = {
  slug: 'service-infrastructure-maintenance',
  title: { en: 'IT infrastructure maintenance', ar: 'صيانة البنية التحتية لتقنية المعلومات' },
  description: {
    en: 'Proactive monitoring, patch management, hardware lifecycle management, backup and recovery, and technical support that keep your IT systems healthy.',
    ar: 'مراقبة استباقية، وإدارة التحديثات، وإدارة دورة حياة الأجهزة، والنسخ الاحتياطي والاستعادة، ودعم فني يحافظ على سلامة أنظمتك.',
  },
  render(ctx) {
    const { t } = ctx;
    return servicePage(ctx, {
      slug: 'service-infrastructure-maintenance',
      lead: t('Proactive care for your servers, network and storage — so problems are caught early, systems stay patched, and your team isn’t firefighting.', 'رعاية استباقية لخوادمك وشبكتك وأنظمة التخزين — لاكتشاف المشكلات مبكرًا، وإبقاء الأنظمة محدّثة، وتحرير فريقك من إطفاء الحرائق.'),
      features: [
        feature(ctx, {
          id: 'monitoring', index: '01', title: t('Proactive monitoring', 'المراقبة الاستباقية'),
          text: t('We watch the health of your servers, network devices and storage continuously, with alerts that reach an engineer before a warning becomes an outage.', 'نراقب سلامة خوادمك وأجهزة الشبكة والتخزين باستمرار، بتنبيهات تصل إلى مهندس قبل أن يتحول التحذير إلى انقطاع.'),
          checks: [t('Performance, capacity and availability metrics', 'مقاييس الأداء والسعة والتوفر'), t('Alert thresholds tuned to your environment', 'عتبات تنبيه مضبوطة وفق بيئتك'), t('Regular health reports', 'تقارير دورية عن الحالة')],
          media: mediaImg(ctx, 'mt-monitoring', t('Engineer reviewing monitoring dashboards on several screens', 'مهندس يراجع لوحات المراقبة على عدة شاشات'), 'media--square'),
        }),
        feature(ctx, {
          id: 'patching', index: '02', title: t('Patch management', 'إدارة التحديثات'),
          text: t('Operating system and firmware updates tested and applied on a schedule that fits your business, closing security gaps without unplanned downtime.', 'تحديثات أنظمة التشغيل والبرامج الثابتة تُختبر وتُطبّق وفق جدول يناسب عملك، لسد الثغرات الأمنية دون توقف غير مخطط.'),
          media: mediaImg(ctx, 'mt-patching', t('Engineers working on servers and workstations during a maintenance window', 'مهندسون يعملون على الخوادم ومحطات العمل خلال نافذة صيانة'), 'media--square'),
        }),
        feature(ctx, {
          id: 'lifecycle', index: '03', title: t('Hardware lifecycle management', 'إدارة دورة حياة الأجهزة'),
          text: t('An up-to-date inventory of your hardware with warranty and end-of-support dates, so replacements are planned and budgeted — not emergencies.', 'جرد محدّث لأجهزتك يتضمن تواريخ الضمان وانتهاء الدعم، ليكون الاستبدال مخططًا وضمن الميزانية — لا حالة طارئة.'),
          media: mediaImg(ctx, 'mt-lifecycle', t('Technician checking a server rack with a hardware lifecycle checklist on a tablet', 'فني يفحص خزانة خوادم مع قائمة دورة حياة الأجهزة على جهاز لوحي'), 'media--square'),
        }),
        feature(ctx, {
          id: 'backup', index: '04', title: t('Backup & recovery', 'النسخ الاحتياطي والاستعادة'),
          text: t('On-premises and cloud backups configured, monitored and — most importantly — restore-tested, so you know your data can actually come back.', 'نسخ احتياطية محلية وسحابية تُهيّأ وتُراقب، والأهم أنها تُختبر بالاستعادة، لتتأكد أن بياناتك قابلة للاسترجاع فعلًا.'),
          media: mediaImg(ctx, 'mt-backup', t('Technician working on backup servers and storage in a server room', 'فني يعمل على خوادم النسخ الاحتياطي والتخزين في غرفة الخوادم'), 'media--square'),
        }),
        feature(ctx, {
          id: 'support', index: '05', title: t('Technical support', 'الدعم الفني'),
          text: t('A team that already knows your environment, for incidents, changes and day-to-day questions.', 'فريق يعرف بيئتك مسبقًا، للتعامل مع الأعطال والتغييرات والأسئلة اليومية.'),
          media: mediaImg(ctx, 'mt-support', t('Support engineers at their desks helping clients', 'مهندسو الدعم على مكاتبهم يساعدون العملاء'), 'media--square'),
        }),
      ],
      related: ['service-network-architecture', 'service-data-center', 'service-security-compliance'],
      cta: t('Discuss a maintenance plan', 'ناقش خطة صيانة'),
    });
  },
};

export default [architecture, connect, maintenance];
