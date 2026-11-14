<?php
/**
 * Create (or promote) an administrator account from the command line.
 *   php database/create-admin.php
 * Uses the same DB settings as the site (environment variables or config.local.php).
 */
declare(strict_types=1);
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}
require dirname(__DIR__) . '/includes/bootstrap.php';

function ask(string $q, bool $hidden = false): string
{
    fwrite(STDOUT, $q);
    if ($hidden && stripos(PHP_OS, 'WIN') !== 0 && stream_isatty(STDIN)) {
        system('stty -echo');
        $v = trim((string) fgets(STDIN));
        system('stty echo');
        fwrite(STDOUT, PHP_EOL);
        return $v;
    }
    return trim((string) fgets(STDIN));
}

$username = ask('Username: ');
$email = ask('Email: ');
$first = ask('First name: ');
$last = ask('Last name: ');
$password = ask('Password (min 12 characters): ', true);

if (!preg_match('/^[A-Za-z0-9._-]{3,50}$/', $username) || !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($password) < 12) {
    fwrite(STDERR, "Invalid input: check the username format, email and password length.\n");
    exit(1);
}

$stmt = db()->prepare("INSERT INTO users (username, email, password_hash, first_name, last_name, role, approved)
  VALUES (?, ?, ?, ?, ?, 'admin', 1)
  ON DUPLICATE KEY UPDATE role = 'admin', approved = 1, password_hash = VALUES(password_hash)");
$stmt->execute([$username, mb_strtolower($email), password_hash($password, PASSWORD_DEFAULT), $first ?: 'Admin', $last ?: 'User']);
fwrite(STDOUT, "Administrator '{$username}' is ready. Sign in at /signin.html\n");
