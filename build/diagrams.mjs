// Original SVG schematics. Colors come from CSS classes (dg-*) so they follow light/dark themes.
const CW = 6.9; // approx. px per character at 12px
const chipW = (s) => Math.round(s.length * CW + 22);

function chips(items, x, y) {
  let cx = x;
  return items.map((s) => {
    const w = chipW(s);
    const out = `<g><rect class="dg-box-2" x="${cx}" y="${y}" width="${w}" height="26" rx="5"/><text class="dg-text" x="${cx + w / 2}" y="${y + 17}" text-anchor="middle" style="font-size:12px;font-weight:500">${s}</text></g>`;
    cx += w + 8;
    return out;
  }).join('');
}

let AR = false;
const anc = (a) => (AR ? (a === 'start' ? 'end' : a === 'end' ? 'start' : a) : a);
const svgOpen = (vb, label) => `<svg viewBox="${vb}" role="img" aria-label="${label}" direction="${AR ? 'rtl' : 'ltr'}" xmlns="http://www.w3.org/2000/svg">`;
const setLang = (t) => { AR = t('en', 'ar') === 'ar'; };

export function heroStack(t) {
  setLang(t);
  const layers = [
    { k: t('01 · AWS CLOUD', 'سحابة AWS'), c: ['VPC', 'EKS', 'RDS', 'CloudFront', 'IAM'] },
    { k: t('02 · NETWORK', 'الشبكة'), c: ['Transit Gateway', 'Direct Connect', 'Site-to-Site VPN'] },
    { k: t('03 · DATA CENTER', 'مركز البيانات'), c: ['UPS', 'CRAC / CRAH', 'FM-200', 'EMS'] },
    { k: t('04 · WORKPLACE', 'بيئة العمل'), c: ['IP CCTV', 'Teams / Zoom Rooms', t('Room booking', 'حجز القاعات')] },
  ];
  const top = 14, h = 88, gap = 22;
  let g = '';
  layers.forEach((l, i) => {
    const y = top + i * (h + gap);
    g += `<rect class="dg-box" x="64" y="${y}" width="480" height="${h}" rx="10"/>`;
    g += `<text class="dg-sub" x="84" y="${y + 28}" text-anchor="${anc('start')}">${l.k}</text>`;
    g += chips(l.c, 84, y + 44);
    g += `<circle class="dg-signal-fill" cx="30" cy="${y + h / 2}" r="6"/>`;
    g += `<line class="dg-line" x1="36" y1="${y + h / 2}" x2="64" y2="${y + h / 2}" stroke-width="1.5"/>`;
    if (i < layers.length - 1) g += `<line class="dg-line" x1="304" y1="${y + h}" x2="304" y2="${y + h + gap}" stroke-width="1.5" stroke-dasharray="3 4"/>`;
  });
  const last = top + 3 * (h + gap) + h / 2;
  return `${svgOpen('0 0 560 466', t('Diagram: the four layers CloudPros covers — AWS cloud, network, data center and workplace — connected by one team', 'رسم توضيحي: الطبقات الأربع التي تغطيها CloudPros — سحابة AWS والشبكة ومركز البيانات وبيئة العمل — يربطها فريق واحد'))}
  <line class="dg-signal" x1="30" y1="${top + h / 2}" x2="30" y2="${last}" stroke-width="2"/>
  ${g}
  <text class="dg-sub" x="64" y="${top + 4 * (h + gap) + 6}" text-anchor="${anc('start')}">${t('ONE TEAM, ONE POINT OF CONTACT', 'فريق واحد، ونقطة تواصل واحدة')}</text>
</svg>`;
}

