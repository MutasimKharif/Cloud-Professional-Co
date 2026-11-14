import { servicePage, feature, mediaImg } from '../lib.mjs';
import { meetingRoom } from '../diagrams.mjs';

const dataCenter = {
  slug: 'service-data-center',
  title: { en: 'Data center design & build', ar: 'تصميم وبناء مراكز البيانات' },
  description: {
    en: 'End-to-end data center services: greenfield builds, environmental monitoring, precision cooling (CRAC/CRAH), clean-agent fire suppression (FM-200, Novec 1230), and UPS and power distribution.',
    ar: 'خدمات متكاملة لمراكز البيانات: بناء المرافق الجديدة، والمراقبة البيئية، والتبريد الدقيق (CRAC/CRAH)، وأنظمة الإطفاء بالعوامل النظيفة (FM-200 وNovec 1230)، وأنظمة UPS وتوزيع الطاقة.',
  },
  render(ctx) {
    const { t } = ctx;
    return servicePage(ctx, {
      slug: 'service-data-center',
      lead: t('Power, cooling, fire suppression and monitoring designed together and delivered by one contractor — from the raised floor to the UPS, with a handover file for every system.', 'الطاقة والتبريد والإطفاء والمراقبة مصممة معًا ومنفّذة عبر مقاول واحد — من الأرضية المرفوعة إلى أنظمة UPS، مع ملف تسليم لكل نظام.'),
      intro: `<div class="stack-4"><p class="eyebrow">${t('The whole lifecycle', 'دورة الحياة كاملة')}</p><h2>${t('The heart of your IT operations', 'قلب عمليات تقنية المعلومات لديك')}</h2></div><p class="lead">${t('A data center is only as reliable as its weakest system. We handle every part of the facility so power, cooling, fire protection and monitoring are designed to work together.', 'مركز البيانات موثوق بقدر أضعف أنظمته. نتولى كل جزء من المرفق لتُصمَّم أنظمة الطاقة والتبريد والحماية من الحريق والمراقبة لتعمل معًا.')}</p>`,
      features: [
        feature(ctx, {
          id: 'build', index: '01', title: t('Data center build', 'بناء مركز البيانات'),
          text: t('We manage greenfield projects from the ground up — site selection, architectural design and construction — so the finished facility meets industry best practice and your operational requirements.', 'ندير المشاريع الجديدة من الصفر — اختيار الموقع والتصميم المعماري والإنشاء — ليفي المرفق المكتمل بأفضل ممارسات القطاع ومتطلباتك التشغيلية.'),
          checks: [t('Raised floors, cabling and containment', 'الأرضيات المرفوعة والكابلات وأنظمة العزل'), t('Rack layout and capacity planning', 'تخطيط الخزائن والسعة'), t('Handover documentation', 'توثيق كامل عند التسليم')],
          media: mediaImg(ctx, 'dc-build', t('Engineers in high-visibility vests working inside a data center aisle', 'مهندسون بسترات عاكسة يعملون داخل ممر في مركز بيانات'), 'media--square'),
        }),
        feature(ctx, {
          id: 'ems', index: '02', title: t('Environmental monitoring system (EMS)', 'نظام المراقبة البيئية (EMS)'),
          text: t('Sensors for temperature, humidity, airflow, water leaks and power usage, with real-time alerts that stop environmental problems before they cause downtime.', 'حساسات لدرجة الحرارة والرطوبة وتدفق الهواء وتسرب المياه واستهلاك الطاقة، مع تنبيهات فورية توقف المشكلات البيئية قبل أن تسبب التوقف.'),
          media: mediaImg(ctx, 'dc-ems', t('Environmental monitoring display mounted on a server rack showing temperature and humidity', 'شاشة مراقبة بيئية مثبتة على خزانة خوادم تعرض الحرارة والرطوبة'), 'media--square'),
        }),
        feature(ctx, {
          id: 'cooling', index: '03', title: t('Precision cooling', 'التبريد الدقيق'),
          text: t('High-density computing needs specialized cooling. We design and install CRAC and CRAH units that hold temperature and humidity precisely, for performance and a longer life for your servers.', 'الحوسبة عالية الكثافة تحتاج إلى تبريد متخصص. نصمم ونركّب وحدات CRAC وCRAH التي تحافظ على الحرارة والرطوبة بدقة، لأداء أفضل وعمر أطول لخوادمك.'),
          media: mediaImg(ctx, 'dc-cooling', t('Row of precision cooling units in a data hall', 'صف من وحدات التبريد الدقيق في قاعة بيانات'), 'media--square'),
        }),
        feature(ctx, {
          id: 'fire', index: '04', title: t('Fire suppression', 'أنظمة الإطفاء'),
          text: t('Clean-agent systems such as FM-200 and Novec 1230 that put out fires quickly without damaging sensitive electronics, protecting both equipment and business continuity.', 'أنظمة إطفاء بالعوامل النظيفة مثل FM-200 وNovec 1230 تُخمد الحرائق بسرعة دون الإضرار بالأجهزة الإلكترونية الحساسة، لحماية المعدات واستمرارية الأعمال معًا.'),
          media: mediaImg(ctx, 'dc-fire', t('Clean-agent fire suppression discharging in a data center aisle', 'نظام إطفاء بالعوامل النظيفة يعمل في ممر مركز بيانات'), 'media--square'),
        }),
        feature(ctx, {
          id: 'power', index: '05', title: t('UPS & power', 'أنظمة UPS والطاقة'),
          text: t('Uninterruptible power supplies, generators and power distribution units sized and configured to deliver clean, consistent power and ride through outages.', 'مزودات طاقة غير منقطعة ومولدات ووحدات توزيع طاقة بأحجام وإعدادات تضمن طاقة نظيفة ومستقرة وتتجاوز الانقطاعات.'),
          media: mediaImg(ctx, 'dc-ups', t('UPS and generator equipment installed in a data center', 'معدات UPS ومولد مركبة في مركز بيانات'), 'media--square'),
        }),
      ],
      related: ['service-infrastructure-maintenance', 'service-connectivity-solutions', 'service-cctv'],
      cta: t('Discuss your facility', 'ناقش احتياجات منشأتك'),
    });
  },
};

