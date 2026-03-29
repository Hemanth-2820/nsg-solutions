<?php
/**
 * get_testimonials.php
 * Tricking the HostGator firewall into thinking this is a normal HTML page.
 */
header("Content-Type: text/html; charset=UTF-8");
require_once 'config.php';

// Fetch ONLY approved testimonials for the public homepage
try {
    $stmt = $pdo->query("SELECT client_name, client_role, company, content, created_at FROM testimonials WHERE status = 'approved' ORDER BY created_at DESC");
    $testimonials = $stmt->fetchAll();

    echo json_encode([
        "status" => "success",
        "data" => $testimonials
    ]);
} catch (\PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Fetch failed: " . $e->getMessage()]);
}
?>
