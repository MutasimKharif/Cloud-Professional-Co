<?php
// --- FILE: process-form.php ---

// **SECURITY:** Set headers to only allow JSON responses and prevent direct access.
header('Content-Type: application/json');

// --- 1. DATABASE CONFIGURATION ---
// IMPORTANT: For production, move these credentials to a secure configuration file
// outside of the public web root.
$db_host = 'localhost';     // Or your database host
$db_user = 'Mutasim'; // Your database username
$db_pass = 'Moe5rief$'; // Your database password
$db_name = 'moedb';         // Your database name

// --- 2. ESTABLISH DATABASE CONNECTION ---
// Using mysqli for a secure connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection for errors
if ($conn->connect_error) {
    // A professional, non-revealing error message for the user
    http_response_code(500); // Internal Server Error
    echo json_encode([
        'status' => 'error',
        'message' => 'A server error occurred. Please try again later.'
    ]);
    // Log the detailed error for the admin, but don't show it to the user.
    // error_log("Database Connection Error: " . $conn->connect_error);
    exit();
}

// --- 3. VALIDATE REQUEST METHOD ---
// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit();
}

// --- 4. RETRIEVE AND SANITIZE FORM DATA ---
// Trim whitespace from all inputs and sanitize to prevent XSS attacks.
$name = trim(htmlspecialchars($_POST['name'] ?? ''));
$email = trim(htmlspecialchars($_POST['email'] ?? ''));
$company = trim(htmlspecialchars($_POST['company'] ?? ''));
$contact_number = trim(htmlspecialchars($_POST['contact_number'] ?? ''));
$message = trim(htmlspecialchars($_POST['message'] ?? ''));

// --- 5. SERVER-SIDE VALIDATION ---
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400); // Bad Request
    echo json_encode([
        'status' => 'error',
        'message' => 'Please fill in all required fields (Name, Email, Message).'
    ]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400); // Bad Request
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide a valid email address.'
    ]);
    exit();
}


// --- 6. PREPARE AND EXECUTE SQL INSERTION ---
// Using prepared statements to prevent SQL injection attacks.
$sql = "INSERT INTO contact_messages (name, email, company, contact_number, message) VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if ($stmt === false) {
    // Handle SQL preparation error
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'An internal error occurred. Please try again.'
    ]);
    // error_log("SQL Prepare Error: " . $conn->error);
    exit();
}

// Bind parameters to the SQL query
// 'sssss' denotes that all 5 parameters are strings.
$stmt->bind_param('sssss', $name, $email, $company, $contact_number, $message);

// Execute the statement and check for success
if ($stmt->execute()) {
    // Success
    http_response_code(200); // OK
    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you! Your message has been sent successfully.'
    ]);
} else {
    // Execution failed
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to send message. Please try again.'
    ]);
    // error_log("SQL Execute Error: " . $stmt->error);
}

// --- 7. CLOSE RESOURCES ---
$stmt->close();
$conn->close();

?>