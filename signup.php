<?php
use moedb; 

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
    die("Database connection failed: " . $e->getMessage());
}

// --- MAIN SCRIPT LOGIC ---

// Only process POST requests.
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: signup.html");
    exit();
}

// Retrieve and trim form data.

$first_name = trim($_POST['first_name']);
$last_name = trim($_POST['last_name']);
$middle_name = trim($_POST['middle_name']) ?: null; // Set to null if empty
$username = trim($_POST['username']);
$email = trim($_POST['email']);
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

// --- VALIDATION ---
if ( empty($first_name) || empty($last_name)) || empty($middle_name) || empty($username) || empty($email) || empty($password) || {
    header("Location: signup.html?error=emptyfields");
    exit();
}

if ($password !== $confirm_password) {
    header("Location: signup.html?error=passwordmismatch");
    exit();
}

// Check if username or email already exists.
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
$stmt->execute([$username, $email]);
if ($stmt->fetch()) {
    header("Location: signup.html?error=useroremailexists");
    exit();
}

// --- USER CREATION ---

// Hash the password securely.
$password_hash = password_hash($password, PASSWORD_DEFAULT);

// Prepare the SQL INSERT statement.
// New users are created with role 'user' and approved = 0 by default.
$sql = "INSERT INTO users (username, email, password_hash, first_name, last_name, middle_name, role, approved) VALUES (?, ?, ?, ?, ?, ?, 'user', 0)";
$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([
        $username,
        $email,
        $password_hash,
        $first_name,
        $last_name,
        $middle_name
    ]);
    
    // Redirect to the sign-in page with a success message.
    header("Location: signin.html?success=registered");
    exit();
    
} catch (PDOException $e) {
    // Handle potential database errors (e.g., a race condition where a user was created between our check and insert).
    header("Location: signup.html?error=dberror");
    exit();
}
?>