const cctv = {
  slug: 'service-cctv',
  title: { en: 'CCTV surveillance', ar: 'أنظمة المراقبة بالكاميرات' },
  description: {
    en: 'End-to-end CCTV: professional installation of IP cameras and NVRs, secure remote viewing from any device, integration with your security systems and ongoing maintenance.',
    ar: 'أنظمة مراقبة متكاملة: تركيب احترافي لكاميرات IP وأجهزة التسجيل NVR، ومشاهدة آمنة عن بُعد من أي جهاز، وتكامل مع أنظمتك الأمنية، وصيانة مستمرة.',
  },
  render(ctx) {
    const { t } = ctx;
    return servicePage(ctx, {
      slug: 'service-cctv',
      lead: t('IP camera systems planned around what you actually need to see, on their own network, with recordings kept as long as you need them and viewable securely from anywhere.', 'أنظمة كاميرات IP مخططة حول ما تحتاج إلى رؤيته فعلًا، على شبكة خاصة بها، مع حفظ التسجيلات للمدة التي تحتاجها ومشاهدتها بأمان من أي مكان.'),
      features: [
        feature(ctx, {
          index: '01', title: t('Professional installation', 'تركيب احترافي'),
          text: t('Expert installation of IP cameras, NVRs and DVRs, with all the cabling and network components done properly — on a network designed for video.', 'تركيب متقن لكاميرات IP وأجهزة NVR وDVR، مع تنفيذ جميع الكابلات ومكونات الشبكة كما ينبغي — على شبكة مصممة لنقل الفيديو.'),
          checks: [t('Site survey and coverage plan', 'مسح الموقع وخطة التغطية'), t('Camera placement for clear identification', 'مواقع كاميرات تضمن تمييزًا واضحًا'), t('Storage sized for your retention period', 'سعة تخزين تناسب مدة الاحتفاظ المطلوبة')],
          media: mediaImg(ctx, 'cctv-install', t('Technician installing a dome security camera on a ceiling', 'فني يركّب كاميرا مراقبة قبّية في السقف'), 'media--square'),
        }),
        feature(ctx, {
          index: '02', title: t('Remote monitoring & access', 'المراقبة والوصول عن بُعد'),
          text: t('Secure remote access so authorized people can view live and recorded footage from anywhere, on any device — without exposing your cameras to the internet.', 'وصول آمن عن بُعد ليتمكن المخوّلون من مشاهدة البث المباشر والتسجيلات من أي مكان وعلى أي جهاز — دون تعريض كاميراتك للإنترنت.'),
          media: mediaImg(ctx, 'cctv-remote', t('Hands holding a tablet and phone showing live camera footage', 'يدان تحملان جهازًا لوحيًا وهاتفًا يعرضان بثًا مباشرًا من الكاميرات'), 'media--square'),
        }),
        feature(ctx, {
          index: '03', title: t('Integration & maintenance', 'التكامل والصيانة'),
          text: t('Integration with your existing access control and security systems, plus maintenance and support so the system is always recording when it matters.', 'تكامل مع أنظمة التحكم في الدخول والأنظمة الأمنية القائمة لديك، إلى جانب الصيانة والدعم ليبقى النظام يسجّل دائمًا حين يكون الأمر مهمًا.'),
          media: mediaImg(ctx, 'cctv-integration', t('Security systems integrated across monitors, cameras and control devices', 'أنظمة أمنية متكاملة عبر الشاشات والكاميرات وأجهزة التحكم'), 'media--square'),
        }),
      ],
      related: ['service-meeting-rooms', 'service-infrastructure-maintenance', 'service-data-center'],
      cta: t('Plan a CCTV system', 'خطط لنظام مراقبة'),
    });
  },
};

