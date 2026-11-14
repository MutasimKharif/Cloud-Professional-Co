// Insights articles. ARTICLES feeds the list on blog.html; each article also builds its own page.
import { SITE, pageHero, ctaBand, serviceCard } from '../lib.mjs';

const DATE = '2026-11-14';
const DATE_LABEL = { en: '14 November 2026', ar: '14 نوفمبر 2026' };

export const ARTICLES = [
  {
    slug: 'insights-s3-security',
    category: { en: 'Cloud security', ar: 'أمن السحابة' },
    title: { en: 'Securing your S3 buckets: a practical guide', ar: 'تأمين حاويات S3: دليل عملي' },
    summary: {
      en: 'Most S3 data exposures come from configuration, not from S3 itself. Seven settings and checks that keep your buckets private — and prove it.',
      ar: 'معظم حالات تسرب البيانات من S3 سببها الإعدادات لا الخدمة نفسها. سبعة إعدادات وفحوص تبقي حاوياتك خاصة — وتثبت ذلك.',
    },
    readTime: { en: '7 min read', ar: 'قراءة 7 دقائق' },
    related: ['service-security-compliance', 'cloud-mig'],
    takeaways: {
      en: ['Block public access for the whole account, not bucket by bucket.', 'Disable ACLs and control access with policies only.', 'Deny any request that doesn’t use TLS.', 'Use KMS keys when you need to control and audit who can decrypt.', 'Turn on versioning, and Object Lock for data you must not lose.', 'Log object access and let GuardDuty, Macie and Config watch for you.'],
      ar: ['احجب الوصول العام على مستوى الحساب كله لا لكل حاوية على حدة.', 'عطّل قوائم ACL وتحكّم في الوصول بالسياسات فقط.', 'ارفض أي طلب لا يستخدم TLS.', 'استخدم مفاتيح KMS حين تحتاج إلى التحكم فيمن يفك التشفير وتدقيقه.', 'فعّل تعدد الإصدارات، وObject Lock للبيانات التي لا يجوز فقدانها.', 'سجّل الوصول إلى الكائنات ودع GuardDuty وMacie وConfig تراقب نيابة عنك.'],
    },
    body: {
      en: `
<p>Amazon S3 is one of the most reliable services AWS runs, yet “exposed S3 bucket” keeps appearing in breach reports. The reason is almost always configuration: a bucket made public for a quick test, an old access control list nobody remembers, or a policy that grants far more than it needs to.</p>
<p>Since 2023, new buckets are safer by default — Block Public Access is on, access control lists (ACLs) are disabled, and new objects are encrypted with S3-managed keys. But buckets created before then keep their old settings, and every default can be switched off. Here is what we check on every AWS account we work on.</p>

<h2>1. Block public access for the whole account</h2>
<p>Block Public Access can be set per bucket, but the account-level setting overrides all of them and stops anyone from making a bucket public by mistake. Turn on all four options:</p>
<pre><code>aws s3control put-public-access-block \\
  --account-id 111122223333 \\
  --public-access-block-configuration \\
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true</code></pre>
<p>If you use AWS Organizations, apply it to every account and add a service control policy that prevents it being turned off. Need to serve a public website from S3? Put Amazon CloudFront in front with <strong>Origin Access Control</strong>, so the bucket stays private and only CloudFront can read it.</p>

<h2>2. Turn off ACLs</h2>
<p>ACLs are an older permission system that sits alongside bucket policies and is easy to overlook. Set Object Ownership to <strong>Bucket owner enforced</strong>: ACLs stop having any effect, and access is decided only by policies you can read and review in one place.</p>

<h2>3. Grant the least access that works</h2>
<ul>
  <li>Give each application its own IAM role with access to the specific bucket and prefix it needs — not <code>s3:*</code> on <code>*</code>.</li>
  <li>Avoid <code>"Principal": "*"</code> in bucket policies unless it is tightly restricted by conditions, such as a specific VPC endpoint with <code>aws:SourceVpce</code>.</li>
  <li>To share a file temporarily, use a presigned URL that expires, rather than opening the bucket.</li>
  <li>Run <strong>IAM Access Analyzer</strong>: it lists every bucket that is shared publicly or with another AWS account, so you can confirm each one is intended.</li>
</ul>

<h2>4. Require encryption in transit</h2>
<p>Add a statement to every bucket policy that denies requests not made over TLS:</p>
<pre><code>{
  "Sid": "DenyInsecureTransport",
  "Effect": "Deny",
  "Principal": "*",
  "Action": "s3:*",
  "Resource": [
    "arn:aws:s3:::example-bucket",
    "arn:aws:s3:::example-bucket/*"
  ],
  "Condition": { "Bool": { "aws:SecureTransport": "false" } }
}</code></pre>

<h2>5. Choose the right encryption at rest</h2>
<p>S3-managed encryption (SSE-S3) is on by default and is fine for much data. Use <strong>SSE-KMS with a customer managed key</strong> when you need to decide who can decrypt the data, separately from who can read the bucket, and to see every use of the key in AWS CloudTrail. Enable <strong>S3 Bucket Keys</strong> with it to cut the number of KMS requests — and their cost.</p>

<h2>6. Protect against deletion and ransomware</h2>
<ul>
  <li>Turn on <strong>versioning</strong>, so overwritten or deleted objects can be recovered, and add lifecycle rules so old versions don’t grow forever.</li>
  <li>For backups, records and anything you must keep, use <strong>Object Lock</strong> in compliance mode: nobody — including administrators — can delete or change the data until the retention period ends.</li>
  <li>Replicate critical data to a bucket in a separate account. If the data must stay in Saudi Arabia, check where the copy lands before you switch replication on.</li>
</ul>

<h2>7. Log and watch</h2>
<p>Settings drift. Someone will eventually change a policy, so make sure you would notice:</p>
<ul>
  <li><strong>CloudTrail data events</strong> for sensitive buckets record who read or changed which object.</li>
  <li><strong>Amazon GuardDuty S3 Protection</strong> flags unusual access, such as reads from known malicious addresses or sudden mass downloads.</li>
  <li><strong>Amazon Macie</strong> finds personal and sensitive data in your buckets — useful when the PDPL requires you to know where personal data lives.</li>
  <li><strong>AWS Config</strong> rules such as <code>s3-bucket-public-read-prohibited</code> and <code>s3-bucket-ssl-requests-only</code> report any bucket that drifts from your baseline.</li>
</ul>

<h2>Where to start</h2>
<p>If you only do two things this week, turn on account-level Block Public Access and run IAM Access Analyzer. Together they close the most common exposure and show you everything that is shared today. The rest can follow as a short project — and is exactly the kind of evidence auditors ask for under the NCA’s cloud controls.</p>`,
      ar: `
<p>تُعد Amazon S3 من أكثر خدمات AWS اعتمادية، ومع ذلك تتكرر عبارة «حاوية S3 مكشوفة» في تقارير تسرب البيانات. والسبب في الغالب هو الإعدادات: حاوية جُعلت عامة لاختبار سريع، أو قائمة تحكم قديمة لا يتذكرها أحد، أو سياسة تمنح أكثر بكثير مما تحتاج إليه.</p>
<p>منذ عام 2023 أصبحت الحاويات الجديدة أكثر أمانًا افتراضيًا — حجب الوصول العام مفعّل، وقوائم التحكم في الوصول (ACL) معطّلة، والكائنات الجديدة مشفّرة بمفاتيح تديرها S3. لكن الحاويات التي أُنشئت قبل ذلك تحتفظ بإعداداتها القديمة، ويمكن إيقاف كل إعداد افتراضي. هذا ما نفحصه في كل حساب AWS نعمل عليه.</p>

<h2>1. احجب الوصول العام على مستوى الحساب كله</h2>
<p>يمكن ضبط حجب الوصول العام لكل حاوية، لكن الإعداد على مستوى الحساب يتقدم عليها جميعًا ويمنع أي شخص من جعل حاوية عامة عن طريق الخطأ. فعّل الخيارات الأربعة كلها:</p>
<pre><code>aws s3control put-public-access-block \\
  --account-id 111122223333 \\
  --public-access-block-configuration \\
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true</code></pre>
<p>إن كنت تستخدم AWS Organizations، فطبّقه على كل الحسابات وأضف سياسة تحكم بالخدمات (SCP) تمنع إيقافه. تحتاج إلى تقديم موقع عام من S3؟ ضع Amazon CloudFront أمامه مع <strong>Origin Access Control</strong>، لتبقى الحاوية خاصة ولا يقرأ منها إلا CloudFront.</p>

<h2>2. عطّل قوائم ACL</h2>
<p>قوائم ACL نظام صلاحيات قديم يعمل بجانب سياسات الحاويات ويسهل إغفاله. اضبط ملكية الكائنات على <strong>Bucket owner enforced</strong>: فتتوقف قوائم ACL عن التأثير، ويُحدَّد الوصول بالسياسات وحدها التي يمكنك قراءتها ومراجعتها في مكان واحد.</p>

<h2>3. امنح أقل وصول يكفي</h2>
<ul>
  <li>امنح كل تطبيق دور IAM خاصًا به يصل إلى الحاوية والمسار المحددين اللذين يحتاجهما — لا <code>s3:*</code> على <code>*</code>.</li>
  <li>تجنّب <code>"Principal": "*"</code> في سياسات الحاويات ما لم يكن مقيدًا بشروط صارمة، مثل نقطة VPC محددة عبر <code>aws:SourceVpce</code>.</li>
  <li>لمشاركة ملف مؤقتًا، استخدم رابطًا موقّعًا مسبقًا تنتهي صلاحيته بدلًا من فتح الحاوية.</li>
  <li>شغّل <strong>IAM Access Analyzer</strong>: فهو يعرض كل حاوية مشاركة علنًا أو مع حساب AWS آخر، لتتأكد أن كل مشاركة مقصودة.</li>
</ul>

<h2>4. اشترط التشفير أثناء النقل</h2>
<p>أضف إلى سياسة كل حاوية عبارة ترفض الطلبات التي لا تتم عبر TLS:</p>
<pre><code>{
  "Sid": "DenyInsecureTransport",
  "Effect": "Deny",
  "Principal": "*",
  "Action": "s3:*",
  "Resource": [
    "arn:aws:s3:::example-bucket",
    "arn:aws:s3:::example-bucket/*"
  ],
  "Condition": { "Bool": { "aws:SecureTransport": "false" } }
}</code></pre>

<h2>5. اختر التشفير المناسب أثناء التخزين</h2>
<p>التشفير الذي تديره S3 ‏(SSE-S3) مفعّل افتراضيًا ويكفي لكثير من البيانات. استخدم <strong>SSE-KMS بمفتاح يديره العميل</strong> حين تحتاج إلى تحديد من يستطيع فك تشفير البيانات بمعزل عمن يستطيع قراءة الحاوية، وإلى رؤية كل استخدام للمفتاح في AWS CloudTrail. وفعّل معه <strong>S3 Bucket Keys</strong> لتقليل عدد طلبات KMS — وتكلفتها.</p>

<h2>6. احمِ البيانات من الحذف وبرامج الفدية</h2>
<ul>
  <li>فعّل <strong>تعدد الإصدارات</strong> لتتمكن من استعادة الكائنات المحذوفة أو المستبدلة، وأضف قواعد دورة حياة حتى لا تتراكم الإصدارات القديمة بلا نهاية.</li>
  <li>للنسخ الاحتياطية والسجلات وكل ما يجب الاحتفاظ به، استخدم <strong>Object Lock</strong> في وضع الامتثال: لا يستطيع أحد — حتى المسؤولون — حذف البيانات أو تعديلها قبل انتهاء مدة الحفظ.</li>
  <li>انسخ البيانات الحرجة إلى حاوية في حساب منفصل. وإن كان يجب أن تبقى البيانات داخل المملكة، فتحقق من مكان النسخة قبل تفعيل النسخ.</li>
</ul>

<h2>7. سجّل وراقب</h2>
<p>الإعدادات تتغير مع الوقت، وسيعدّل أحدهم سياسة ما يومًا، فتأكد أنك ستلاحظ ذلك:</p>
<ul>
  <li><strong>أحداث البيانات في CloudTrail</strong> للحاويات الحساسة تسجّل من قرأ أو عدّل أي كائن.</li>
  <li><strong>Amazon GuardDuty S3 Protection</strong> ينبّه إلى الوصول غير المعتاد، مثل القراءة من عناوين ضارة معروفة أو التنزيل الجماعي المفاجئ.</li>
  <li><strong>Amazon Macie</strong> يكتشف البيانات الشخصية والحساسة في حاوياتك — وهذا مفيد حين يتطلب نظام حماية البيانات الشخصية أن تعرف أين توجد هذه البيانات.</li>
  <li>قواعد <strong>AWS Config</strong> مثل <code>s3-bucket-public-read-prohibited</code> و<code>s3-bucket-ssl-requests-only</code> تبلّغ عن أي حاوية تحيد عن الأساس الذي حددته.</li>
</ul>

<h2>من أين تبدأ</h2>
<p>إن لم تفعل هذا الأسبوع إلا أمرين، ففعّل حجب الوصول العام على مستوى الحساب وشغّل IAM Access Analyzer. معًا يغلقان أكثر أسباب الانكشاف شيوعًا ويُظهران لك كل ما هو مشارك اليوم. ويمكن أن يتبع الباقي كمشروع قصير — وهو تحديدًا نوع الأدلة التي يطلبها المدققون وفق ضوابط الأمن السيبراني للحوسبة السحابية.</p>`,
    },
  },
  {
    slug: 'insights-cloud-migration-checklist',
    category: { en: 'Cloud migration', ar: 'الترحيل إلى السحابة' },
    title: { en: 'A step-by-step cloud migration checklist', ar: 'قائمة تحقق خطوة بخطوة للترحيل إلى السحابة' },
    summary: {
      en: 'Eight stages from “why are we moving?” to switching off the old servers — the checklist we use to keep migrations predictable.',
      ar: 'ثماني مراحل من «لماذا ننتقل؟» حتى إيقاف الخوادم القديمة — قائمة التحقق التي نستخدمها لتبقى عمليات الترحيل متوقعة.',
    },
    readTime: { en: '8 min read', ar: 'قراءة 8 دقائق' },
    related: ['cloud-mig', 'service-connectivity-solutions'],
    takeaways: {
      en: ['Write down why you’re moving and how you’ll measure it.', 'Map dependencies before choosing a strategy for each application.', 'Decide where data may live before you design anything.', 'Build the landing zone before the first workload moves.', 'Move in waves, starting with low-risk applications.', 'Every cut-over needs a go/no-go check and a tested rollback.', 'Switch off what you’ve replaced, then right-size.'],
      ar: ['دوّن سبب الانتقال وطريقة قياس نجاحه.', 'ارسم الاعتماديات قبل اختيار نهج لكل تطبيق.', 'حدّد أين يجوز أن تبقى البيانات قبل أي تصميم.', 'ابنِ البيئة الأساسية قبل نقل أول تطبيق.', 'انتقل على دفعات، بدءًا بالتطبيقات الأقل خطورة.', 'كل تحويل يحتاج إلى قرار مضيّ أو توقف وخطة تراجع مُختبرة.', 'أوقف ما استبدلته، ثم اضبط الأحجام.'],
    },
    body: {
      en: `
<p>Most migrations that go wrong don’t fail on the technology. They fail because nobody agreed why the move was happening, a dependency was discovered on cut-over night, or the old servers kept running — and costing money — long after the new ones went live. This is the checklist we work through, in order.</p>

<h2>1. Agree why you’re moving</h2>
<ul>
  <li>Write down the reasons: hardware reaching end of life, a data center contract ending, resilience, speed of delivery, cost.</li>
  <li>Turn each into something you can measure — monthly run cost, recovery time, release frequency — and record today’s number.</li>
  <li>Name an executive owner who can make decisions when trade-offs appear.</li>
</ul>

<h2>2. Build an inventory with dependencies</h2>
<ul>
  <li>List every application, server, database, file share and scheduled job, with an owner for each.</li>
  <li>Map what talks to what. Network flow data and discovery tools help, but interview application owners too — they know about the monthly batch job that no tool will find.</li>
  <li>Note licensing: some software licenses can’t move to the cloud as-is, or cost more there.</li>
</ul>

<h2>3. Classify data and decide where it may live</h2>
<p>Before designing anything, decide which data is personal, sensitive or regulated, and where it is allowed to be stored. In Saudi Arabia that means checking the PDPL for personal data, the NCA’s Cloud Cybersecurity Controls, and your sector regulator’s rules — SAMA’s, for example. AWS has announced its first Region in the Kingdom for launch by December 2026; if you plan to use it, confirm that the services you need are available there.</p>

<h2>4. Choose a strategy for each application</h2>
<p>AWS describes seven options, often called the 7 Rs. Decide one per application and write down why:</p>
<ul>
  <li><strong>Retire</strong> — switch it off; nobody needs it.</li>
  <li><strong>Retain</strong> — keep it where it is, for now or for good.</li>
  <li><strong>Rehost</strong> — move the server as it is (“lift and shift”).</li>
  <li><strong>Relocate</strong> — move a whole platform, such as VMware workloads, without changing it.</li>
  <li><strong>Repurchase</strong> — replace it with a SaaS product.</li>
  <li><strong>Replatform</strong> — small changes for a better fit, such as moving a database to Amazon RDS.</li>
  <li><strong>Refactor</strong> — redesign it to use cloud services fully.</li>
</ul>
<p>Rehosting first and improving later is often the fastest way out of a data center. Refactoring pays off for the applications that change often or need to scale.</p>

<h2>5. Build the landing zone first</h2>
<p>The landing zone is the foundation every workload lands on. Have it in place before anything moves:</p>
<ul>
  <li>Separate AWS accounts for production, non-production, security and shared services, managed with AWS Organizations or AWS Control Tower.</li>
  <li>Single sign-on through IAM Identity Center, connected to your directory.</li>
  <li>Central, tamper-resistant logging with an organization-wide CloudTrail trail.</li>
  <li>An IP addressing plan that doesn’t overlap your offices, plus the VPN or Direct Connect link back to them.</li>
  <li>Guardrails such as service control policies, and GuardDuty and Security Hub switched on everywhere.</li>
  <li>Backups and budgets configured from day one.</li>
</ul>

<h2>6. Plan waves and rehearse</h2>
<ul>
  <li>Group applications that depend on each other into the same wave. Start with something low-risk to prove the process.</li>
  <li>Use AWS Application Migration Service for servers, AWS Database Migration Service for databases and AWS DataSync for file data, so data replicates ahead of time.</li>
  <li>Test each application in AWS before cut-over: functions, integrations, performance and security.</li>
  <li>Agree a change freeze for the systems in the wave.</li>
</ul>

<h2>7. Cut over with a way back</h2>
<ul>
  <li>Lower DNS time-to-live values a few days before, so the switch takes effect quickly.</li>
  <li>Run a final sync, switch traffic, and smoke-test the critical paths.</li>
  <li>Hold a go/no-go check against criteria agreed in advance — and a rollback plan you have actually tested.</li>
  <li>Keep the old system available, read-only, until the agreed rollback window has passed.</li>
</ul>

<h2>8. Finish the job</h2>
<ul>
  <li>Decommission the old servers and cancel their licenses and support contracts. This is where much of the expected saving comes from.</li>
  <li>Right-size instances once you have a few weeks of real usage, then consider Savings Plans for the steady part.</li>
  <li>Set AWS Budgets alerts, update runbooks and disaster-recovery plans, and compare your measures with step 1.</li>
</ul>

<p>A migration run this way is rarely exciting — which is the point. Each stage produces something you can review before the next one starts, so surprises show up on paper rather than in production.</p>`,
      ar: `
<p>معظم عمليات الترحيل التي تتعثر لا تتعثر بسبب التقنية، بل لأن أحدًا لم يتفق على سبب الانتقال، أو لأن اعتمادية اكتُشفت ليلة التحويل، أو لأن الخوادم القديمة بقيت تعمل — وتكلّف — طويلًا بعد تشغيل الجديدة. هذه قائمة التحقق التي نعمل عليها بالترتيب.</p>

<h2>1. اتفقوا على سبب الانتقال</h2>
<ul>
  <li>دوّنوا الأسباب: أجهزة تقترب من نهاية عمرها، أو عقد مركز بيانات ينتهي، أو الاعتمادية، أو سرعة التسليم، أو التكلفة.</li>
  <li>حوّلوا كل سبب إلى شيء قابل للقياس — تكلفة التشغيل الشهرية، أو زمن الاستعادة، أو عدد الإصدارات — وسجّلوا قيمته اليوم.</li>
  <li>عيّنوا مسؤولًا تنفيذيًا يستطيع اتخاذ القرار حين تظهر المفاضلات.</li>
</ul>

<h2>2. اجردوا الأنظمة مع اعتمادياتها</h2>
<ul>
  <li>اذكروا كل تطبيق وخادم وقاعدة بيانات ومجلد مشترك ومهمة مجدولة، مع مالك لكل منها.</li>
  <li>ارسموا ما يتصل بماذا. بيانات حركة الشبكة وأدوات الاكتشاف تساعد، لكن قابلوا مالكي التطبيقات أيضًا — فهم يعرفون المهمة الشهرية التي لن تجدها أي أداة.</li>
  <li>انتبهوا للتراخيص: بعض التراخيص لا تنتقل إلى السحابة كما هي، أو تكلّف فيها أكثر.</li>
</ul>

<h2>3. صنّفوا البيانات وحدّدوا أين يجوز أن تبقى</h2>
<p>قبل أي تصميم، حدّدوا البيانات الشخصية أو الحساسة أو الخاضعة للتنظيم، وأين يُسمح بتخزينها. في المملكة يعني ذلك مراجعة نظام حماية البيانات الشخصية، وضوابط الأمن السيبراني للحوسبة السحابية من الهيئة الوطنية للأمن السيبراني، وأنظمة الجهة المنظمة لقطاعكم — كالبنك المركزي السعودي مثلًا. وقد أعلنت AWS إطلاق أول منطقة لها في المملكة بحلول ديسمبر 2026؛ فإن كنتم تخططون لاستخدامها، فتأكدوا من توفر الخدمات التي تحتاجونها فيها.</p>

<h2>4. اختاروا نهجًا لكل تطبيق</h2>
<p>تصف AWS سبعة خيارات تُعرف غالبًا بـ «7 Rs». اختاروا خيارًا واحدًا لكل تطبيق ودوّنوا السبب:</p>
<ul>
  <li><strong>الإيقاف (Retire)</strong> — أوقفوه؛ لا أحد يحتاجه.</li>
  <li><strong>الإبقاء (Retain)</strong> — أبقوه مكانه، مؤقتًا أو نهائيًا.</li>
  <li><strong>النقل كما هو (Rehost)</strong> — انقلوا الخادم دون تغيير.</li>
  <li><strong>نقل المنصة (Relocate)</strong> — انقلوا منصة كاملة، مثل أحمال VMware، دون تعديلها.</li>
  <li><strong>إعادة الشراء (Repurchase)</strong> — استبدلوه بمنتج SaaS.</li>
  <li><strong>تعديل المنصة (Replatform)</strong> — تعديلات صغيرة لملاءمة أفضل، مثل نقل قاعدة البيانات إلى Amazon RDS.</li>
  <li><strong>إعادة البناء (Refactor)</strong> — أعيدوا تصميمه ليستفيد من الخدمات السحابية بالكامل.</li>
</ul>
<p>النقل كما هو أولًا ثم التحسين لاحقًا كثيرًا ما يكون أسرع طريق للخروج من مركز البيانات. أما إعادة البناء فتؤتي ثمارها في التطبيقات التي تتغير كثيرًا أو تحتاج إلى التوسع.</p>

<h2>5. ابنوا البيئة الأساسية أولًا</h2>
<p>البيئة الأساسية (Landing Zone) هي الأساس الذي يستقر عليه كل تطبيق. جهّزوها قبل نقل أي شيء:</p>
<ul>
  <li>حسابات AWS منفصلة للإنتاج وغير الإنتاج والأمن والخدمات المشتركة، تُدار عبر AWS Organizations أو AWS Control Tower.</li>
  <li>دخول موحّد عبر IAM Identity Center مرتبط بدليل المستخدمين لديكم.</li>
  <li>سجلات مركزية محمية من التلاعب عبر مسار CloudTrail على مستوى المؤسسة.</li>
  <li>خطة عناوين IP لا تتداخل مع مكاتبكم، مع رابط VPN أو Direct Connect إليها.</li>
  <li>ضوابط مثل سياسات التحكم بالخدمات، وتفعيل GuardDuty وSecurity Hub في كل الحسابات.</li>
  <li>نسخ احتياطي وميزانيات مهيأة منذ اليوم الأول.</li>
</ul>

<h2>6. خطّطوا الدفعات وتدرّبوا</h2>
<ul>
  <li>اجمعوا التطبيقات المعتمدة على بعضها في الدفعة نفسها، وابدؤوا بشيء قليل الخطورة لإثبات العملية.</li>
  <li>استخدموا AWS Application Migration Service للخوادم، وAWS Database Migration Service لقواعد البيانات، وAWS DataSync للملفات، لتُنسخ البيانات مسبقًا.</li>
  <li>اختبروا كل تطبيق على AWS قبل التحويل: الوظائف والتكاملات والأداء والأمان.</li>
  <li>اتفقوا على تجميد التغييرات في أنظمة الدفعة.</li>
</ul>

<h2>7. حوّلوا مع طريق للعودة</h2>
<ul>
  <li>خفّضوا مدة صلاحية سجلات DNS ‏(TTL) قبل أيام، ليسري التحويل بسرعة.</li>
  <li>نفّذوا مزامنة نهائية، وحوّلوا الحركة، واختبروا المسارات الحرجة.</li>
  <li>اتخذوا قرار المضي أو التوقف وفق معايير متفق عليها مسبقًا — مع خطة تراجع اختبرتموها فعلًا.</li>
  <li>أبقوا النظام القديم متاحًا للقراءة فقط حتى تنقضي مدة التراجع المتفق عليها.</li>
</ul>

<h2>8. أكملوا المهمة</h2>
<ul>
  <li>أوقفوا الخوادم القديمة وألغوا تراخيصها وعقود دعمها. من هنا يأتي جزء كبير من التوفير المتوقع.</li>
  <li>اضبطوا أحجام الخوادم بعد أسابيع من الاستخدام الفعلي، ثم فكّروا في Savings Plans للجزء الثابت من الاستخدام.</li>
  <li>فعّلوا تنبيهات AWS Budgets، وحدّثوا أدلة التشغيل وخطط التعافي من الكوارث، وقارنوا النتائج بمقاييس الخطوة الأولى.</li>
</ul>

<p>الترحيل الذي يُدار بهذه الطريقة نادرًا ما يكون مثيرًا — وهذا هو المقصود. فكل مرحلة تُنتج شيئًا يمكن مراجعته قبل بدء التالية، فتظهر المفاجآت على الورق لا في بيئة الإنتاج.</p>`,
    },
  },
].map((a) => ({ date: DATE, dateLabel: DATE_LABEL, ...a }));

