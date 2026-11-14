<?php
/**
 * Contact form handler. Accepts the form from contact.html (and ar/contact.html),
 * stores it in the `contacts` table, and answers with JSON (fetch) or a redirect (no JS).
 */
declare(strict_types=1);
require __DIR__ . '/includes/bootstrap.php';

$ar = req_lang() === 'ar';
$fail = static function (int $status, string $en, string $arMsg, string $code) use ($ar): never {
    if (wants_json()) {
        json_out($status, ['status' => 'error', 'message' => $ar ? $arMsg : $en]);
    }
    redirect_page('contact.html', ['status' => 'failed', 'reason' => $code]);
};

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    $fail(405, 'Invalid request method.', 'طريقة الطلب غير صالحة.', 'method');
}

// Honeypot: real visitors never see or fill this field.
if (!empty($_POST['website'])) {
    wants_json() ? json_out(200, ['status' => 'success']) : redirect_page('contact.html', ['status' => 'sent']);
}

$name = clean_text($_POST['name'] ?? '', 100);
$email = clean_text($_POST['email'] ?? '', 100);
$company = clean_text($_POST['company'] ?? '', 100);
$phone = clean_text($_POST['phone'] ?? '', 30);
$message = clean_text($_POST['message'] ?? '', 5000);

if ($name === '' || $email === '' || mb_strlen($message) < 10) {
    $fail(422, 'Please fill in your name, email and a short message.', 'يرجى إدخال اسمك وبريدك الإلكتروني ورسالة قصيرة.', 'fields');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $fail(422, 'Please enter a valid email address.', 'يرجى إدخال بريد إلكتروني صحيح.', 'email');
}
if ($phone !== '' && !preg_match('/^[0-9+()\s-]{7,30}$/', $phone)) {
    $fail(422, 'Please enter a valid phone number.', 'يرجى إدخال رقم هاتف صحيح.', 'phone');
}

try {
    $pdo = db();
    // Basic flood control: max 5 messages per IP per hour.
    $ip = client_ip();
    $recent = $pdo->prepare('SELECT COUNT(*) FROM contacts WHERE ip_address = ? AND submission_date > (NOW() - INTERVAL 1 HOUR)');
    $recent->execute([$ip]);
    if ((int) $recent->fetchColumn() >= 5) {
        $fail(429, 'Too many messages from your connection. Please email us instead.', 'رسائل كثيرة من اتصالك. يرجى مراسلتنا عبر البريد بدلًا من ذلك.', 'rate');
    }
    $stmt = $pdo->prepare('INSERT INTO contacts (full_name, email, company_name, phone, message, lang, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$name, $email, $company ?: null, $phone ?: null, $message, req_lang(), $ip]);
} catch (Throwable $e) {
    error_log('[contact] ' . $e->getMessage());
    $fail(500, 'Your message didn’t send. Please try again, or email info@cloudpros.com.', 'لم تُرسل رسالتك. حاول مرة أخرى أو راسلنا على info@cloudpros.com.', 'server');
}

if (wants_json()) {
    json_out(200, ['status' => 'success']);
}
redirect_page('contact.html', ['status' => 'sent']);
