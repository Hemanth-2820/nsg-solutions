<?php
require_once 'api_headers.php';
require_once 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->client_id) || (!isset($data->content) && !isset($data->feedback))) {
    echo json_encode(["status" => "error", "message" => "Minimum content required."]);
    exit();
}

try {
    // Suppress warnings for clean JSON
    error_reporting(0);
    ob_start();

    // Get client info first
    $stmt = $pdo->prepare("SELECT name, email FROM clients WHERE id = ?");
    $stmt->execute([$data->client_id]);
    $client = $stmt->fetch();

    if (!$client) {
         ob_end_clean();
         echo json_encode(["status" => "error", "message" => "Identity mismatch. Please re-login."]);
         exit();
    }

    $client_name = $client['name'];
    $feedback = isset($data->feedback) ? $data->feedback : $data->content;
    $rating = isset($data->rating) ? $data->rating : 5;
    $service_name = isset($data->service_name) ? $data->service_name : 'General Project';
    
    // Insert testimonial with full metadata
    $stmt = $pdo->prepare("INSERT INTO testimonials (client_id, client_name, content, feedback, rating, service_name, status) VALUES (?, ?, ?, ?, ?, ?, 'pending')");
    $stmt->execute([
        $data->client_id,
        $client_name,
        $feedback,
        $feedback,
        $rating,
        $service_name
    ]);

    ob_end_clean();
    echo json_encode(["status" => "success", "message" => "Digital Experience archived for administrative review."]);

} catch (\PDOException $e) {
    ob_end_clean();
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Storage synchronized failed: " . $e->getMessage()]);
}
?>
