<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'config.php';

try {
    $stmt = $pdo->query("SELECT * FROM home_highlights ORDER BY sort_order ASC, created_at DESC");
    $highlights = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $left = [];
    $right = [];

    foreach ($highlights as $h) {
        if ($h['column_side'] === 'left') $left[] = $h;
        else $right[] = $h;
    }

    echo json_encode([
        'status' => 'success',
        'data' => [
            'left' => $left,
            'right' => $right
        ]
    ]);

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