const arrowDefs = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="dg-signal-fill"/></marker><marker id="${id}-g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" style="fill:var(--line-strong)"/></marker></defs>`;

export function connectivity(t) {
  setLang(t);
  return `${svgOpen('0 0 640 340', t('Diagram: an on-premises site connected to AWS by a Site-to-Site VPN and by AWS Direct Connect, with two VPCs joined by peering', 'رسم توضيحي: موقع محلي متصل بـ AWS عبر شبكة VPN بين المواقع وعبر AWS Direct Connect، مع شبكتي VPC مرتبطتين بالربط المباشر'))}
  ${arrowDefs('cx')}
  <rect class="dg-box" x="16" y="40" width="176" height="260" rx="10"/>
  <text class="dg-sub" x="104" y="66" text-anchor="middle">${t('ON-PREMISES', 'الموقع المحلي')}</text>
  ${[0, 1, 2].map((i) => `<rect class="dg-box-2" x="${44 + i * 42}" y="88" width="32" height="96" rx="4"/>${[0, 1, 2, 3, 4].map((j) => `<line class="dg-line" x1="${50 + i * 42}" y1="${100 + j * 17}" x2="${70 + i * 42}" y2="${100 + j * 17}" stroke-width="1.5"/>`).join('')}`).join('')}
  <text class="dg-text" x="104" y="212" text-anchor="middle">${t('Your data center', 'مركز بياناتك')}</text>
  <rect class="dg-box-2" x="44" y="232" width="120" height="44" rx="6"/>
  <text class="dg-text" x="104" y="252" text-anchor="middle" style="font-size:12px">${t('Customer', 'بوابة')}</text>
  <text class="dg-text" x="104" y="268" text-anchor="middle" style="font-size:12px">${t('gateway', 'العميل')}</text>

  <rect class="dg-box" x="432" y="20" width="192" height="300" rx="10" style="stroke-dasharray:5 4"/>
  <text class="dg-sub" x="528" y="46" text-anchor="middle">${t('AWS REGION', 'منطقة AWS')}</text>
  <rect class="dg-box-2" x="452" y="64" width="152" height="84" rx="8"/>
  <text class="dg-text" x="528" y="100" text-anchor="middle">VPC</text>
  <text class="dg-sub" x="528" y="120" text-anchor="middle">${t('PRODUCTION', 'الإنتاج')}</text>
  <rect class="dg-box-2" x="452" y="212" width="152" height="84" rx="8"/>
  <text class="dg-text" x="528" y="248" text-anchor="middle">VPC</text>
  <text class="dg-sub" x="528" y="268" text-anchor="middle">${t('SHARED SERVICES', 'الخدمات المشتركة')}</text>
  <line class="dg-line" x1="528" y1="148" x2="528" y2="212" stroke-width="1.5" marker-start="url(#cx-g)" marker-end="url(#cx-g)"/>
  <text class="dg-sub" x="540" y="184" text-anchor="${anc('start')}">${t('PEERING', 'ربط')}</text>

  <path class="dg-signal" d="M192 110 C 300 110, 330 106, 452 106" fill="none" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#cx)"/>
  <text class="dg-text" x="312" y="88" text-anchor="middle" style="font-size:12.5px">Site-to-Site VPN</text>
  <text class="dg-sub" x="312" y="130" text-anchor="middle">${t('IPSEC · OVER THE INTERNET', 'IPsec · عبر الإنترنت')}</text>

  <rect class="dg-box-2" x="270" y="232" width="84" height="40" rx="6"/>
  <text class="dg-sub" x="312" y="256" text-anchor="middle">${t('DX LOCATION', 'موقع DX')}</text>
  <line class="dg-line" x1="192" y1="254" x2="270" y2="254" stroke-width="3"/>
  <line class="dg-line" x1="354" y1="254" x2="452" y2="254" stroke-width="3" marker-end="url(#cx-g)"/>
  <text class="dg-text" x="312" y="216" text-anchor="middle" style="font-size:12.5px">AWS Direct Connect</text>
  <text class="dg-sub" x="312" y="292" text-anchor="middle">${t('PRIVATE · DEDICATED', 'خاص · مخصص')}</text>
