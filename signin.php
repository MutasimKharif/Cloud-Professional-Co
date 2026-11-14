<?php
/** Client / admin sign in. Rate-limited per IP; regenerates the session on success. */
declare(strict_types=1);
require __DIR__ . '/includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect_page('signin.html');
}

$username = clean_text($_POST['username'] ?? '', 50);
$password = (string) ($_POST['password'] ?? '');
if ($username === '' || $password === '') {
    redirect_page('signin.html', ['error' => 'emptyfields']);
}

try {
    $pdo = db();
    $ip = client_ip();

    // Lock out after 10 failed attempts from one IP in 15 minutes.
    $q = $pdo->prepare('SELECT COUNT(*) FROM login_attempts WHERE ip_address = ? AND attempted_at > (NOW() - INTERVAL 15 MINUTE)');
    $q->execute([$ip]);
    if ((int) $q->fetchColumn() >= 10) {
        redirect_page('signin.html', ['error' => 'locked']);
    }

    $stmt = $pdo->prepare('SELECT id, username, password_hash, role, approved FROM users WHERE username = ? LIMIT 1');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    // Verify against a dummy hash when the user doesn't exist, so timing doesn't reveal valid usernames.
    $hash = $user['password_hash'] ?? '$2y$10$usesomesillystringfore7hnbRJHxXVLeakoG8K30oukPsA.ztMG';
    $valid = password_verify($password, $hash) && $user;

    if (!$valid) {
        $pdo->prepare('INSERT INTO login_attempts (ip_address, username) VALUES (?, ?)')->execute([$ip, $username]);
        redirect_page('signin.html', ['error' => 'invalidcredentials']);
    }
    if ((int) $user['approved'] !== 1) {
        redirect_page('signin.html', ['error' => 'notapproved']);
    }

    if (password_needs_rehash($user['password_hash'], PASSWORD_DEFAULT)) {
        $pdo->prepare('UPDATE users SET password_hash = ? WHERE id = ?')->execute([password_hash($password, PASSWORD_DEFAULT), $user['id']]);
    }
    $pdo->prepare('DELETE FROM login_attempts WHERE ip_address = ?')->execute([$ip]);
    $pdo->prepare('UPDATE users SET last_login = NOW() WHERE id = ?')->execute([$user['id']]);

    start_session();
    session_regenerate_id(true);
    $_SESSION['user_id'] = (int) $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['lang'] = req_lang();
    unset($_SESSION['csrf']);

    header('Location: ' . ($user['role'] === 'admin' ? 'adminpanel.php' : 'userdashboard.php'), true, 303);
    exit;
} catch (Throwable $e) {
    error_log('[signin] ' . $e->getMessage());
    redirect_page('signin.html', ['error' => 'servererror']);
}
