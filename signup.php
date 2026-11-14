<?php
/** Client account request. New accounts are created unapproved; an admin approves them in the admin panel. */
declare(strict_types=1);
require __DIR__ . '/includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect_page('signup.html');
}

$first = clean_text($_POST['first_name'] ?? '', 50);
$middle = clean_text($_POST['middle_name'] ?? '', 50);
$last = clean_text($_POST['last_name'] ?? '', 50);
$username = clean_text($_POST['username'] ?? '', 50);
$email = mb_strtolower(clean_text($_POST['email'] ?? '', 100));
$password = (string) ($_POST['password'] ?? '');
$confirm = (string) ($_POST['confirm_password'] ?? '');

if ($first === '' || $last === '' || $username === '' || $email === '' || $password === '' || empty($_POST['privacy'])) {
    redirect_page('signup.html', ['error' => 'emptyfields']);
}
if (!preg_match('/^[A-Za-z0-9._-]{3,50}$/', $username)) {
    redirect_page('signup.html', ['error' => 'emptyfields']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirect_page('signup.html', ['error' => 'invalidemail']);
}
if (mb_strlen($password) < 10) {
    redirect_page('signup.html', ['error' => 'weakpassword']);
}
if (!hash_equals($password, $confirm)) {
    redirect_page('signup.html', ['error' => 'passwordmismatch']);
}

try {
    $pdo = db();
    $exists = $pdo->prepare('SELECT 1 FROM users WHERE username = ? OR email = ? LIMIT 1');
    $exists->execute([$username, $email]);
    if ($exists->fetchColumn()) {
        redirect_page('signup.html', ['error' => 'usertaken']);
    }
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash, first_name, last_name, middle_name, role, approved) VALUES (?, ?, ?, ?, ?, ?, 'user', 0)");
    $stmt->execute([$username, $email, password_hash($password, PASSWORD_DEFAULT), $first, $last, $middle ?: null]);
} catch (PDOException $e) {
    if ($e->getCode() === '23000') { // duplicate key race
        redirect_page('signup.html', ['error' => 'usertaken']);
    }
    error_log('[signup] ' . $e->getMessage());
    redirect_page('signup.html', ['error' => 'servererror']);
} catch (Throwable $e) {
    error_log('[signup] ' . $e->getMessage());
    redirect_page('signup.html', ['error' => 'servererror']);
}

redirect_page('signin.html', ['status' => 'registered']);
