/* CloudPros admin panel. Talks to api.php; all values are inserted as text (no innerHTML from data). */
(function () {
  'use strict';
  var token = document.querySelector('meta[name="csrf-token"]').content;
  var panel = document.querySelector('[data-panel]');
  var errBox = document.querySelector('[data-admin-error]');
  var dialog = document.querySelector('[data-dialog]');
  var current = 'requests';

  var COLS = {
    requests: [['fullName', 'Name'], ['username', 'Username'], ['email', 'Email'], ['date', 'Requested']],
    messages: [['name', 'Name'], ['email', 'Email'], ['company', 'Company'], ['message', 'Message', 'clip'], ['date', 'Received']],
    users: [['fullName', 'Name'], ['username', 'Username'], ['email', 'Email'], ['lastLogin', 'Last sign in']],
    admins: [['fullName', 'Name'], ['username', 'Username'], ['email', 'Email'], ['lastLogin', 'Last sign in']],
    subscribers: [['email', 'Email'], ['lang', 'Language'], ['date', 'Subscribed']],
  };
  var EMPTY = {
    requests: 'No pending account requests.', messages: 'No contact messages yet.', users: 'No approved clients yet.',
    admins: 'No administrators found.', subscribers: 'No newsletter subscribers yet.',
  };

  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (text != null) n.textContent = text;
    return n;
  }
  function fmt(v) {
    if (!v) return '—';
    var d = new Date(String(v).replace(' ', 'T'));
    return isNaN(d) ? String(v) : d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  }
  function showError(msg) {
    errBox.querySelector('span').textContent = msg || '';
    errBox.classList.toggle('is-visible', !!msg);
  }
  function api(action, body) {
    var opts = body
      ? { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token }, body: JSON.stringify(body), credentials: 'same-origin' }
      : { credentials: 'same-origin' };
    return fetch('api.php?action=' + encodeURIComponent(action), opts).then(function (r) {
      if (r.status === 401) { window.location.href = 'signin.html'; throw new Error('Signed out'); }
      return r.json().then(function (j) { if (!r.ok) throw new Error(j.error || 'Request failed'); return j; });
    });
  }
  function loadStats() {
    api('get_stats').then(function (s) {
      Object.keys(s).forEach(function (k) { var n = document.querySelector('[data-stat="' + k + '"]'); if (n) n.textContent = s[k]; });
    }).catch(function (e) { showError(e.message); });
  }
  function confirmDialog(title, bodyNodes, actions) {
    dialog.querySelector('[data-dialog-title]').textContent = title;
    var body = dialog.querySelector('[data-dialog-body]'); body.textContent = '';
    bodyNodes.forEach(function (n) { body.appendChild(n); });
    var act = dialog.querySelector('[data-dialog-actions]'); act.textContent = '';
    actions.forEach(function (a) {
      var b = el('button', { class: 'btn ' + (a.kind || 'btn--secondary'), value: a.value, type: 'submit' }, a.label);
      act.appendChild(b);
    });
    dialog.returnValue = '';
    dialog.showModal();
    return new Promise(function (resolve) { dialog.addEventListener('close', function h() { dialog.removeEventListener('close', h); resolve(dialog.returnValue); }); });
  }
  function act(action, payload, msg) {
    showError('');
    return api(action, payload).then(function () { load(current); loadStats(); }).catch(function (e) { showError(msg + ' ' + e.message); });
  }
  function render(type, rows) {
    panel.textContent = '';
    if (!rows.length) { panel.appendChild(el('p', { class: 'admin-empty' }, EMPTY[type])); return; }
    var table = el('table', { class: 'admin-table' });
    var thead = el('thead'); var hr = el('tr');
    COLS[type].forEach(function (c) { hr.appendChild(el('th', { scope: 'col' }, c[1])); });
    hr.appendChild(el('th', { scope: 'col' }, '')); thead.appendChild(hr); table.appendChild(thead);
    var tb = el('tbody');
    rows.forEach(function (row) {
      var tr = el('tr');
      COLS[type].forEach(function (c) {
        var v = /date|login/i.test(c[0]) ? fmt(row[c[0]]) : (row[c[0]] || '—');
        tr.appendChild(el('td', c[2] ? { class: c[2] } : null, v));
      });
      var td = el('td'); var box = el('div', { class: 'actions' });
      if (type === 'requests') {
        var ok = el('button', { class: 'btn btn--primary btn--sm', type: 'button' }, 'Approve');
        ok.addEventListener('click', function () { act('approve_request', { id: row.id }, 'Couldn’t approve:'); });
        var no = el('button', { class: 'btn btn--danger btn--sm', type: 'button' }, 'Deny');
        no.addEventListener('click', function () {
          confirmDialog('Deny ' + row.username + '?', [el('p', null, 'The request from ' + row.email + ' will be deleted.')],
            [{ label: 'Cancel', value: 'cancel' }, { label: 'Deny request', value: 'ok', kind: 'btn--danger' }])
            .then(function (v) { if (v === 'ok') act('deny_request', { id: row.id }, 'Couldn’t deny:'); });
        });
        box.appendChild(ok); box.appendChild(no);
      } else {
        if (type === 'messages') {
          var view = el('button', { class: 'btn btn--secondary btn--sm', type: 'button' }, 'Open');
          view.addEventListener('click', function () {
            var meta = el('p', { class: 'small muted' }, [row.email, row.company, row.phone, fmt(row.date)].filter(Boolean).join(' · '));
            confirmDialog('Message from ' + row.name, [meta, el('p', { class: 'msg' }, row.message)],
              [{ label: 'Reply by email', value: 'reply', kind: 'btn--primary' }, { label: 'Close', value: 'close' }])
              .then(function (v) { if (v === 'reply') window.location.href = 'mailto:' + encodeURIComponent(row.email) + '?subject=' + encodeURIComponent('Re: your message to CloudPros'); });
          });
          box.appendChild(view);
        }
        var del = el('button', { class: 'btn btn--danger btn--sm', type: 'button' }, 'Delete');
        del.addEventListener('click', function () {
          var label = row.username || row.name || row.email;
          confirmDialog('Delete ' + label + '?', [el('p', null, 'This can’t be undone.')],
            [{ label: 'Cancel', value: 'cancel' }, { label: 'Delete', value: 'ok', kind: 'btn--danger' }])
            .then(function (v) { if (v === 'ok') act('delete_item', { id: row.id, type: type }, 'Couldn’t delete:'); });
        });
        box.appendChild(del);
      }
      td.appendChild(box); tr.appendChild(td); tb.appendChild(tr);
    });
    table.appendChild(tb); panel.appendChild(table);
  }
  function load(type) {
    current = type;
    document.querySelectorAll('[role="tab"]').forEach(function (t) { t.setAttribute('aria-selected', String(t.getAttribute('data-tab') === type)); });
    panel.textContent = '';
    panel.appendChild(el('p', { class: 'admin-empty' }, 'Loading…'));
    api('get_' + type).then(function (rows) { render(type, rows); }).catch(function (e) { panel.textContent = ''; showError(e.message); });
  }
  document.querySelectorAll('[data-tab]').forEach(function (b) { b.addEventListener('click', function () { load(b.getAttribute('data-tab')); }); });
  loadStats();
  load('requests');
})();
