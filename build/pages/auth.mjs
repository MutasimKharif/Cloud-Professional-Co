import { SITE } from '../lib.mjs';

const msg = (ctx, code, kind, en, ar) => `<div class="alert alert--${kind}" role="${kind === 'error' ? 'alert' : 'status'}" data-status-msg="${code}">${ctx.icon(kind === 'error' ? 'alert' : 'checkCircle')}<span>${ctx.t(en, ar)}</span></div>`;
const err = (ctx, id) => `<p class="field__error" id="${id}-error" data-error-for="${id}">${ctx.icon('alert')}<span></span></p>`;

const signin = {
  slug: 'signin',
  noindex: true,
  title: { en: 'Client sign in', ar: 'دخول العملاء' },
  description: { en: 'Sign in to your CloudPros client account.', ar: 'سجّل الدخول إلى حساب العميل لدى CloudPros.' },
  render(ctx) {
    const { t, php, href } = ctx;
    return `<section class="auth">
  <div class="auth__card panel stack-6">
    <div class="stack-3">
      <p class="eyebrow">${t('Client area', 'منطقة العملاء')}</p>
      <h1>${t('Sign in', 'تسجيل الدخول')}</h1>
    </div>
    ${msg(ctx, 'registered', 'success', 'Account request received. You can sign in once an administrator approves it.', 'تم استلام طلب الحساب. يمكنك تسجيل الدخول بعد موافقة المسؤول عليه.')}
    ${msg(ctx, 'signedout', 'success', 'You’re signed out.', 'تم تسجيل خروجك.')}
    ${msg(ctx, 'invalidcredentials', 'error', 'That username and password don’t match. Check them and try again.', 'اسم المستخدم وكلمة المرور غير متطابقين. تحقق منهما وحاول مرة أخرى.')}
    ${msg(ctx, 'notapproved', 'error', 'Your account is waiting for approval. We’ll email you when it’s active.', 'حسابك بانتظار الموافقة. سنراسلك عند تفعيله.')}
    ${msg(ctx, 'emptyfields', 'error', 'Enter your username and password.', 'أدخل اسم المستخدم وكلمة المرور.')}
    ${msg(ctx, 'locked', 'error', 'Too many attempts. Wait 15 minutes and try again.', 'محاولات كثيرة جدًا. انتظر 15 دقيقة ثم حاول مرة أخرى.')}
    ${msg(ctx, 'servererror', 'error', 'Something went wrong on our side. Please try again shortly.', 'حدث خطأ من جهتنا. حاول مرة أخرى بعد قليل.')}
    <form class="form" action="${php('signin.php')}" method="post" novalidate>
      <input type="hidden" name="lang" value="${ctx.lang}">
      <div class="field">
        <label for="username">${t('Username', 'اسم المستخدم')}</label>
        <input class="input" id="username" name="username" type="text" required autocomplete="username" dir="ltr" data-msg-required="${t('Enter your username.', 'أدخل اسم المستخدم.')}">
        ${err(ctx, 'username')}
      </div>
      <div class="field">
        <label for="password">${t('Password', 'كلمة المرور')}</label>
        <input class="input" id="password" name="password" type="password" required autocomplete="current-password" dir="ltr" data-msg-required="${t('Enter your password.', 'أدخل كلمة المرور.')}">
        ${err(ctx, 'password')}
      </div>
      <button class="btn btn--primary btn--block" type="submit">${t('Sign in', 'تسجيل الدخول')}</button>
    </form>
    <p class="auth__alt">${t('No account yet?', 'ليس لديك حساب؟')} <a href="${href('signup')}">${t('Request access', 'اطلب الوصول')}</a></p>
  </div>
</section>`;
  },
};

