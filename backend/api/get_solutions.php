<?php
/**
 * get_solutions.php
 * Fetches all project solutions categorized by service type.
 */

require_once 'api_headers.php';
require_once 'config.php';

// Allow CORS for local development if needed
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $stmt = $pdo->query("SELECT * FROM solutions ORDER BY created_at DESC");
    $all_solutions = $stmt->fetchAll();

    $categorized = [];
    foreach ($all_solutions as $sol) {
        $cat = $sol['category'];
        if (!isset($categorized[$cat])) {
            $categorized[$cat] = [];
        }
        
        // Decode features if it's a JSON string
        $features = json_decode($sol['features'], true);
        if (!$features) $features = [];

        $categorized[$cat][] = [
            'id' => $sol['id'],
            'title' => $sol['title'],
            'shortDesc' => $sol['short_desc'], // CamelCase for React consistency
            'desc' => $sol['description'],
            'img' => $sol['image'],
            'features' => $features
        ];
    }

    echo json_encode([
        'status' => 'success',
        'data' => $categorized
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
