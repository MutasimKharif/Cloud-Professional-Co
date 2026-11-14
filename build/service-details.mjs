// Per-service details shown on every service page: the "at a glance" box in the
// hero, the "What you get" deliverables list and the FAQ.
// Each string is [English, Arabic]. Edit here, then run `npm run build`.

export const DETAILS = {
  'cloud-mig': {
    glance: [
      [['Starts with', 'نبدأ بـ'], ['A readiness assessment of what you run today', 'تقييم جاهزية لما تشغّله اليوم']],
      [['Typical tools', 'أدوات شائعة'], ['AWS Application Migration Service, AWS DMS, AWS Control Tower', 'AWS Application Migration Service وAWS DMS وAWS Control Tower']],
      [['You get', 'تحصل على'], ['A plan per application and an AWS landing zone', 'خطة لكل تطبيق وبيئة AWS أساسية جاهزة (Landing Zone)']],
    ],
    deliver: [
      [['Application inventory', 'جرد التطبيقات'], ['Every workload with its dependencies, owner and how critical it is.', 'كل تطبيق مع اعتمادياته ومالكه ومدى أهميته.']],
      [['A decision per application', 'قرار لكل تطبيق'], ['Rehost, replatform, refactor, keep or retire — with the reason written down.', 'نقل كما هو، أو تعديل المنصة، أو إعادة البناء، أو الإبقاء، أو الإيقاف — مع توثيق السبب.']],
      [['Cost estimate', 'تقدير التكلفة'], ['Expected monthly AWS cost next to what you spend today.', 'التكلفة الشهرية المتوقعة على AWS مقارنةً بما تنفقه اليوم.']],
      [['Landing zone', 'البيئة الأساسية (Landing Zone)'], ['Accounts, identity, logging, networking and guardrails in place before the first workload moves.', 'الحسابات والهويات والسجلات والشبكة والضوابط جاهزة قبل نقل أول تطبيق.']],
      [['Cut-over runbooks', 'أدلة التحويل'], ['Step-by-step plans for each move, with rollback steps and agreed windows.', 'خطوات مفصّلة لكل عملية نقل، مع خطوات التراجع والنوافذ الزمنية المتفق عليها.']],
      [['Handover', 'التسليم'], ['Updated diagrams and runbooks, and a walkthrough with your team after each wave.', 'مخططات وأدلة تشغيل محدّثة، وجلسة شرح مع فريقك بعد كل مرحلة.']],
    ],
    faqs: [
      [['Do we have to move everything to AWS?', 'هل علينا نقل كل شيء إلى AWS؟'],
        ['No. Many organizations keep some systems on-premises — for latency, licensing or regulation — and connect them to AWS. The assessment shows which applications are worth moving and which aren’t.', 'لا. كثير من المؤسسات تُبقي بعض الأنظمة في مقرها — بسبب زمن الاستجابة أو التراخيص أو الأنظمة — وتربطها بـ AWS. ويوضح التقييم أي التطبيقات يستحق النقل وأيها لا يستحق.']],
      [['Can our data stay in Saudi Arabia?', 'هل يمكن أن تبقى بياناتنا داخل المملكة؟'],
        ['Yes, if you need it to. Data can stay on-premises or in a Saudi data center, and AWS has announced its first Region in the Kingdom for launch by December 2026. We check which AWS services are available in-Kingdom before designing around them.', 'نعم، إن كان ذلك مطلوبًا. يمكن أن تبقى البيانات في مقرك أو في مركز بيانات داخل المملكة، وقد أعلنت AWS عن إطلاق أول منطقة (Region) لها في المملكة بحلول ديسمبر 2026. ونتحقق من الخدمات المتاحة داخل المملكة قبل أن نبني التصميم عليها.']],
      [['How do you avoid downtime during the move?', 'كيف تتجنبون التوقف أثناء النقل؟'],
        ['Data is replicated ahead of time, so the switch itself is short and happens in a window your business chooses, with a tested way back if anything goes wrong.', 'تُنسخ البيانات مسبقًا، فيكون التحويل نفسه قصيرًا ويتم في نافذة يختارها عملك، مع طريقة مُختبرة للتراجع إن حدث أي خلل.']],
    ],
  },

  'service-devops-automation': {
    glance: [
      [['Works with', 'يعمل مع'], ['GitHub Actions, GitLab CI, AWS CodePipeline, Terraform, AWS CDK', 'GitHub Actions وGitLab CI وAWS CodePipeline وTerraform وAWS CDK']],
      [['Runs on', 'يعمل على'], ['Amazon ECS, Amazon EKS, AWS Lambda', 'Amazon ECS وAmazon EKS وAWS Lambda']],
      [['You get', 'تحصل على'], ['Pipelines and infrastructure code in your own repositories', 'خطوط تسليم وكود بنية تحتية في مستودعاتك أنت']],
    ],
    deliver: [
      [['CI/CD pipelines', 'خطوط CI/CD'], ['Build, test and deploy on every change, with approvals where you need them.', 'بناء واختبار ونشر مع كل تغيير، مع موافقات حيث تحتاجها.']],
      [['Infrastructure as code', 'البنية التحتية ككود'], ['Your AWS environment defined in Terraform or AWS CDK and reviewed like application code.', 'بيئة AWS معرّفة في Terraform أو AWS CDK وتُراجع مثل كود التطبيقات.']],
      [['Matching environments', 'بيئات متطابقة'], ['Development, staging and production built the same way, so releases behave the same.', 'بيئات التطوير والاختبار والإنتاج مبنية بالطريقة نفسها، فيتصرف الإصدار بالطريقة نفسها.']],
      [['Container platform', 'منصة الحاويات'], ['ECS or EKS with autoscaling, logging and secrets management — when containers fit.', 'ECS أو EKS مع التوسع التلقائي والسجلات وإدارة الأسرار — حين تكون الحاويات مناسبة.']],
      [['Monitoring and alerts', 'المراقبة والتنبيهات'], ['Dashboards and alerts for errors, latency, saturation and cost.', 'لوحات وتنبيهات للأخطاء وزمن الاستجابة والضغط والتكلفة.']],
      [['Handover', 'التسليم'], ['Documentation and pairing sessions so your developers can change the pipelines themselves.', 'توثيق وجلسات عمل مشتركة ليتمكن مطوروك من تعديل خطوط التسليم بأنفسهم.']],
    ],
    faqs: [
      [['We already use GitHub or GitLab. Do we have to switch?', 'نستخدم GitHub أو GitLab حاليًا. هل علينا التغيير؟'],
        ['No. We build on the tools you already use where they do the job, and only suggest a change when something is holding you back.', 'لا. نبني على الأدوات التي تستخدمها ما دامت تؤدي الغرض، ولا نقترح التغيير إلا حين يكون هناك ما يعيقك.']],
      [['Should we use Kubernetes?', 'هل نستخدم Kubernetes؟'],
        ['Only when it earns its complexity. For many teams Amazon ECS or AWS Lambda is simpler to run; we recommend EKS when you need what it adds, such as portability or many services sharing one platform.', 'فقط حين يستحق تعقيده. لكثير من الفرق يكون Amazon ECS أو AWS Lambda أبسط تشغيلًا؛ ونوصي بـ EKS حين تحتاج ما يضيفه، مثل قابلية النقل أو تشغيل خدمات كثيرة على منصة واحدة.']],
      [['Who maintains the pipelines afterwards?', 'من يتولى صيانة خطوط التسليم لاحقًا؟'],
        ['Your team, with us available if you want ongoing help. Everything lives in your repositories and AWS accounts, not ours.', 'فريقك، ونحن متاحون إن أردت دعمًا مستمرًا. كل شيء موجود في مستودعاتك وحسابات AWS الخاصة بك، لا لدينا.']],
    ],
  },

  'service-security-compliance': {
    glance: [
      [['Frameworks', 'الأطر'], ['NCA ECC-2:2024, NCA CCC-2:2024, SAMA CSF, PDPL, ISO 27001', 'NCA ECC-2:2024 وNCA CCC-2:2024 وإطار ساما للأمن السيبراني ونظام حماية البيانات الشخصية وISO 27001']],
      [['AWS services', 'خدمات AWS'], ['IAM Identity Center, GuardDuty, Security Hub, AWS WAF, AWS Config', 'IAM Identity Center وGuardDuty وSecurity Hub وAWS WAF وAWS Config']],
      [['You get', 'تحصل على'], ['A prioritized roadmap and evidence you can show auditors', 'خارطة طريق مرتبة حسب الأولوية وأدلة تقدّمها للمدققين']],
    ],
    deliver: [
      [['Posture assessment', 'تقييم الوضع الأمني'], ['Findings ranked by risk, each with the fix and who should own it.', 'ملاحظات مرتبة حسب الخطورة، لكل منها طريقة المعالجة والمسؤول عنها.']],
      [['Control mapping', 'مطابقة الضوابط'], ['Your controls mapped to NCA ECC and CCC — and SAMA CSF or PDPL where they apply — showing what’s in place and what’s missing.', 'ضوابطك مطابَقة مع ضوابط NCA الأساسية والسحابية — وإطار ساما أو نظام حماية البيانات الشخصية حيث ينطبقان — مع بيان ما هو مطبّق وما ينقص.']],
      [['Identity and access', 'الهويات والصلاحيات'], ['Single sign-on, least-privilege roles and no long-lived access keys for people.', 'دخول موحّد وأدوار بأقل الصلاحيات، ودون مفاتيح وصول دائمة للأشخاص.']],
      [['Detection and response', 'الرصد والاستجابة'], ['GuardDuty, Security Hub and alerting tuned to your environment, with a response playbook.', 'GuardDuty وSecurity Hub وتنبيهات مضبوطة على بيئتك، مع دليل للاستجابة.']],
      [['Encryption and logging', 'التشفير والسجلات'], ['Encryption at rest and in transit, and protected logs kept for as long as your regulator requires.', 'تشفير أثناء التخزين والنقل، وسجلات محمية تُحفظ للمدة التي تشترطها الجهة المنظمة.']],
      [['Audit evidence', 'أدلة التدقيق'], ['Evidence and reports collected automatically, ready for internal or external audit.', 'أدلة وتقارير تُجمع آليًا، جاهزة للتدقيق الداخلي أو الخارجي.']],
    ],
    faqs: [
      [['Which framework applies to us?', 'أي إطار ينطبق علينا؟'],
        ['It depends on your sector and who regulates you. Most organizations in the Kingdom start from the NCA’s Essential Cybersecurity Controls; the Cloud Cybersecurity Controls add requirements when you use cloud services; banks, insurers and payment companies also follow SAMA’s Cyber Security Framework; and personal data falls under the PDPL. We confirm the scope with you first.', 'يعتمد ذلك على قطاعك والجهة التي تنظّمك. تبدأ معظم الجهات في المملكة من الضوابط الأساسية للأمن السيبراني الصادرة عن الهيئة الوطنية للأمن السيبراني، وتضيف ضوابط الأمن السيبراني للحوسبة السحابية متطلبات عند استخدام الخدمات السحابية، وتلتزم البنوك وشركات التأمين والمدفوعات كذلك بإطار ساما للأمن السيبراني، وتخضع البيانات الشخصية لنظام حماية البيانات الشخصية. نحدد النطاق معك أولًا.']],
      [['Can you certify us?', 'هل تمنحوننا شهادة امتثال؟'],
        ['No. Certification and regulatory assessments come from accredited bodies and regulators. We get your environment and evidence ready for them, and help you close what they find.', 'لا. الشهادات والتقييمات التنظيمية تصدر عن جهات معتمدة وعن الجهات المنظمة. نحن نجهّز بيئتك وأدلتك لها، ونساعدك على معالجة ما تجده من ملاحظات.']],
      [['Isn’t AWS already compliant?', 'أليست AWS ممتثلة أصلًا؟'],
        ['AWS secures the cloud itself. Securing what you put in it — accounts, identities, data and network rules — is your responsibility. That’s the shared responsibility model, and it’s the part we help with.', 'تؤمّن AWS السحابة نفسها، أما تأمين ما تضعه فيها — الحسابات والهويات والبيانات وقواعد الشبكة — فمسؤوليتك. هذا هو نموذج المسؤولية المشتركة، وهو الجزء الذي نساعدك فيه.']],
    ],
  },

  'service-network-architecture': {
    glance: [
      [['Covers', 'يشمل'], ['VPC design, IP addressing, DNS, hybrid routing, edge delivery', 'تصميم VPC وعناوين IP وDNS والتوجيه الهجين وتوزيع المحتوى']],
      [['AWS services', 'خدمات AWS'], ['Amazon VPC, Transit Gateway, Route 53, CloudFront, Direct Connect', 'Amazon VPC وTransit Gateway وRoute 53 وCloudFront وDirect Connect']],
      [['You get', 'تحصل على'], ['A documented network design your team can operate', 'تصميم شبكة موثّق يستطيع فريقك تشغيله']],
    ],
    deliver: [
      [['Network design document', 'وثيقة تصميم الشبكة'], ['Topology, traffic flows and the reason behind each choice.', 'المخطط ومسارات الحركة وسبب كل قرار.']],
      [['IP addressing plan', 'خطة عناوين IP'], ['Non-overlapping ranges across offices, data centers and AWS accounts, with room to grow.', 'نطاقات غير متداخلة بين المكاتب ومراكز البيانات وحسابات AWS، مع مساحة للنمو.']],
      [['Routing and segmentation', 'التوجيه والتقسيم'], ['Route tables, security groups and network ACLs that keep environments apart.', 'جداول توجيه ومجموعات أمان وقوائم تحكم تفصل البيئات عن بعضها.']],
      [['DNS design', 'تصميم DNS'], ['Route 53 zones and resolver rules so names resolve the same way on-premises and in AWS.', 'مناطق Route 53 وقواعد Resolver لتُحل الأسماء بالطريقة نفسها في مقرك وفي AWS.']],
      [['Network as code', 'الشبكة ككود'], ['The network built from code, so every change is reviewed and repeatable.', 'الشبكة مبنية من كود، فتُراجع كل التغييرات ويمكن تكرارها.']],
      [['Diagrams and runbooks', 'المخططات وأدلة التشغيل'], ['Current diagrams and steps for common changes and failures.', 'مخططات محدّثة وخطوات للتغييرات والأعطال الشائعة.']],
    ],
    faqs: [
      [['Our offices and AWS use overlapping IP ranges. Can that be fixed?', 'نطاقات IP متداخلة بين مكاتبنا وAWS. هل يمكن إصلاح ذلك؟'],
        ['Yes. We plan a clean addressing scheme, and where renumbering isn’t practical straight away we bridge the gap with NAT or routing changes until it is.', 'نعم. نخطط لنظام عناوين نظيف، وحين لا يكون إعادة الترقيم ممكنًا فورًا نسدّ الفجوة مؤقتًا عبر NAT أو تعديلات التوجيه.']],
      [['Do we need Transit Gateway?', 'هل نحتاج إلى Transit Gateway؟'],
        ['Not always. For two or three VPCs, peering can be simpler and cheaper. Transit Gateway pays off as the number of VPCs, accounts and sites grows.', 'ليس دائمًا. لشبكتين أو ثلاث شبكات VPC قد يكون الربط المباشر أبسط وأقل تكلفة. وتظهر فائدة Transit Gateway كلما زاد عدد الشبكات والحسابات والمواقع.']],
      [['Can you work with our existing firewalls and routers?', 'هل تعملون مع جدران الحماية والموجّهات الحالية لدينا؟'],
        ['Usually, yes. We design around the equipment you already have and tell you plainly if something needs replacing.', 'غالبًا نعم. نصمم حول الأجهزة الموجودة لديك، ونخبرك بوضوح إن كان شيء منها يحتاج إلى استبدال.']],
    ],
  },

  'service-connectivity-solutions': {
    glance: [
      [['Options', 'الخيارات'], ['Site-to-Site VPN, AWS Direct Connect, VPC peering', 'VPN بين المواقع وAWS Direct Connect وربط VPC']],
      [['Common pattern', 'نمط شائع'], ['Direct Connect for production, VPN as the backup path', 'Direct Connect للإنتاج وVPN كمسار احتياطي']],
      [['You get', 'تحصل على'], ['A written recommendation with expected monthly costs', 'توصية مكتوبة مع التكاليف الشهرية المتوقعة']],
    ],
    deliver: [
      [['Traffic analysis', 'تحليل الحركة'], ['How much data moves where, and the latency each application needs.', 'حجم البيانات التي تنتقل وإلى أين، وزمن الاستجابة الذي يحتاجه كل تطبيق.']],
      [['Option comparison', 'مقارنة الخيارات'], ['VPN, Direct Connect and peering compared on cost, bandwidth and resilience.', 'مقارنة VPN وDirect Connect والربط المباشر من حيث التكلفة والنطاق الترددي والاعتمادية.']],
      [['Resilient design', 'تصميم عالي الاعتمادية'], ['Redundant tunnels or circuits, so one failure doesn’t cut you off.', 'أنفاق أو دوائر مكررة، حتى لا يقطعك عطل واحد.']],
      [['Configuration', 'التهيئة'], ['The AWS side and your on-premises device configured and documented.', 'تهيئة جهة AWS والجهاز في مقرك وتوثيقهما.']],
      [['Link monitoring', 'مراقبة الروابط'], ['Alerts on tunnel and circuit health, so an outage is noticed before users report it.', 'تنبيهات على حالة الأنفاق والدوائر، ليُكتشف الانقطاع قبل أن يبلّغ عنه المستخدمون.']],
      [['Failover test', 'اختبار التحويل'], ['Proof that traffic moves to the backup path when the primary fails.', 'إثبات أن الحركة تنتقل إلى المسار الاحتياطي عند تعطل المسار الأساسي.']],
    ],
    faqs: [
      [['How long does Direct Connect take to set up?', 'كم يستغرق إعداد Direct Connect؟'],
        ['Longer than a VPN, because a physical circuit has to be ordered through a Direct Connect location or partner. A VPN can be set up much faster, so it’s often used while the circuit is delivered.', 'أطول من VPN، لأن الدائرة المادية تُطلب عبر موقع Direct Connect أو أحد الشركاء. ويمكن إعداد VPN بسرعة أكبر بكثير، لذا يُستخدم غالبًا ريثما تُسلَّم الدائرة.']],
      [['Is a VPN secure enough?', 'هل VPN آمنة بما يكفي؟'],
        ['Site-to-Site VPN encrypts traffic with IPsec and suits many workloads. Direct Connect is private but not encrypted by default; where encryption is required we add it, for example with MACsec on supported connections or a VPN over the circuit.', 'تشفّر VPN بين المواقع الحركة عبر IPsec وتناسب كثيرًا من الأحمال. أما Direct Connect فاتصال خاص لكنه غير مشفّر افتراضيًا؛ وحين يكون التشفير مطلوبًا نضيفه، مثلًا عبر MACsec على الاتصالات التي تدعمه أو عبر VPN فوق الدائرة.']],
      [['What happens if the link goes down?', 'ماذا يحدث إذا انقطع الرابط؟'],
        ['With a redundant design, traffic moves to the second tunnel, circuit or VPN automatically. We test that failover before handover.', 'في التصميم المكرر تنتقل الحركة تلقائيًا إلى النفق أو الدائرة أو الـ VPN الثانية. ونختبر هذا التحويل قبل التسليم.']],
    ],
  },

  'service-infrastructure-maintenance': {
    glance: [
      [['Covers', 'يشمل'], ['Servers, network devices, storage and backups', 'الخوادم وأجهزة الشبكة والتخزين والنسخ الاحتياطي']],
      [['Model', 'النموذج'], ['Ongoing support with regular health reports', 'دعم مستمر مع تقارير دورية عن الحالة']],
      [['You get', 'تحصل على'], ['Fewer surprises and a planned hardware budget', 'مفاجآت أقل وميزانية أجهزة مخططة']],
    ],
    deliver: [
      [['Monitoring', 'المراقبة'], ['Health, capacity and availability checks, with alerts routed to an engineer.', 'فحوص للحالة والسعة والتوفر، مع تنبيهات تصل إلى مهندس.']],
      [['Patch schedule', 'جدول التحديثات'], ['Tested updates applied in agreed windows, with a record of what changed.', 'تحديثات مُختبرة تُطبّق في نوافذ متفق عليها، مع سجل لما تغيّر.']],
      [['Asset register', 'سجل الأصول'], ['Hardware inventory with warranty and end-of-support dates.', 'جرد للأجهزة مع تواريخ الضمان وانتهاء الدعم.']],
      [['Restore tests', 'اختبارات الاستعادة'], ['Backups checked regularly by actually restoring them.', 'تُفحص النسخ الاحتياطية دوريًا باستعادتها فعليًا.']],
      [['Health reports', 'تقارير الحالة'], ['Regular reports on incidents, risks and recommended changes.', 'تقارير دورية عن الأعطال والمخاطر والتغييرات المقترحة.']],
      [['Support channel', 'قناة الدعم'], ['A clear way to raise incidents and requests, handled by engineers who know your environment.', 'طريقة واضحة لرفع الأعطال والطلبات، يتولاها مهندسون يعرفون بيئتك.']],
    ],
    faqs: [
      [['Do you support equipment you didn’t install?', 'هل تدعمون أجهزة لم تقوموا بتركيبها؟'],
        ['Yes. We start by reviewing and documenting what’s there, and flag anything that’s out of support or at risk.', 'نعم. نبدأ بمراجعة الموجود وتوثيقه، وننبّه إلى كل ما انتهى دعمه أو يمثّل خطرًا.']],
      [['Is support on-site or remote?', 'هل الدعم في الموقع أم عن بُعد؟'],
        ['Both. Monitoring and most patching are done remotely; hardware work is done on-site.', 'الاثنان. المراقبة ومعظم التحديثات تتم عن بُعد، وأعمال الأجهزة تتم في الموقع.']],
      [['Can you look after systems in AWS too?', 'هل تتولون أيضًا الأنظمة على AWS؟'],
        ['Yes. The same team looks after on-premises and AWS, so problems that cross both are handled once.', 'نعم. الفريق نفسه يتولى الأنظمة في مقرك وعلى AWS، فتُعالج المشكلات التي تمتد بينهما مرة واحدة.']],
    ],
  },

  'service-data-center': {
    glance: [
      [['Covers', 'يشمل'], ['Build, monitoring, cooling, fire suppression, UPS and power', 'البناء والمراقبة والتبريد والإطفاء وأنظمة UPS والطاقة']],
      [['Systems', 'الأنظمة'], ['CRAC/CRAH, clean-agent suppression, UPS, PDUs, EMS', 'CRAC/CRAH والإطفاء بالعوامل النظيفة وUPS ووحدات PDU ونظام EMS']],
      [['You get', 'تحصل على'], ['One contractor accountable for the whole room', 'مقاول واحد مسؤول عن الغرفة بالكامل']],
    ],
    deliver: [
      [['Design package', 'حزمة التصميم'], ['Layout, power and cooling calculations, and the equipment list.', 'المخطط وحسابات الطاقة والتبريد وقائمة المعدات.']],
      [['Capacity plan', 'خطة السعة'], ['Rack, power and cooling headroom for the growth you expect.', 'هامش في الخزائن والطاقة والتبريد للنمو الذي تتوقعه.']],
      [['Installation and commissioning', 'التركيب والتشغيل التجريبي'], ['Systems installed, tested together and signed off.', 'تركيب الأنظمة واختبارها معًا واعتمادها.']],
      [['Environmental monitoring', 'المراقبة البيئية'], ['Temperature, humidity, leak and power sensors with real-time alerts.', 'حساسات للحرارة والرطوبة والتسرب والطاقة مع تنبيهات فورية.']],
      [['Handover file', 'ملف التسليم'], ['As-built drawings, test results, manuals and a maintenance schedule.', 'مخططات التنفيذ الفعلي ونتائج الاختبارات والأدلة وجدول الصيانة.']],
      [['Preventive maintenance', 'الصيانة الوقائية'], ['Planned maintenance for cooling, UPS and fire systems.', 'صيانة مجدولة لأنظمة التبريد وUPS والإطفاء.']],
    ],
    faqs: [
      [['Can you work in a live data center?', 'هل تعملون في مركز بيانات قيد التشغيل؟'],
        ['Yes. Work in a live room is planned around your operations, with method statements and rollback steps agreed before anything is touched.', 'نعم. يُخطط العمل في الغرفة العاملة بما يناسب تشغيلك، مع الاتفاق على خطوات التنفيذ والتراجع قبل لمس أي شيء.']],
      [['Can you design to a Tier standard?', 'هل تصممون وفق معيار Tier؟'],
        ['We design to the redundancy you need — for example N+1 cooling and power — and can align the design with Uptime Institute Tier or TIA-942 criteria. Formal certification is done by those bodies.', 'نصمم وفق مستوى التكرار الذي تحتاجه — مثل N+1 في التبريد والطاقة — ويمكن مواءمة التصميم مع معايير Tier من Uptime Institute أو TIA-942. أما الشهادة الرسمية فتمنحها تلك الجهات.']],
      [['Which fire suppression agent should we use?', 'أي عامل إطفاء نستخدم؟'],
        ['Clean agents such as FM-200 and FK-5-1-12 (sold as Novec 1230) protect equipment without water. The right choice depends on the room, local regulations and supply — we compare them for your site.', 'العوامل النظيفة مثل FM-200 وFK-5-1-12 (المعروف تجاريًا باسم Novec 1230) تحمي المعدات دون ماء. ويعتمد الاختيار على الغرفة والأنظمة المحلية وتوفر العامل — ونقارن بينها لموقعك.']],
    ],
  },

  'service-cctv': {
    glance: [
      [['Covers', 'يشمل'], ['Design, installation, remote viewing and maintenance', 'التصميم والتركيب والمشاهدة عن بُعد والصيانة']],
      [['Systems', 'الأنظمة'], ['IP cameras, NVR / VMS, PoE networks', 'كاميرات IP وأنظمة NVR / VMS وشبكات PoE']],
      [['You get', 'تحصل على'], ['A coverage plan and a system your team can operate', 'خطة تغطية ونظام يستطيع فريقك تشغيله']],
    ],
    deliver: [
      [['Site survey and coverage plan', 'المسح وخطة التغطية'], ['Camera positions and fields of view mapped against what you need to see.', 'مواقع الكاميرات وزوايا الرؤية مطابقة لما تحتاج إلى رؤيته.']],
      [['Camera network', 'شبكة الكاميرات'], ['PoE switching on a separate network, so video doesn’t slow the rest of your IT.', 'محوّلات PoE على شبكة منفصلة، حتى لا يبطئ الفيديو بقية أنظمتك.']],
      [['Installation', 'التركيب'], ['Cameras, cabling and recorders installed neatly and labeled.', 'تركيب الكاميرات والكابلات وأجهزة التسجيل بشكل مرتب ومُعلَّم.']],
      [['Recording and retention', 'التسجيل ومدة الحفظ'], ['Storage sized for the retention period you need.', 'سعة تخزين محسوبة لمدة الحفظ التي تحتاجها.']],
      [['Remote viewing', 'المشاهدة عن بُعد'], ['Secure access from the control room and authorized devices.', 'وصول آمن من غرفة التحكم والأجهزة المصرّح لها.']],
      [['Maintenance', 'الصيانة'], ['Health checks, firmware updates and repairs.', 'فحوص دورية وتحديثات للبرامج الثابتة وإصلاحات.']],
    ],
    faqs: [
      [['How long is footage kept?', 'كم مدة حفظ التسجيلات؟'],
        ['As long as you need. Retention drives storage size, so we agree it up front. Where a regulation sets a minimum retention period for your site, we design to it.', 'المدة التي تحتاجها. مدة الحفظ تحدد حجم التخزين، لذا نتفق عليها مسبقًا. وحيث يفرض نظامٌ حدًا أدنى لمدة الحفظ في موقعك، نصمم وفقه.']],
      [['Can we view cameras remotely?', 'هل يمكن مشاهدة الكاميرات عن بُعد؟'],
        ['Yes, through a secured app or video management system, with access limited to the people who need it and every login recorded.', 'نعم، عبر تطبيق مؤمّن أو نظام لإدارة الفيديو، مع قصر الوصول على من يحتاجه وتسجيل كل عملية دخول.']],
      [['Can you reuse our existing cameras?', 'هل يمكن الاستفادة من كاميراتنا الحالية؟'],
        ['Often. Many IP cameras work with modern recorders through the ONVIF standard; we test them before recommending any replacement.', 'غالبًا. تعمل كثير من كاميرات IP مع أجهزة التسجيل الحديثة عبر معيار ONVIF، ونختبرها قبل أن نوصي بأي استبدال.']],
    ],
  },

  'service-meeting-rooms': {
    glance: [
      [['Covers', 'يشمل'], ['Audio, video, conferencing, room control and booking panels', 'الصوت والصورة والمؤتمرات والتحكم بالقاعة ولوحات الحجز']],
      [['Platforms', 'المنصات'], ['Microsoft Teams Rooms, Zoom Rooms', 'Microsoft Teams Rooms وZoom Rooms']],
      [['You get', 'تحصل على'], ['Rooms set up and tested on your meeting platform', 'قاعات مهيأة ومختبرة على منصة اجتماعاتك']],
    ],
    deliver: [
      [['Room assessment', 'تقييم القاعة'], ['Size, acoustics, seating and how the room is actually used.', 'المساحة والصوتيات والمقاعد وطريقة استخدام القاعة فعليًا.']],
      [['Equipment design', 'تصميم المعدات'], ['Displays, cameras, microphones and speakers sized to the room.', 'شاشات وكاميرات وميكروفونات وسماعات بحجم يناسب القاعة.']],
      [['Platform set-up', 'تهيئة المنصة'], ['Teams Rooms or Zoom Rooms configured and joined to your accounts.', 'تهيئة Teams Rooms أو Zoom Rooms وربطها بحساباتك.']],
      [['Booking panels', 'لوحات الحجز'], ['Room status at the door, linked to your calendars.', 'حالة القاعة عند الباب، مرتبطة بتقويماتك.']],
      [['Testing and a staff guide', 'الاختبار ودليل الموظفين'], ['Every room tested end to end, plus a one-page guide for staff.', 'اختبار كل قاعة من البداية إلى النهاية، مع دليل من صفحة واحدة للموظفين.']],
      [['Support', 'الدعم'], ['Monitoring and fixes, so rooms keep working.', 'مراقبة وإصلاحات، لتبقى القاعات جاهزة للعمل.']],
    ],
    faqs: [
      [['Teams Rooms or Zoom Rooms?', 'Teams Rooms أم Zoom Rooms؟'],
        ['Whichever your organization already uses. Rooms can also be set up to join meetings on the other platform when you need to.', 'المنصة التي تستخدمها مؤسستك حاليًا. ويمكن أيضًا تهيئة القاعات للانضمام إلى اجتماعات المنصة الأخرى عند الحاجة.']],
      [['Can you fix echo and poor audio in existing rooms?', 'هل يمكن معالجة الصدى وضعف الصوت في القاعات الحالية؟'],
        ['Usually. Echo and poor pickup often come from room acoustics or microphone placement rather than the equipment itself, so we measure first and fix the cause.', 'غالبًا نعم. كثيرًا ما يكون الصدى وضعف الالتقاط بسبب صوتيات القاعة أو مواضع الميكروفونات لا بسبب المعدات نفسها، لذا نقيس أولًا ثم نعالج السبب.']],
      [['Do you handle many rooms across sites?', 'هل تتولون قاعات كثيرة في مواقع متعددة؟'],
        ['Yes, with a standard design for each room size, so every room works the same way and is easier to support.', 'نعم، بتصميم موحّد لكل حجم من القاعات، لتعمل كل القاعات بالطريقة نفسها ويسهل دعمها.']],
    ],
  },
};
