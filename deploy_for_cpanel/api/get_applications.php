<?php
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

try {
    $stmt = $pdo->query("SELECT ja.*, j.title as job_title FROM job_applications ja 
                         LEFT JOIN jobs j ON ja.job_id = j.id 
                         ORDER BY ja.created_at DESC");
    $apps = $stmt->fetchAll();
    echo json_encode($apps);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
