<?php
/**
 * manage_solutions.php
 * Admin API to Create, Update, or Delete solution projects with file upload support.
 */

require_once 'api_headers.php';
require_once 'config.php';

// Enable CORS for frontend Admin Portal
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

// Helper to handle File Uploads
function handleFileUpload($fileKey, $existingImage = '') {
    if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
        $ext = pathinfo($_FILES[$fileKey]['name'], PATHINFO_EXTENSION);
        $filename = 'solution_' . time() . '_' . uniqid() . '.' . $ext;
        
        // Target directory: root of the site /assets/solutions/
        $targetDir = $_SERVER['DOCUMENT_ROOT'] . '/assets/solutions/';
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true);
        }
        
        $targetPath = $targetDir . $filename;
        if (move_uploaded_file($_FILES[$fileKey]['tmp_name'], $targetPath)) {
            return '/assets/solutions/' . $filename;
        }
    }
    return $existingImage;
}

try {
    switch ($method) {
        case 'POST':
            // Logic to support both JSON and FormData
            $data = $_POST;
            if (empty($data)) {
                $input = file_get_contents('php://input');
                $data = json_decode($input, true);
            }

            // Check if we are UPDATING (if id is provided in POST) 
            // OR CREATING (if no id is provided)
            // React might send id in FormData when updating
            if (isset($data['id']) && !empty($data['id'])) {
                // UPDATE
                $imagePath = handleFileUpload('imageFile', $data['img'] ?? '');
                $sql = "UPDATE solutions SET 
                        category = :category, 
                        title = :title, 
                        short_desc = :short_desc, 
                        description = :description, 
                        image = :image, 
                        features = :features 
                        WHERE id = :id";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    ':id' => $data['id'],
                    ':category' => $data['category'],
                    ':title' => $data['title'],
                    ':short_desc' => $data['shortDesc'] ?? '',
                    ':description' => $data['desc'],
                    ':image' => $imagePath,
                    ':features' => isset($data['features']) ? (is_array($data['features']) ? json_encode($data['features']) : $data['features']) : '[]'
                ]);
                echo json_encode(['status' => 'success', 'message' => 'Solution updated', 'image' => $imagePath]);
            } else {
                // ADD NEW
                $imagePath = handleFileUpload('imageFile', $data['img'] ?? '/assets/placeholder.png');
                $sql = "INSERT INTO solutions (category, title, short_desc, description, image, features) 
                        VALUES (:category, :title, :short_desc, :description, :image, :features)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    ':category' => $data['category'],
                    ':title' => $data['title'],
                    ':short_desc' => $data['shortDesc'] ?? '',
                    ':description' => $data['desc'],
                    ':image' => $imagePath,
                    ':features' => isset($data['features']) ? (is_array($data['features']) ? json_encode($data['features']) : $data['features']) : '[]'
                ]);
                echo json_encode(['status' => 'success', 'id' => $pdo->lastInsertId(), 'image' => $imagePath]);
            }
            break;

        case 'DELETE':
            // DELETE SOLUTION (expects id in query string or body)
            $id = $_GET['id'] ?? null;
            if (!$id) {
                $input = file_get_contents('php://input');
                $data = json_decode($input, true);
                $id = $data['id'] ?? null;
            }
            
            if (!$id) {
                throw new Exception("Missing ID parameter.");
            }
            $stmt = $pdo->prepare("DELETE FROM solutions WHERE id = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(['status' => 'success']);
            break;

        default:
            http_response_code(405);
            echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
            break;
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
