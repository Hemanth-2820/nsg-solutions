<?php
require_once 'api_headers.php';
require_once 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->client_id) || !isset($data->content)) {
    echo json_encode(["status" => "error", "message" => "Missing content"]);
    exit();
}

try {
    // Get client info first
    $stmt = $pdo->prepare("SELECT name, email FROM clients WHERE id = ?");
    $stmt->execute([$data->client_id]);
    $client = $stmt->fetch();

    if (!$client) {
         echo json_encode(["status" => "error", "message" => "Client not found"]);
         exit();
    }

    // Insert testimonial
    // Use the name from the client record if not provided in request
    $client_name = $client['name'];
    
    $stmt = $pdo->prepare("INSERT INTO testimonials (client_id, client_name, content, status) VALUES (?, ?, ?, 'pending')");
    $stmt->execute([
        $data->client_id,
        $client_name,
        $data->content
    ]);

    echo json_encode(["status" => "success", "message" => "Experience submitted for admin review"]);
} catch (\PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Submission failed: " . $e->getMessage()]);
}
?>
