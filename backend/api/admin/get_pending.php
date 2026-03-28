<?php
require_once '../config.php';

// In a real app, we would verify the admin session/token here.
// For now, let's fetch all pending testimonials.

try {
    $stmt = $pdo->query("SELECT * FROM testimonials WHERE status = 'pending' ORDER BY created_at DESC");
    $testimonials = $stmt->fetchAll();

    echo json_encode([
        "status" => "success",
        "data" => $testimonials
    ]);
} catch (\PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Fetch failed: " . $e->getMessage()]);
}
?>
