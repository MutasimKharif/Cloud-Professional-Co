<?php
/**
 * Shared setup for every PHP endpoint: configuration, database, sessions, CSRF.
 *
 * Credentials are NEVER stored in this repository. They come from environment
 * variables (Azure App Service → Configuration → Application settings) or, for
 * local development, from config.local.php (git-ignored; see config.example.php).
 */
declare(strict_types=1);

if (PHP_SAPI !== 'cli' && realpath(__FILE__) === realpath($_SERVER['SCRIPT_FILENAME'] ?? '')) {
    http_response_code(404);
    exit;
}

function config(): array
{
    static $config = null;
    if ($config !== null) {
        return $config;
    }
    $local = [];
    $localFile = dirname(__DIR__) . '/config.local.php';
    if (is_file($localFile)) {
        $local = require $localFile;
    }
    $env = static fn(string $k, ?string $d = null) => ($v = getenv($k)) !== false && $v !== '' ? $v : ($local[$k] ?? $d);
    $config = [
        'DB_HOST' => $env('DB_HOST', 'localhost'),
        'DB_PORT' => $env('DB_PORT', '3306'),
        'DB_NAME' => $env('DB_NAME', 'cloudpros'),
        'DB_USER' => $env('DB_USER'),
        'DB_PASS' => $env('DB_PASS'),
        'DB_SSL_CA' => $env('DB_SSL_CA'), // e.g. path to the Azure MySQL CA certificate
    ];
    return $config;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    $c = config();
    if (!$c['DB_USER']) {
        throw new RuntimeException('Database credentials are not configured.');
    }
    $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', $c['DB_HOST'], $c['DB_PORT'], $c['DB_NAME']);
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    if ($c['DB_SSL_CA']) {
        $options[PDO::MYSQL_ATTR_SSL_CA] = $c['DB_SSL_CA'];
    }
    $pdo = new PDO($dsn, $c['DB_USER'], $c['DB_PASS'], $options);
    return $pdo;
}

function start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    session_name('cp_session');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

function csrf_token(): string
{
    start_session();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function check_csrf(?string $token): bool
{
    start_session();
    return is_string($token) && !empty($_SESSION['csrf']) && hash_equals($_SESSION['csrf'], $token);
}

function is_admin(): bool
{
    start_session();
    return ($_SESSION['role'] ?? null) === 'admin' && !empty($_SESSION['user_id']);
}

/** Language of the page that submitted the form ("en" or "ar"). */
function req_lang(): string
{
    return ($_POST['lang'] ?? $_GET['lang'] ?? 'en') === 'ar' ? 'ar' : 'en';
}

/** Redirect back to a static page in the right language folder. */
function redirect_page(string $page, array $query = []): never
{
    $path = (req_lang() === 'ar' ? 'ar/' : '') . $page;
    if ($query) {
        $path .= '?' . http_build_query($query);
    }
    header('Location: ' . $path, true, 303);
    exit;
}

function wants_json(): bool
{
    return str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
}

function json_out(int $status, array $body): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function client_ip(): string
{
    // Azure App Service puts the client address first in X-Forwarded-For (may include a port).
    $fwd = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    $ip = $fwd !== '' ? trim(explode(',', $fwd)[0]) : ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
    return preg_replace('/:\d+$/', '', $ip) ?: '0.0.0.0';
}

function clean_text(?string $v, int $max): string
{
    $v = trim((string) $v);
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    return mb_substr($v, 0, $max);
}
