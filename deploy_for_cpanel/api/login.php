<?php
require_once 'api_headers.php';
require_once 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data->email || !$data->password || !$data->role) {
    echo json_encode(["status" => "error", "message" => "Missing credentials"]);
    exit();
}

$email = $data->email;
$password = $data->password;
$role = $data->role;

// Determine table based on role
$table = ($role === 'admin') ? 'admins' : 'clients';

try {
    $stmt = $pdo->prepare("SELECT * FROM $table WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Remove password from response
        unset($user['password']);
        echo json_encode([
            "status" => "success",
            "message" => "Login successful",
            "user" => $user
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    }
} catch (\PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Query failed: " . $e->getMessage()]);
}
?>
