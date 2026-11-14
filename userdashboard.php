<?php
declare(strict_types=1);
require __DIR__ . '/includes/bootstrap.php';

start_session();
if (empty($_SESSION['user_id'])) {
    header('Location: signin.html', true, 303);
    exit;
}
header('Cache-Control: no-store');
$ar = ($_SESSION['lang'] ?? 'en') === 'ar';
$name = htmlspecialchars((string) $_SESSION['username'], ENT_QUOTES, 'UTF-8');
$base = '';
?><!doctype html>
<html lang="<?= $ar ? 'ar' : 'en' ?>" dir="<?= $ar ? 'rtl' : 'ltr' ?>">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title><?= $ar ? 'منطقة العملاء' : 'Client area' ?> | CloudPros</title>
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/css/site.css">
</head>
<body>
<main id="main" class="auth">
  <div class="auth__card panel stack-5">
    <p class="eyebrow"><?= $ar ? 'منطقة العملاء' : 'Client area' ?></p>
    <h1><?= $ar ? "مرحبًا، {$name}" : "Welcome, {$name}" ?></h1>
    <p class="lead"><?= $ar
        ? 'تم تفعيل حسابك. للاستفسار عن مشاريعك أو طلب دعم، تواصل مع فريقنا مباشرة.'
        : 'Your account is active. For questions about your projects or to request support, contact our team directly.' ?></p>
    <div class="btn-row">
      <a class="btn btn--primary" href="<?= $ar ? 'ar/' : '' ?>contact.html"><?= $ar ? 'تواصل مع الفريق' : 'Contact the team' ?></a>
      <a class="btn btn--secondary" href="signout.php"><?= $ar ? 'تسجيل الخروج' : 'Sign out' ?></a>
    </div>
  </div>
</main>
</body>
</html>
