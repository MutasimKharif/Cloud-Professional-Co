<?php
/**
 * Admin JSON API used by adminpanel.php.
 * Every request requires a signed-in admin session; changes also require the CSRF token
 * in the X-CSRF-Token header.
 */
declare(strict_types=1);
require __DIR__ . '/includes/bootstrap.php';

start_session();
if (!is_admin()) {
    json_out(401, ['error' => 'Sign in as an administrator.']);
}

$method = $_SERVER['REQUEST_METHOD'];
$action = (string) ($_GET['action'] ?? '');

try {
    $pdo = db();

    if ($method === 'GET') {
        switch ($action) {
            case 'get_stats':
                json_out(200, [
                    'requests' => (int) $pdo->query('SELECT COUNT(*) FROM users WHERE approved = 0')->fetchColumn(),
                    'messages' => (int) $pdo->query('SELECT COUNT(*) FROM contacts')->fetchColumn(),
                    'users' => (int) $pdo->query("SELECT COUNT(*) FROM users WHERE approved = 1 AND role = 'user'")->fetchColumn(),
                    'admins' => (int) $pdo->query("SELECT COUNT(*) FROM users WHERE approved = 1 AND role = 'admin'")->fetchColumn(),
                    'subscribers' => (int) $pdo->query('SELECT COUNT(*) FROM newsletter_subscribers')->fetchColumn(),
                ]);
            case 'get_requests':
                json_out(200, $pdo->query("SELECT id, username, email, CONCAT(first_name, ' ', last_name) AS fullName, created_at AS date FROM users WHERE approved = 0 ORDER BY created_at DESC LIMIT 500")->fetchAll());
            case 'get_messages':
                json_out(200, $pdo->query('SELECT id, full_name AS name, email, company_name AS company, phone, message, lang, submission_date AS date FROM contacts ORDER BY submission_date DESC LIMIT 500')->fetchAll());
            case 'get_users':
                json_out(200, $pdo->query("SELECT id, username, email, CONCAT(first_name, ' ', last_name) AS fullName, created_at AS date, last_login AS lastLogin FROM users WHERE approved = 1 AND role = 'user' ORDER BY created_at DESC LIMIT 500")->fetchAll());
            case 'get_admins':
                json_out(200, $pdo->query("SELECT id, username, email, CONCAT(first_name, ' ', last_name) AS fullName, created_at AS date, last_login AS lastLogin FROM users WHERE approved = 1 AND role = 'admin' ORDER BY created_at DESC")->fetchAll());
            case 'get_subscribers':
                json_out(200, $pdo->query('SELECT id, email, lang, subscribed_at AS date FROM newsletter_subscribers ORDER BY subscribed_at DESC LIMIT 1000')->fetchAll());
            default:
                json_out(400, ['error' => 'Unknown action.']);
        }
    }

    if ($method !== 'POST') {
        header('Allow: GET, POST');
        json_out(405, ['error' => 'Method not allowed.']);
    }
    if (!check_csrf($_SERVER['HTTP_X_CSRF_TOKEN'] ?? null)) {
        json_out(403, ['error' => 'Your session expired. Reload the page and try again.']);
    }

    $data = json_decode(file_get_contents('php://input') ?: '[]', true) ?: [];
    $id = filter_var($data['id'] ?? null, FILTER_VALIDATE_INT);
    if (!$id) {
        json_out(400, ['error' => 'A valid item id is required.']);
    }

    switch ($action) {
        case 'approve_request':
            $pdo->prepare('UPDATE users SET approved = 1 WHERE id = ? AND approved = 0')->execute([$id]);
            json_out(200, ['success' => true]);
        case 'deny_request':
            $pdo->prepare('DELETE FROM users WHERE id = ? AND approved = 0')->execute([$id]);
            json_out(200, ['success' => true]);
        case 'delete_item':
            $tables = ['messages' => 'contacts', 'users' => 'users', 'admins' => 'users', 'subscribers' => 'newsletter_subscribers'];
            $type = (string) ($data['type'] ?? '');
            if (!isset($tables[$type])) {
                json_out(400, ['error' => 'Unknown item type.']);
            }
            if ($type === 'admins') {
                if ($id === (int) $_SESSION['user_id']) {
                    json_out(400, ['error' => 'You can’t delete your own account while signed in.']);
                }
                if ((int) $pdo->query("SELECT COUNT(*) FROM users WHERE role = 'admin'")->fetchColumn() <= 1) {
                    json_out(400, ['error' => 'You can’t delete the last administrator.']);
                }
            }
            $table = $tables[$type]; // whitelisted above
            $pdo->prepare("DELETE FROM {$table} WHERE id = ?")->execute([$id]);
            json_out(200, ['success' => true]);
        default:
            json_out(400, ['error' => 'Unknown action.']);
    }
} catch (Throwable $e) {
    error_log('[api] ' . $e->getMessage());
    json_out(500, ['error' => 'Server error. Check the application logs.']);
}