function articlePage(a) {
  return {
    slug: a.slug,
    nav: 'blog',
    title: a.title,
    description: a.summary,
    jsonld: (ctx) => ({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: ctx.L(a.title),
      description: ctx.L(a.summary),
      datePublished: DATE,
      inLanguage: ctx.lang,
      author: { '@type': 'Organization', name: 'CloudPros' },
      publisher: { '@type': 'Organization', name: 'CloudPros' },
      ...(SITE.url ? { mainEntityOfPage: `${SITE.url}/${ctx.lang === 'ar' ? 'ar/' : ''}${a.slug}.html` } : {}),
    }),
    render(ctx) {
      const { t, L, href, icon } = ctx;
      return `${pageHero(ctx, {
        eyebrow: L(a.category),
        title: L(a.title),
        lead: L(a.summary),
        crumbs: [[t('Insights', 'المقالات'), href('blog')], [L(a.title)]],
        meta: `<p class="byline"><span>${t('By the CloudPros team', 'بقلم فريق CloudPros')}</span><time datetime="${DATE}">${L(DATE_LABEL)}</time><span>${L(a.readTime)}</span></p>`,
      })}
<section class="section">
  <div class="container article">
    <article class="article__body">${a.body[ctx.lang].replaceAll('<pre>', '<pre tabindex="0">')}</article>
    <aside class="article__aside" aria-label="${t('Summary and related services', 'الخلاصة والخدمات ذات الصلة')}">
      <div class="takeaways">
        <h2>${t('Key takeaways', 'أهم النقاط')}</h2>
        <ul>${a.takeaways[ctx.lang].map((k) => `<li>${icon('check')}<span>${k}</span></li>`).join('')}</ul>
      </div>
      ${a.related.map((s) => serviceCard(ctx, s)).join('')}
    </aside>
  </div>
</section>
${ctaBand(ctx, { title: t('Want a second pair of eyes on yours?', 'تريد من يراجع بيئتك؟'), text: t('Tell us what you run today and an engineer will reply with where we’d start.', 'أخبرنا بما تشغّله اليوم وسيرد عليك أحد مهندسينا بنقطة البداية التي نقترحها.'), secondary: t('More articles', 'مقالات أخرى') }).replace(`href="${href('services')}"`, `href="${href('blog')}"`)}`;
    },
  };
}

export default ARTICLES.map(articlePage);
