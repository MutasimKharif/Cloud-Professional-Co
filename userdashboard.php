<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: signin.html");
    exit;
}
echo "<h1>Welcome, " . htmlspecialchars($_SESSION['username']) . "!</h1>";
echo "<p>Your role: " . htmlspecialchars($_SESSION['role']) . "</p>";
?>