const signup = {
  slug: 'signup',
  noindex: true,
  title: { en: 'Request client access', ar: 'طلب حساب عميل' },
  description: { en: 'Request a CloudPros client account.', ar: 'اطلب حساب عميل لدى CloudPros.' },
  render(ctx) {
    const { t, php, href } = ctx;
    const req = t('This field is required.', 'هذا الحقل مطلوب.');
    return `<section class="auth">
  <div class="auth__card auth__card--wide panel stack-6">
    <div class="stack-3">
      <p class="eyebrow">${t('Client area', 'منطقة العملاء')}</p>
      <h1>${t('Request access', 'اطلب الوصول')}</h1>
      <p class="muted">${t('Accounts are for existing clients and are approved by our team.', 'الحسابات مخصصة للعملاء الحاليين ويعتمدها فريقنا.')}</p>
    </div>
    ${msg(ctx, 'emptyfields', 'error', 'Fill in all the required fields.', 'املأ جميع الحقول المطلوبة.')}
    ${msg(ctx, 'passwordmismatch', 'error', 'The two passwords don’t match.', 'كلمتا المرور غير متطابقتين.')}
    ${msg(ctx, 'weakpassword', 'error', 'Use a password of at least 10 characters.', 'استخدم كلمة مرور من 10 أحرف على الأقل.')}
    ${msg(ctx, 'invalidemail', 'error', 'Enter a valid email address.', 'أدخل بريدًا إلكترونيًا صحيحًا.')}
    ${msg(ctx, 'usertaken', 'error', 'That username or email is already registered. Try signing in instead.', 'اسم المستخدم أو البريد مسجّل مسبقًا. جرّب تسجيل الدخول بدلًا من ذلك.')}
    ${msg(ctx, 'servererror', 'error', 'Something went wrong on our side. Please try again shortly.', 'حدث خطأ من جهتنا. حاول مرة أخرى بعد قليل.')}
    <form class="form" action="${php('signup.php')}" method="post" novalidate>
      <input type="hidden" name="lang" value="${ctx.lang}">
      <div class="form__row form__row--3">
        <div class="field"><label for="first_name">${t('First name', 'الاسم الأول')}</label><input class="input" id="first_name" name="first_name" required autocomplete="given-name" maxlength="50" data-msg-required="${req}">${err(ctx, 'first_name')}</div>
        <div class="field"><label for="middle_name">${t('Middle name', 'الاسم الأوسط')} <span class="optional">${t('(optional)', '(اختياري)')}</span></label><input class="input" id="middle_name" name="middle_name" autocomplete="additional-name" maxlength="50"></div>
        <div class="field"><label for="last_name">${t('Last name', 'اسم العائلة')}</label><input class="input" id="last_name" name="last_name" required autocomplete="family-name" maxlength="50" data-msg-required="${req}">${err(ctx, 'last_name')}</div>
      </div>
      <div class="form__row form__row--2">
        <div class="field"><label for="su-username">${t('Username', 'اسم المستخدم')}</label><input class="input" id="su-username" name="username" required autocomplete="username" dir="ltr" maxlength="50" pattern="[A-Za-z0-9._-]{3,50}" data-msg-required="${req}" data-msg-type="${t('3–50 characters: letters, numbers, dot, dash or underscore.', 'من 3 إلى 50 حرفًا: أحرف إنجليزية أو أرقام أو نقطة أو شرطة.')}">${err(ctx, 'su-username')}</div>
        <div class="field"><label for="su-email">${t('Work email', 'البريد الإلكتروني للعمل')}</label><input class="input" id="su-email" name="email" type="email" required autocomplete="email" dir="ltr" maxlength="100" data-msg-required="${req}" data-msg-type="${t('Enter a valid email, like name@company.com.', 'أدخل بريدًا إلكترونيًا صحيحًا، مثل name@company.com.')}">${err(ctx, 'su-email')}</div>
      </div>
      <div class="form__row form__row--2">
        <div class="field"><label for="su-password">${t('Password', 'كلمة المرور')}</label><span class="hint" id="su-password-hint">${t('At least 10 characters.', '10 أحرف على الأقل.')}</span><input class="input" id="su-password" name="password" type="password" required minlength="10" autocomplete="new-password" dir="ltr" aria-describedby="su-password-hint" data-msg-required="${req}" data-msg-short="${t('Use at least 10 characters.', 'استخدم 10 أحرف على الأقل.')}">${err(ctx, 'su-password')}</div>
        <div class="field"><label for="su-confirm">${t('Confirm password', 'تأكيد كلمة المرور')}</label><span class="hint">&nbsp;</span><input class="input" id="su-confirm" name="confirm_password" type="password" required autocomplete="new-password" dir="ltr" data-match="su-password" data-msg-required="${req}" data-msg-match="${t('The two passwords don’t match.', 'كلمتا المرور غير متطابقتين.')}">${err(ctx, 'su-confirm')}</div>
      </div>
      <div class="field">
        <label style="display:flex;gap:10px;align-items:flex-start;font-weight:400"><input id="su-privacy" name="privacy" type="checkbox" required style="width:20px;height:20px;margin-top:3px;accent-color:var(--signal)" data-msg-required="${t('Please accept the privacy policy to continue.', 'يرجى الموافقة على سياسة الخصوصية للمتابعة.')}"><span>${t('I agree to the', 'أوافق على')} <a href="${href('privacy')}">${t('privacy policy', 'سياسة الخصوصية')}</a>.</span></label>
        ${err(ctx, 'su-privacy')}
      </div>
      <button class="btn btn--primary btn--block" type="submit">${t('Request access', 'اطلب الوصول')}</button>
    </form>
    <p class="auth__alt">${t('Already have an account?', 'لديك حساب بالفعل؟')} <a href="${href('signin')}">${t('Sign in', 'تسجيل الدخول')}</a></p>
  </div>
</section>`;
  },
};

const notFound = {
  slug: '404',
  noindex: true,
  title: { en: 'Page not found', ar: 'الصفحة غير موجودة' },
  description: { en: 'The page you were looking for doesn’t exist.', ar: 'الصفحة التي تبحث عنها غير موجودة.' },
  render(ctx) {
    const { t, href } = ctx;
    return `<section class="auth"><div class="auth__card stack-5">
      <p class="eyebrow">404</p>
      <h1>${t('This page doesn’t exist', 'هذه الصفحة غير موجودة')}</h1>
      <p class="lead">${t('The link may be old or mistyped. These will get you back on track:', 'ربما يكون الرابط قديمًا أو به خطأ. هذه الروابط ستعيدك إلى المسار:')}</p>
      <div class="btn-row"><a class="btn btn--primary" href="${href('index')}">${t('Go to the homepage', 'اذهب إلى الصفحة الرئيسية')}</a><a class="btn btn--secondary" href="${href('services')}">${t('See all services', 'اعرض كل الخدمات')}</a></div>
      <p class="muted">${t('Or email', 'أو راسلنا على')} <a href="mailto:${SITE.email}">${SITE.email}</a></p>
    </div></section>`;
  },
};

export default [signin, signup, notFound];
