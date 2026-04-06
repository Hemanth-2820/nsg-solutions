<?php
/**
 * manage_services.php
 * Admin API to Create, Update, or Delete service entries.
 */

require_once 'api_headers.php';
require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'POST':
            $input = file_get_contents('php://input');
            $data = json_decode($input, true);

            if (isset($data['id']) && !empty($data['id'])) {
                // UPDATE
                $sql = "UPDATE services SET 
                        parent_id = :parent_id,
                        category_key = :category_key, 
                        title = :title, 
                        icon = :icon, 
                        description = :description,
                        sort_order = :sort_order
                        WHERE id = :id";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    ':id' => $data['id'],
                    ':parent_id' => $data['parentId'] ?? NULL,
                    ':category_key' => $data['categoryKey'] ?? '',
                    ':title' => $data['title'],
                    ':icon' => $data['icon'] ?? 'Briefcase',
                    ':description' => $data['description'] ?? '',
                    ':sort_order' => $data['sortOrder'] ?? 0
                ]);
                echo json_encode(['status' => 'success', 'message' => 'Service updated']);
            } else {
                // ADD NEW
                $sql = "INSERT INTO services (parent_id, category_key, title, icon, description, sort_order) 
                        VALUES (:parent_id, :category_key, :title, :icon, :description, :sort_order)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    ':parent_id' => $data['parentId'] ?? NULL,
                    ':category_key' => $data['categoryKey'] ?? '',
                    ':title' => $data['title'],
                    ':icon' => $data['icon'] ?? 'Briefcase',
                    ':description' => $data['description'] ?? '',
                    ':sort_order' => $data['sortOrder'] ?? 0
                ]);
                echo json_encode(['status' => 'success', 'id' => $pdo->lastInsertId()]);
            }
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if (!$id) {
                $input = file_get_contents('php://input');
                $data = json_decode($input, true);
                $id = $data['id'] ?? null;
            }
            
            if (!$id) {
                throw new Exception("Missing ID parameter.");
            }
            $stmt = $pdo->prepare("DELETE FROM services WHERE id = :id OR parent_id = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(['status' => 'success', 'message' => 'Service and its children removed']);
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