</svg>`;
}

export function networkTopology(t) {
  setLang(t);
  const box = (x, y, w, h, title, sub, cls = 'dg-box-2') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><text class="dg-text" x="${x + w / 2}" y="${y + h / 2 - (sub ? 2 : -5)}" text-anchor="middle" style="font-size:12.5px">${title}</text>${sub ? `<text class="dg-sub" x="${x + w / 2}" y="${y + h / 2 + 15}" text-anchor="middle">${sub}</text>` : ''}`;
  return `${svgOpen('0 0 640 420', t('Diagram: users reach the application through CloudFront and Route 53; inside an AWS region a Transit Gateway connects two VPCs and the on-premises network', 'رسم توضيحي: يصل المستخدمون إلى التطبيق عبر CloudFront وRoute 53، وداخل منطقة AWS تربط Transit Gateway بين شبكتي VPC والشبكة المحلية'))}
  ${arrowDefs('nt')}
  ${box(20, 14, 150, 50, t('Users', 'المستخدمون'), t('WORLDWIDE', 'حول العالم'))}
  ${box(245, 14, 150, 50, 'Route 53', t('DNS · ROUTING', 'DNS · التوجيه'))}
  ${box(470, 14, 150, 50, 'CloudFront', t('CDN · EDGE CACHE', 'CDN · ذاكرة الحافة'))}
  <line class="dg-line" x1="170" y1="39" x2="245" y2="39" stroke-width="1.5" marker-end="url(#nt-g)"/>
  <line class="dg-line" x1="395" y1="39" x2="470" y2="39" stroke-width="1.5" marker-end="url(#nt-g)"/>
  <rect class="dg-box" x="20" y="96" width="600" height="310" rx="12" style="stroke-dasharray:5 4"/>
  <text class="dg-sub" x="40" y="122" text-anchor="${anc('start')}">${t('AWS REGION', 'منطقة AWS')}</text>
  <rect class="dg-box" x="40" y="138" width="210" height="250" rx="10"/>
  <text class="dg-sub" x="145" y="160" text-anchor="middle">VPC A · 10.0.0.0/16</text>
  ${box(56, 172, 178, 86, t('Public subnet', 'شبكة فرعية عامة'), t('LOAD BALANCER', 'موازن الأحمال'))}
  ${box(56, 274, 178, 98, t('Private subnet', 'شبكة فرعية خاصة'), t('APP · DATABASE', 'التطبيق · قاعدة البيانات'))}
  <line class="dg-line" x1="545" y1="64" x2="545" y2="80" stroke-width="1.5"/>
  <path class="dg-line" d="M545 80 H 218 V 172" fill="none" stroke-width="1.5" marker-end="url(#nt-g)"/>
  <rect x="272" y="236" width="96" height="56" rx="10" class="dg-box" style="stroke:var(--signal);stroke-width:2"/>
  <text class="dg-text" x="320" y="260" text-anchor="middle" style="font-size:12px">Transit</text>
  <text class="dg-text" x="320" y="276" text-anchor="middle" style="font-size:12px">Gateway</text>
  <rect class="dg-box" x="390" y="138" width="210" height="120" rx="10"/>
  <text class="dg-sub" x="495" y="160" text-anchor="middle">VPC B · 10.1.0.0/16</text>
  ${box(406, 172, 178, 70, t('Private subnet', 'شبكة فرعية خاصة'), t('SHARED SERVICES', 'الخدمات المشتركة'))}
  <rect class="dg-box" x="390" y="286" width="210" height="102" rx="10" style="stroke-dasharray:5 4"/>
  <text class="dg-text" x="495" y="330" text-anchor="middle" style="font-size:12.5px">${t('On-premises network', 'الشبكة المحلية')}</text>
  <text class="dg-sub" x="495" y="350" text-anchor="middle">${t('VIA DIRECT CONNECT / VPN', 'عبر DIRECT CONNECT أو VPN')}</text>
  <line class="dg-signal" x1="250" y1="264" x2="272" y2="264" stroke-width="2"/>
  <path class="dg-signal" d="M368 254 H 380 V 207 H 390" fill="none" stroke-width="2"/>
  <path class="dg-signal" d="M368 274 H 380 V 337 H 390" fill="none" stroke-width="2"/>
</svg>`;
}

