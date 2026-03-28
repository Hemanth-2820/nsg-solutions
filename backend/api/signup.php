<?php
// signup.php
require_once 'api_headers.php';
require_once 'config.php';

// Enable error reporting to find the cause
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get the raw input data
$input = file_get_contents("php://input");
$data = json_decode($input);

// Secure checking for data properties
if (!$data || !is_object($data) || !isset($data->fullName) || !isset($data->email) || !isset($data->password)) {
    // If visited directly in browser, return an error message instead of crashing
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        echo json_encode(["status" => "error", "message" => "This endpoint only accepts POST requests with valid JSON data."]);
        exit();
    }
    echo json_encode(["status" => "error", "message" => "Missing required fields (fullName, email, password)"]);
    exit();
}

$fullName = $data->fullName;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_DEFAULT);

try {
    // Make sure 'clients' table exists if not already there
    $pdo->exec("CREATE TABLE IF NOT EXISTS clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // Check if email already exists
    $checkStmt = $pdo->prepare("SELECT id FROM clients WHERE email = ?");
    $checkStmt->execute([$email]);
    if ($checkStmt->fetch()) {
        echo json_encode(["status" => "error", "message" => "Email already registered"]);
        exit();
    }

    // Insert new user
    $stmt = $pdo->prepare("INSERT INTO clients (name, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$fullName, $email, $password]);

    echo json_encode([
        "status" => "success",
        "message" => "Account created successfully",
        "user" => [
            "id" => $pdo->lastInsertId(),
            "fullName" => $fullName,
            "email" => $email
        ]
    ]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Signup failed database error: " . $e->getMessage()]);
}
?>
