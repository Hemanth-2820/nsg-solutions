<?php
require_once '../config.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data->testimonial_id || !$data->status) {
    echo json_encode(["status" => "error", "message" => "Missing data"]);
    exit();
}

$id = (int)$data->testimonial_id;
$status = ($data->status === 'approved') ? 'approved' : 'rejected';

try {
    $stmt = $pdo->prepare("UPDATE testimonials SET status = ? WHERE id = ?");
    $stmt->execute([$status, $id]);

    echo json_encode([
        "status" => "success", 
        "message" => "Testimonial successfully $status",
        "action" => $status
    ]);
} catch (\PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Update failed: " . $e->getMessage()]);
}
?>
