<?php
/**
 * manage_highlights.php
 * Admin API to Create, Update, or Delete home highlights with file upload support.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'OPTIONS') exit;

// Helper to handle File Uploads
function handleHighlightUpload($fileKey, $existingImage = '') {
    if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
        $ext = pathinfo($_FILES[$fileKey]['name'], PATHINFO_EXTENSION);
        $filename = 'highlight_' . time() . '_' . uniqid() . '.' . $ext;
        
        $targetDir = $_SERVER['DOCUMENT_ROOT'] . '/assets/highlights/';
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true);
        }
        
        $targetPath = $targetDir . $filename;
        if (move_uploaded_file($_FILES[$fileKey]['tmp_name'], $targetPath)) {
            return '/assets/highlights/' . $filename;
        }
    }
    return $existingImage;
}

try {
    if ($method === 'POST') {
        $data = $_POST;
        if (empty($data)) {
            $data = json_decode(file_get_contents("php://input"), true);
        }

        if (isset($data['id']) && !empty($data['id'])) {
            // UPDATE
            $imagePath = handleHighlightUpload('imageFile', $data['image_url'] ?? '');
            $stmt = $pdo->prepare("UPDATE home_highlights SET title = ?, image_url = ?, column_side = ?, sort_order = ? WHERE id = ?");
            $stmt->execute([$data['title'], $imagePath, $data['column_side'], $data['sort_order'] ?? 0, $data['id']]);
            echo json_encode(['status' => 'success', 'message' => 'Highlight card updated.', 'image' => $imagePath]);
        } else {
            // CREATE
            $imagePath = handleHighlightUpload('imageFile', $data['image_url'] ?? '/assets/placeholder.png');
            $stmt = $pdo->prepare("INSERT INTO home_highlights (title, image_url, column_side, sort_order) VALUES (?, ?, ?, ?)");
            $stmt->execute([$data['title'], $imagePath, $data['column_side'], $data['sort_order'] ?? 0]);
            echo json_encode(['status' => 'success', 'message' => 'New highlight card added.', 'image' => $imagePath]);
        }
    }

    if ($method === 'DELETE') {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            $data = json_decode(file_get_contents("php://input"), true);
            $id = $data['id'] ?? null;
        }
        if (!$id) throw new Exception("Missing ID.");
        $stmt = $pdo->prepare("DELETE FROM home_highlights WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['status' => 'success', 'message' => 'Highlight card removed.']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
