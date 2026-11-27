<?php
declare(strict_types=1);
require __DIR__ . '/includes/bootstrap.php';

start_session();
if (!is_admin()) {
    header('Location: signin.html', true, 303);
    exit;
}
header('Cache-Control: no-store'); // security headers come from includes/bootstrap.php
$user = htmlspecialchars((string) $_SESSION['username'], ENT_QUOTES, 'UTF-8');
$token = csrf_token();
?><!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <meta name="csrf-token" content="<?= $token ?>">
  <title>Admin | CloudPros</title>
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/css/site.css">
  <link rel="stylesheet" href="assets/css/admin.css">
  <script src="assets/js/admin.js" defer></script>
</head>
<body class="admin">
<header class="site-header is-scrolled">
  <div class="container site-header__bar">
    <a class="brand" href="index.html"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M8.5 25h15.25a5.75 5.75 0 0 0 1.6-11.27A8.75 8.75 0 0 0 8.62 11.4 6.75 6.75 0 0 0 8.5 25Z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M11 19.5h10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="21" cy="19.5" r="2.6" fill="currentColor"/></svg><span>CloudPros <span class="muted" style="font-weight:500">Admin</span></span></a>
    <div class="header-actions">
      <span class="small muted">Signed in as <strong style="color:var(--text)"><?= $user ?></strong></span>
      <a class="btn btn--secondary btn--sm" href="signout.php">Sign out</a>
    </div>
  </div>
</header>
<main id="main" class="container section--tight">
  <h1 style="font-size:2rem">Dashboard</h1>
  <div class="admin-stats mt-5" data-stats>
    <button class="admin-stat" data-tab="requests" type="button"><span class="admin-stat__k">Pending requests</span><span class="admin-stat__v" data-stat="requests">–</span></button>
    <button class="admin-stat" data-tab="messages" type="button"><span class="admin-stat__k">Messages</span><span class="admin-stat__v" data-stat="messages">–</span></button>
    <button class="admin-stat" data-tab="users" type="button"><span class="admin-stat__k">Clients</span><span class="admin-stat__v" data-stat="users">–</span></button>
    <button class="admin-stat" data-tab="admins" type="button"><span class="admin-stat__k">Admins</span><span class="admin-stat__v" data-stat="admins">–</span></button>
    <button class="admin-stat" data-tab="subscribers" type="button"><span class="admin-stat__k">Subscribers</span><span class="admin-stat__v" data-stat="subscribers">–</span></button>
  </div>
  <div class="admin-tabs mt-7" role="tablist" aria-label="Data">
    <button role="tab" type="button" data-tab="requests" aria-selected="true">Requests</button>
    <button role="tab" type="button" data-tab="messages" aria-selected="false">Messages</button>
    <button role="tab" type="button" data-tab="users" aria-selected="false">Clients</button>
    <button role="tab" type="button" data-tab="admins" aria-selected="false">Admins</button>
    <button role="tab" type="button" data-tab="subscribers" aria-selected="false">Subscribers</button>
  </div>
  <div class="alert alert--error mt-4" role="alert" data-admin-error><span></span></div>
  <div class="admin-table-wrap" role="tabpanel" data-panel aria-live="polite"></div>
</main>
<dialog class="admin-dialog" data-dialog>
  <form method="dialog" class="stack-4">
    <h2 data-dialog-title style="font-size:1.375rem"></h2>
    <div data-dialog-body class="stack-3"></div>
    <div class="btn-row" data-dialog-actions></div>
  </form>
</dialog>
</body>
</html>
