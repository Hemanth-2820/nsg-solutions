<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') exit;

try {
    if ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("INSERT INTO home_highlights (title, image_url, column_side, sort_order) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['title'], $data['image_url'], $data['column_side'], $data['sort_order'] ?? 0]);
        echo json_encode(['status' => 'success', 'message' => 'New highlight card added.']);
    }

    if ($method === 'PUT') {
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("UPDATE home_highlights SET title = ?, image_url = ?, column_side = ?, sort_order = ? WHERE id = ?");
        $stmt->execute([$data['title'], $data['image_url'], $data['column_side'], $data['sort_order'] ?? 0, $data['id']]);
        echo json_encode(['status' => 'success', 'message' => 'Highlight card updated.']);
    }

    if ($method === 'DELETE') {
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM home_highlights WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['status' => 'success', 'message' => 'Highlight card removed.']);
    }

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
