<?php
/**
 * Shared setup for every PHP endpoint: configuration, database, sessions, CSRF,
 * security headers.
 *
 * Credentials are NEVER stored in this repository. They come from config.local.php
 * next to the site (git-ignored; see config.example.php) or from environment
 * variables (for example SetEnv in the Apache virtual host).
 */
declare(strict_types=1);

if (PHP_SAPI !== 'cli' && realpath(__FILE__) === realpath($_SERVER['SCRIPT_FILENAME'] ?? '')) {
    http_response_code(404);
    exit;
}

/** Signed-in sessions end after this many seconds without a request. */
const SESSION_IDLE_SECONDS = 1800;

/** One policy for every page: only this site's own files, no framing. Matches .htaccess and build/lib.mjs. */
const CONTENT_SECURITY_POLICY = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; "
    . "script-src 'self'; connect-src 'self'; font-src 'self'; form-action 'self'; base-uri 'self'; "
    . "object-src 'none'; frame-ancestors 'none'";

if (PHP_SAPI !== 'cli') {
    // Never show PHP errors to visitors (WampServer turns display_errors on by default).
    ini_set('display_errors', '0');
    ini_set('log_errors', '1');
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.gc_maxlifetime', (string) SESSION_IDLE_SECONDS);
    send_security_headers();
}

function is_https(): bool
{
    if ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (int) ($_SERVER['SERVER_PORT'] ?? 0) === 443) {
        return true;
    }
    // Behind a reverse proxy that ends HTTPS: believe its header only if the proxy is trusted.
    return from_trusted_proxy() && strtolower($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https';
}

function send_security_headers(): void
{
    if (headers_sent()) {
        return;
    }
    header_remove('X-Powered-By');
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()');
    header('Content-Security-Policy: ' . CONTENT_SECURITY_POLICY);
    if (is_https()) {
        header('Strict-Transport-Security: max-age=31536000');
    }
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
        'DB_SSL_CA' => $env('DB_SSL_CA'), // path to the MySQL server's CA certificate, if it requires TLS
        // Comma-separated IPs of reverse proxies in front of Apache. Leave empty when
        // visitors connect to Apache directly (the normal WampServer setup).
        'TRUSTED_PROXIES' => $env('TRUSTED_PROXIES', ''),
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
    session_name('cp_session');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => is_https(),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();

    // Sign out anyone who has been idle too long.
    $now = time();
    if (!empty($_SESSION['user_id']) && $now - (int) ($_SESSION['last_seen'] ?? 0) > SESSION_IDLE_SECONDS) {
        $_SESSION = [];
        session_regenerate_id(true);
    }
    $_SESSION['last_seen'] = $now;
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

/** @return string[] */
function trusted_proxies(): array
{
    return array_values(array_filter(array_map('trim', explode(',', (string) config()['TRUSTED_PROXIES']))));
}

function from_trusted_proxy(): bool
{
    return in_array($_SERVER['REMOTE_ADDR'] ?? '', trusted_proxies(), true);
}

/**
 * The visitor's IP address, used for sign-in and form rate limits.
 * X-Forwarded-For is written by the visitor's own browser unless a proxy we trust
 * added it, so it is only read when the request comes from a trusted proxy, and then
 * from the right (the entries our proxies appended), never from the left.
 */
function client_ip(): string
{
    $remote = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    if (!from_trusted_proxy()) {
        return $remote;
    }
    $hops = array_reverse(array_map('trim', explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '')));
    foreach ($hops as $hop) {
        $hop = preg_replace('/^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/', '$1', $hop) ?? ''; // drop an IPv4 port
        if (filter_var($hop, FILTER_VALIDATE_IP) === false) {
            break; // malformed or spoofed entry: stop and fall back to the proxy's own address
        }
        if (!in_array($hop, trusted_proxies(), true)) {
            return $hop;
        }
    }
    return $remote;
}

/** A form field as plain text; anything else (missing, or an array like name[]=x) becomes ''. */
function post_string(string $key): string
{
    $v = $_POST[$key] ?? '';
    return is_string($v) ? $v : '';
}

function clean_text(mixed $v, int $max): string
{
    if (!is_string($v)) {
        return '';
    }
    $v = trim($v);
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    return mb_substr($v, 0, $max);
}