export function securityLayers(t) {
  setLang(t);
  const rings = [
    { x: 16, y: 16, w: 528, h: 368, k: t('DETECT & RESPOND', 'الاكتشاف والاستجابة'), v: 'GuardDuty · Security Hub · CloudTrail' },
    { x: 56, y: 76, w: 448, h: 248, k: t('PROTECT THE EDGE', 'حماية الحافة'), v: t('AWS WAF · network segmentation', 'AWS WAF · تقسيم الشبكة') },
    { x: 96, y: 136, w: 368, h: 128, k: t('CONTROL IDENTITY', 'التحكم في الهوية'), v: t('IAM · least privilege · MFA', 'IAM · أقل الصلاحيات · المصادقة متعددة العوامل') },
  ];
  let g = '';
  rings.forEach((r, i) => {
    g += `<rect class="${i === 0 ? 'dg-box-2' : 'dg-box'}" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="${14 - i * 2}"/>`;
    g += `<text class="dg-sub" x="280" y="${r.y + 24}" text-anchor="middle">${r.k}</text>`;
    g += `<text class="dg-text" x="280" y="${r.y + 44}" text-anchor="middle" style="font-size:12px;font-weight:500">${r.v}</text>`;
  });
  return `${svgOpen('0 0 560 400', t('Diagram: defense in depth — data at the center, wrapped by identity controls, edge protection, and detection and response', 'رسم توضيحي: الدفاع متعدد الطبقات — البيانات في المركز تحيط بها ضوابط الهوية ثم حماية الحافة ثم الاكتشاف والاستجابة'))}
  ${g}
  <rect x="150" y="196" width="260" height="52" rx="8" style="fill:var(--signal-soft);stroke:var(--signal);stroke-width:1.5"/>
  <text class="dg-sub" x="280" y="216" text-anchor="middle" style="fill:var(--text)">${t('YOUR DATA', 'بياناتك')}</text>
  <text class="dg-text" x="280" y="236" text-anchor="middle" style="font-size:12px;font-weight:500">${t('Encrypted at rest and in transit', 'مشفّرة أثناء التخزين والنقل')}</text>
  <text class="dg-sub" x="280" y="358" text-anchor="middle">${t('MAPPED TO', 'مطابقة مع')}  NCA ECC · NCA CCC · SAMA CSF · PDPL · ISO 27001</text>
</svg>`;
}

export function pipeline(t) {
  setLang(t);
  const steps = [
    [t('Commit', 'الإيداع'), 'Git'],
    [t('Build', 'البناء'), 'CodeBuild · Jenkins'],
    [t('Test', 'الاختبار'), t('Automated tests', 'اختبارات آلية')],
    [t('Deploy', 'النشر'), 'CodePipeline · GitLab CI'],
    [t('Operate', 'التشغيل'), 'CloudWatch'],
  ];
  const w = 104, gap = 22, x0 = 14;
  let g = '';
  steps.forEach(([a, b], i) => {
    const x = x0 + i * (w + gap);
    const hot = i === 3;
    g += `<rect class="dg-box" x="${x}" y="40" width="${w}" height="64" rx="8"${hot ? ' style="stroke:var(--signal);stroke-width:2"' : ''}/>`;
    g += `<text class="dg-text" x="${x + w / 2}" y="70" text-anchor="middle">${a}</text>`;
    g += `<text class="dg-sub" x="${x + w / 2}" y="90" text-anchor="middle" style="font-size:9.5px">${b}</text>`;
    if (i < steps.length - 1) g += `<line class="dg-line" x1="${x + w}" y1="72" x2="${x + w + gap - 2}" y2="72" stroke-width="1.5" marker-end="url(#pl-g)"/>`;
  });
  const end = x0 + 4 * (w + gap) + w / 2;
  return `${svgOpen('0 0 640 200', t('Diagram: an automated delivery pipeline — commit, build, test, deploy and operate — with monitoring feeding back to the next change', 'رسم توضيحي: خط تسليم آلي — الإيداع ثم البناء ثم الاختبار ثم النشر ثم التشغيل — مع عودة نتائج المراقبة إلى التغيير التالي'))}
  ${arrowDefs('pl')}
  <text class="dg-sub" x="14" y="24" text-anchor="${anc('start')}">${t('EVERY CHANGE, THE SAME PATH', 'كل تغيير يسلك المسار نفسه')}</text>
  ${g}
  <path class="dg-signal" d="M${end} 104 V 150 H ${x0 + w / 2} V 108" fill="none" stroke-width="1.75" stroke-dasharray="5 4" marker-end="url(#pl)"/>
  <text class="dg-sub" x="320" y="172" text-anchor="middle">${t('FEEDBACK FROM MONITORING', 'نتائج المراقبة تعود للتطوير')}</text>
</svg>`;
}

