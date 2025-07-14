<?php
// api.php - The central backend for the admin panel.

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // For development. In production, restrict this to your domain.
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// --- DATABASE CREDENTIALS ---
$servername = "localhost";
$username = "root";       // Your database username
$password = "Moe5rief$"; // Your database password
$dbname = "moedb";

// --- DATABASE CONNECTION (using PDO for security) ---
try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

// --- ROUTING (determine what action to perform) ---
$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    switch ($action) {
        case 'get_stats':
            $stats = [
                'requests' => $pdo->query("SELECT count(*) FROM users WHERE approved = 0")->fetchColumn(),
                'messages' => $pdo->query("SELECT count(*) FROM contacts")->fetchColumn(),
                'users' => $pdo->query("SELECT count(*) FROM users WHERE approved = 1 AND role = 'user'")->fetchColumn(),
                'admins' => $pdo->query("SELECT count(*) FROM users WHERE approved = 1 AND role = 'admin'")->fetchColumn(),
            ];
            echo json_encode($stats);
            break;
        case 'get_requests':
            $stmt = $pdo->query("SELECT id, username, email, CONCAT(first_name, ' ', last_name) as fullName, created_at as requestDate FROM users WHERE approved = 0 ORDER BY created_at DESC");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;
        case 'get_messages':
            $stmt = $pdo->query("SELECT id, full_name as name, email, company_name as company, submission_date as received, message FROM contacts ORDER BY submission_date DESC");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;
        case 'get_users':
            $stmt = $pdo->query("SELECT id, username, email, CONCAT(first_name, ' ', last_name) as fullName, created_at as dateJoined FROM users WHERE approved = 1 AND role = 'user' ORDER BY created_at DESC");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;
        case 'get_admins':
            $stmt = $pdo->query("SELECT id, username, email, CONCAT(first_name, ' ', last_name) as fullName, last_login as lastLogin FROM users WHERE approved = 1 AND role = 'admin' ORDER BY created_at DESC");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;
        default:
            http_response_code(400);
            echo json_encode(['error' => 'Invalid GET action']);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? null;

    switch ($action) {
        case 'approve_request':
            if (!$id) break;
            $stmt = $pdo->prepare("UPDATE users SET approved = 1 WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => "User {$id} approved."]);
            break;
        case 'deny_request':
            if (!$id) break;
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ? AND approved = 0");
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => "Request {$id} denied."]);
            break;
        case 'delete_item':
            $type = $data['type'] ?? null;
            if (!$id || !$type) break;
            
            $table = '';
            if ($type === 'messages') $table = 'contacts';
            if ($type === 'users' || $type === 'admins') $table = 'users';

            if ($table) {
                // Prevent deleting the last admin
                if ($table === 'users' && $type === 'admins') {
                    $count = $pdo->query("SELECT count(*) FROM users WHERE role = 'admin'")->fetchColumn();
                    if ($count <= 1) {
                        http_response_code(400);
                        echo json_encode(['error' => 'Cannot delete the last administrator.']);
                        exit();
                    }
                }
                $stmt = $pdo->prepare("DELETE FROM {$table} WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(['success' => true, 'message' => "Item {$id} from {$type} deleted."]);
            } else {
                 http_response_code(400);
                 echo json_encode(['error' => 'Invalid item type for deletion.']);
            }
            break;
        default:
            http_response_code(400);
            echo json_encode(['error' => 'Invalid POST action']);
    }
}
?>
