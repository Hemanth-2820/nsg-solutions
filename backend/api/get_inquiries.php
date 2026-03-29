<?php
/**
 * get_inquiries.php
 * Admin API to retrieve all prospect inquiries from the database.
 */

require_once 'api_headers.php';
require_once 'config.php';

// Enable CORS for frontend Admin Portal
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $stmt = $pdo->query("SELECT * FROM inquiries ORDER BY created_at DESC");
    $all_inquiries = $stmt->fetchAll();

    echo json_encode([
        'status' => 'success',
        'data' => $all_inquiries
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
