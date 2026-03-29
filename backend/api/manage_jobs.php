<?php
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    try {
        if ($action === 'add') {
            $stmt = $pdo->prepare("INSERT INTO jobs (title, location, type, stack, salary, description) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$data['title'], $data['location'], $data['type'], $data['stack'], $data['salary'], $data['description'] ?? '']);
            echo json_encode(["status" => "success", "message" => "Job added"]);
        } 
        elseif ($action === 'update') {
            $stmt = $pdo->prepare("UPDATE jobs SET title=?, location=?, type=?, stack=?, salary=?, is_active=? WHERE id=?");
            $stmt->execute([$data['title'], $data['location'], $data['type'], $data['stack'], $data['salary'], $data['is_active'] ?? 1, $data['id']]);
            echo json_encode(["status" => "success", "message" => "Job updated"]);
        }
        elseif ($action === 'delete') {
            $stmt = $pdo->prepare("DELETE FROM jobs WHERE id = ?");
            $stmt->execute([$data['id']]);
            echo json_encode(["status" => "success", "message" => "Job deleted"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}
?>
