<?php
/** Newsletter sign-up from the site footer. Stores the address once (idempotent). */
declare(strict_types=1);
require __DIR__ . '/includes/bootstrap.php';

$ar = req_lang() === 'ar';
$back = static fn(string $status) => redirect_page('index.html', ['newsletter' => $status]);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    json_out(405, ['status' => 'error', 'message' => 'Invalid request method.']);
}
if (!empty($_POST['website'])) { // honeypot
    wants_json() ? json_out(200, ['status' => 'success']) : $back('ok');
}
$email = clean_text($_POST['email'] ?? '', 100);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    wants_json()
        ? json_out(422, ['status' => 'error', 'message' => $ar ? 'أدخل بريدًا إلكترونيًا صحيحًا.' : 'Enter a valid email address.'])
        : $back('invalid');
}
try {
    $stmt = db()->prepare('INSERT INTO newsletter_subscribers (email, lang, ip_address) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE email = email');
    $stmt->execute([mb_strtolower($email), req_lang(), client_ip()]);
} catch (Throwable $e) {
    error_log('[newsletter] ' . $e->getMessage());
    wants_json()
        ? json_out(500, ['status' => 'error', 'message' => $ar ? 'تعذّر إتمام اشتراكك الآن. حاول مرة أخرى بعد قليل.' : 'We couldn’t subscribe you just now. Please try again in a moment.'])
        : $back('failed');
}
wants_json() ? json_out(200, ['status' => 'success']) : $back('ok');