export function meetingRoom(t) {
  setLang(t);
  const label = (x, y, tx, ty, text, anchor = 'start') => `<line class="dg-line" x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke-width="1"/><circle class="dg-signal-fill" cx="${x}" cy="${y}" r="3.5"/><text class="dg-text" x="${tx + (anchor === 'start' ? 6 : -6)}" y="${ty + 4}" text-anchor="${anc(anchor)}" style="font-size:12px;font-weight:500">${text}</text>`;
  return `${svgOpen('0 0 700 380', t('Plan view of an equipped meeting room: display wall with camera, ceiling microphones, table touch panel, speakers and a booking panel at the door', 'مخطط علوي لقاعة اجتماعات مجهزة: جدار عرض مع كاميرا وميكروفونات سقفية ولوحة تحكم على الطاولة ومكبرات صوت ولوحة حجز عند الباب'))}
  <g transform="translate(40 0)">
  <rect class="dg-box" x="150" y="40" width="300" height="300" rx="6" style="stroke-width:2"/>
  <rect x="190" y="40" width="220" height="10" rx="2" style="fill:var(--text-2)"/>
  <circle cx="300" cy="62" r="7" class="dg-box" style="stroke:var(--signal);stroke-width:2"/>
  <rect class="dg-box-2" x="230" y="120" width="140" height="170" rx="40"/>
  ${[0, 1, 2].map((i) => `<rect class="dg-box" x="206" y="${140 + i * 46}" width="18" height="26" rx="5"/><rect class="dg-box" x="376" y="${140 + i * 46}" width="18" height="26" rx="5"/>`).join('')}
  <circle cx="300" cy="170" r="16" fill="none" class="dg-line" stroke-dasharray="3 3" stroke-width="1.5"/>
  <circle cx="300" cy="240" r="16" fill="none" class="dg-line" stroke-dasharray="3 3" stroke-width="1.5"/>
  <rect x="288" y="270" width="24" height="14" rx="3" style="fill:var(--signal)"/>
  <rect class="dg-box-2" x="158" y="48" width="14" height="14" rx="2"/><rect class="dg-box-2" x="428" y="48" width="14" height="14" rx="2"/>
  <path class="dg-line" d="M450 300 A 40 40 0 0 0 410 340" fill="none" stroke-width="1.5"/>
  <rect x="458" y="300" width="10" height="22" rx="2" style="fill:var(--signal)"/>
  ${label(300, 45, 470, 22, t('4K display', 'شاشة 4K'))}
  ${label(307, 62, 470, 72, t('Speaker-tracking camera', 'كاميرا تتبع المتحدث'))}
  ${label(316, 170, 470, 140, t('Ceiling mic array', 'ميكروفونات سقفية'))}
  ${label(312, 277, 470, 252, t('One-touch control panel', 'لوحة تحكم بلمسة واحدة'))}
  ${label(463, 311, 520, 340, t('Booking panel', 'لوحة الحجز'))}
  ${label(165, 55, 130, 90, t('Ceiling speakers', 'مكبرات سقفية'), 'end')}
  ${label(230, 205, 130, 205, t('Wireless screen share', 'مشاركة الشاشة لاسلكيًا'), 'end')}
  </g>
</svg>`;
}
