/* CloudPros — small progressive enhancements. Everything works without JS; this adds polish. */
(function () {
  'use strict';
  var ar = document.documentElement.lang === 'ar';

  // Header border after scroll
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 4); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu
  var btn = document.querySelector('[data-menu-btn]');
  var panel = document.querySelector('[data-mobile-nav]');
  if (btn && panel) {
    var close = function (focusBtn) {
      btn.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
      document.body.style.overflow = '';
      if (focusBtn) btn.focus();
    };
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      if (open) { close(false); return; }
      btn.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
      document.body.style.overflow = 'hidden';
      var first = panel.querySelector('a');
      if (first) first.focus();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') close(true);
    });
    window.matchMedia('(min-width: 1080px)').addEventListener('change', function (m) { if (m.matches) close(false); });
  }

  // ---------- Form validation (validate on blur, clear on input) ----------
  function fieldError(input) {
    var v = input.validity;
    if (v.valid) return '';
    if (v.valueMissing) return input.getAttribute('data-msg-required') || (ar ? 'هذا الحقل مطلوب.' : 'This field is required.');
    if (v.typeMismatch || v.patternMismatch) return input.getAttribute('data-msg-type') || (ar ? 'تحقق من التنسيق.' : 'Check the format.');
    if (v.tooShort) return input.getAttribute('data-msg-short') || (ar ? 'القيمة قصيرة جدًا.' : 'This is too short.');
    return input.validationMessage;
  }
  function showError(form, input, msg) {
    var box = form.querySelector('[data-error-for="' + input.id + '"]');
    if (!box) return;
    box.querySelector('span').textContent = msg;
    box.classList.toggle('is-visible', !!msg);
    if (msg) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', box.id);
    } else {
      input.removeAttribute('aria-invalid');
    }
  }
  function validate(form) {
    var firstBad = null;
    form.querySelectorAll('input, textarea').forEach(function (input) {
      if (!input.id || input.type === 'hidden' || input.closest('.hp')) return;
      var msg = fieldError(input);
      if (input.hasAttribute('data-match')) {
        var other = form.querySelector('#' + input.getAttribute('data-match'));
        if (!msg && other && other.value !== input.value) msg = input.getAttribute('data-msg-match');
      }
      showError(form, input, msg);
      if (msg && !firstBad) firstBad = input;
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }
  document.querySelectorAll('form[novalidate]').forEach(function (form) {
    form.querySelectorAll('input, textarea').forEach(function (input) {
      if (!input.id) return;
      input.addEventListener('blur', function () {
        if (input.value === '' && !input.hasAttribute('aria-invalid')) return; // don't nag on empty first pass
        showError(form, input, fieldError(input));
      });
      input.addEventListener('input', function () {
        if (input.getAttribute('aria-invalid') === 'true' && !fieldError(input)) showError(form, input, '');
      });
    });
    form.addEventListener('submit', function (e) {
      if (!validate(form)) { e.preventDefault(); return; }
      if (!form.hasAttribute('data-async-form') || !window.fetch) return; // plain POST fallback
      e.preventDefault();
      var submit = form.querySelector('[type="submit"]');
      var ok = form.querySelector('[data-form-success]');
      var bad = form.querySelector('[data-form-failure]');
      ok && ok.classList.remove('is-visible');
      bad && bad.classList.remove('is-visible');
      submit.classList.add('is-loading');
      submit.disabled = true;
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
        .then(function (res) {
          if (res.ok && res.body.status === 'success') {
            form.reset();
            if (ok) { ok.classList.add('is-visible'); ok.focus && ok.setAttribute('tabindex', '-1'); ok.focus(); }
          } else {
            if (bad) {
              if (res.body && res.body.message) bad.querySelector('span').textContent = res.body.message;
              bad.classList.add('is-visible');
            }
          }
        })
        .catch(function () { bad && bad.classList.add('is-visible'); })
        .then(function () { submit.classList.remove('is-loading'); submit.disabled = false; });
    });
  });

  // Messages passed back by PHP redirects (?error=… / ?sent=1)
  var params = new URLSearchParams(window.location.search);
  var code = params.get('error') || params.get('status');
  if (code) {
    var box = document.querySelector('[data-status-msg="' + code + '"]');
    if (box) { box.classList.add('is-visible'); }
  }
})();
