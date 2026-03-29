<?php
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

try {
    $stmt = $pdo->query("SELECT * FROM jobs WHERE is_active = 1 ORDER BY created_at DESC");
    $jobs = $stmt->fetchAll();

    foreach ($jobs as &$job) {
        $job['stack'] = array_map('trim', explode(',', $job['stack']));
    }

    echo json_encode($jobs);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
