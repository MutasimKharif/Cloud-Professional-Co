<?php
// Start the session at the very beginning.
session_start();

// --- DATABASE CREDENTIALS ---
$servername = "localhost";
$username = "root";
$password = "Moe5rief$"; // Your database password
$dbname = "moedb";

// --- DATABASE CONNECTION (using PDO for security) ---
try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // For a real-world application, you would log this error and show a generic message.
    die("Database connection failed: " . $e->getMessage());
}

// --- MAIN SCRIPT LOGIC ---

// Only process POST requests.
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: signin.html");
    exit();
}

$form_username = trim($_POST['username']);
$form_password = $_POST['password'];

// Validate that input is not empty.
if (empty($form_username) || empty($form_password)) {
    header("Location: signin.html?error=emptyfields");
    exit();
}

// Prepare and execute the database query to prevent SQL injection.
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$form_username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// 1. Check if a user with that username exists.
// 2. Verify the submitted password against the stored hash.
if ($user && password_verify($form_password, $user['password_hash'])) {
    
    // 3. Check if the user's account has been approved by an admin.
    if ($user['approved'] == 1) {
        // SUCCESS: Credentials are valid and account is approved.
        
        // Regenerate session ID for security.
        session_regenerate_id(true);
        
        // Store user info in the session.
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];

        // Update the last_login timestamp.
        $updateStmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
        $updateStmt->execute([$user['id']]);

        // Redirect based on user role.
        if ($user['role'] === 'admin') {
            header("Location: adminpanel.html");
        } else {
            // Redirect standard users to their own dashboard.
            header("Location: userdashboard.php");
        }
        exit();
        
    } else {
        // ERROR: Credentials are correct, but the account is not yet approved.
        header("Location: signin.html?error=notapproved");
        exit();
    }
    
} else {
    // ERROR: Invalid username or password.
    header("Location: signin.html?error=invalidcredentials");
    exit();
}
?>