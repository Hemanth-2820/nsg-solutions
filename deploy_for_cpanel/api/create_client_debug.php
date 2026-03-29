<?php
// create_client_debug.php
header("Content-Type: text/html; charset=UTF-8");
require_once 'config.php';

echo "<h1>Starting System Debug...</h1>";

try {
    // 1. Create table if not exists with correct column names
    $createTableQuery = "CREATE TABLE IF NOT EXISTS clients (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($createTableQuery);
    echo "<p style='color:green;'>✓ Table 'clients' ready.</p>";

    // 2. Create testimonials table if missing
    $createTestimonialsQuery = "CREATE TABLE IF NOT EXISTS testimonials (
        id INT PRIMARY KEY AUTO_INCREMENT,
        client_id INT NOT NULL,
        client_name VARCHAR(255),
        content TEXT NOT NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($createTestimonialsQuery);
    echo "<p style='color:green;'>✓ Table 'testimonials' ready.</p>";

    // 3. Insert/Update a TEST user
    $test_email = "hemanthsilla555@gmail.com";
    $test_pass = password_hash("nsg@123", PASSWORD_DEFAULT);
    $test_name = "Hemanth Silla";

    // Clean up old entries to avoid duplicate errors
    $pdo->prepare("DELETE FROM clients WHERE email = ?")->execute([$test_email]);

    $stmt = $pdo->prepare("INSERT INTO clients (name, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$test_name, $test_email, $test_pass]);

    echo "<p style='color:green;'>✓ <b>DEBUG SUCCESS!</b> System ready. Log in with <b>$test_email</b> / <b>nsg@123</b>.</p>";
    echo "<p><a href='/'>Go back to Home</a></p>";

} catch (PDOException $e) {
    echo "<h2 style='color:red;'>System Error</h2>";
    echo "<p><b>Details:</b> " . $e->getMessage() . "</p>";
}
?>