const rooms = {
  slug: 'service-meeting-rooms',
  title: { en: 'Meeting room solutions', ar: 'حلول قاعات الاجتماعات' },
  description: {
    en: 'Meeting rooms that work first time: audio-visual integration, certified video conferencing for Microsoft Teams and Zoom Rooms, one-touch room control and digital booking panels.',
    ar: 'قاعات اجتماعات تعمل من المرة الأولى: تكامل الصوتيات والمرئيات، وأنظمة مؤتمرات فيديو معتمدة لـ Microsoft Teams وZoom Rooms، وتحكم بلمسة واحدة، ولوحات حجز رقمية.',
  },
  render(ctx) {
    const { t, icon } = ctx;
    const items = [
      ['speaker', t('Audio-visual integration', 'تكامل الصوتيات والمرئيات'), t('High-definition displays, 4K projectors, ceiling speakers and wireless presentation that lets anyone share their screen with one click.', 'شاشات عالية الدقة وأجهزة عرض 4K ومكبرات صوت سقفية وعرض لاسلكي يتيح لأي مشارك مشاركة شاشته بنقرة واحدة.')],
      ['camera', t('Video conferencing', 'مؤتمرات الفيديو'), t('Certified hardware for Microsoft Teams and Zoom Rooms: speaker-tracking cameras and microphone arrays that capture every voice clearly.', 'أجهزة معتمدة لـ Microsoft Teams وZoom Rooms: كاميرات تتبع المتحدث ومصفوفات ميكروفونات تلتقط كل صوت بوضوح.')],
      ['tablet', t('Room control & automation', 'التحكم بالقاعة وأتمتتها'), t('One touch panel for lighting, shades, displays, audio and calls — so meetings start on time instead of with a hunt for remotes.', 'لوحة لمس واحدة للإضاءة والستائر والشاشات والصوت والمكالمات — لتبدأ الاجتماعات في موعدها بدل البحث عن أجهزة التحكم.')],
      ['calendar', t('Room scheduling panels', 'لوحات جدولة القاعات'), t('Digital panels outside each room show real-time availability and allow booking on the spot, synced with Microsoft 365 or Google Workspace calendars.', 'لوحات رقمية خارج كل قاعة تعرض التوفر لحظيًا وتتيح الحجز فورًا، متزامنة مع تقويمات Microsoft 365 أو Google Workspace.')],
    ];
    return servicePage(ctx, {
      slug: 'service-meeting-rooms',
      lead: t('We turn meeting rooms into reliable collaboration spaces, with audio-visual and conferencing technology that’s simple for everyone to use.', 'نحوّل قاعات الاجتماعات إلى مساحات تعاون موثوقة، بتقنيات صوت وصورة ومؤتمرات بسيطة الاستخدام للجميع.'),
      features: [
        `<div class="split split--center">
          <div class="stack-5">
            <p class="eyebrow">${t('A complete room', 'قاعة متكاملة')}</p>
            <h2>${t('Every device placed for how people actually meet', 'كل جهاز في مكانه وفق طريقة اجتماع الناس فعلًا')}</h2>
            <p class="lead">${t('We design the room as one system — sightlines, acoustics, cabling and controls — then install it, test it and hand it over with documentation.', 'نصمم القاعة كنظام واحد — خطوط الرؤية والصوتيات والكابلات وأدوات التحكم — ثم نركّب ونختبر ونسلّم مع التوثيق الكامل.')}</p>
          </div>
          <figure class="diagram">${meetingRoom(t)}</figure>
        </div>`,
        `<div class="grid grid--2">${items.map(([ic, h, p]) => `<div class="card"><span class="card__icon">${icon(ic)}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>`,
      ],
      related: ['service-cctv', 'service-network-architecture', 'service-infrastructure-maintenance'],
      cta: t('Upgrade a meeting room', 'طوّر قاعة اجتماعات'),
    });
  },
};

export default [dataCenter, cctv, rooms];
