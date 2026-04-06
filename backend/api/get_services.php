<?php
/**
 * get_services.php
 * Fetches services categorized by their parent service.
 */

require_once 'api_headers.php';
require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // 1. Fetch Main Services (Parents)
    $stmt_parents = $pdo->query("SELECT * FROM services WHERE parent_id IS NULL ORDER BY sort_order ASC, title ASC");
    $parents = $stmt_parents->fetchAll(PDO::FETCH_ASSOC);

    // 2. Fetch Sub-Services (Children)
    $stmt_children = $pdo->query("SELECT * FROM services WHERE parent_id IS NOT NULL ORDER BY parent_id, sort_order ASC, title ASC");
    $children = $stmt_children->fetchAll(PDO::FETCH_ASSOC);

    // Group children by parent_id
    $grouped_children = [];
    foreach ($children as $child) {
        $pid = $child['parent_id'];
        if (!isset($grouped_children[$pid])) {
            $grouped_children[$pid] = [];
        }
        $grouped_children[$pid][] = $child;
    }

    // Combine into a structured response
    $data = [
        'main' => $parents,
        'sub' => $grouped_children, // Indexed by parent_id
        'all_sub' => $children // Flattened list for easier access in some cases
    ];

    echo json_encode([
        'status' => 'success',
        'data' => $data
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
