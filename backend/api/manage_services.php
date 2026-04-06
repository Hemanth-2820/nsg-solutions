<?php
/**
 * manage_services.php (Updated for Maximum Robustness)
 * Admin API to Create, Update, or Delete service entries.
 * Handles diverse Hosting environments (BigRock/cPanel compatible).
 */

require_once 'api_headers.php';
require_once 'config.php';

try {
    $method = $_SERVER['REQUEST_METHOD'];
    
    // 🛡️ 1. Extract inputs (Handles both GET params, POST action, and JSON Payload)
    $action = $_REQUEST['action'] ?? null;
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    // Capture ID from any possible source (Payload, URL, or JSON)
    $id = $data['id'] ?? $_REQUEST['id'] ?? null;

    // 🗑️ 2. DELETION LOGIC (Multi-Method Support)
    if ($action === 'delete' || $method === 'DELETE' || (isset($data['action']) && $data['action'] === 'delete')) {
        if (!$id) throw new Exception("Entry ID registry reference missing.");
        
        $stmt = $pdo->prepare("DELETE FROM services WHERE id = :id OR parent_id = :parent_id");
        $stmt->execute([':id' => $id, ':parent_id' => $id]);
        
        echo json_encode(['status' => 'success', 'message' => 'Registry entry and its children purged.']);
        exit();
    }

    // 🛠️ 3. SAVE LOGIC (Insert / Update)
    if ($method === 'POST') {
        if (isset($data['id']) && !empty($data['id'])) {
            // UPDATE
            $sql = "UPDATE services SET 
                    parent_id = :parent_id, 
                    category_key = :category_key, 
                    title = :title, 
                    tag = :tag,
                    icon = :icon, 
                    description = :description,
                    image_url = :image_url,
                    sort_order = :sort_order
                    WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':id' => $data['id'],
                ':parent_id' => $data['parentId'] ?? NULL,
                ':category_key' => $data['categoryKey'] ?? '',
                ':title' => $data['title'],
                ':tag' => $data['tag'] ?? '',
                ':icon' => $data['icon'] ?? 'Briefcase',
                ':description' => $data['description'] ?? '',
                ':image_url' => $data['image_url'] ?? '',
                ':sort_order' => $data['sortOrder'] ?? 0
            ]);
            echo json_encode(['status' => 'success', 'message' => 'Registry entry synchronized.']);
        } else {
            // INSERT
            $sql = "INSERT INTO services (parent_id, category_key, title, tag, icon, description, image_url, sort_order) 
                    VALUES (:parent_id, :category_key, :title, :tag, :icon, :description, :image_url, :sort_order)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':parent_id' => $data['parentId'] ?? NULL,
                ':category_key' => $data['categoryKey'] ?? '',
                ':title' => $data['title'],
                ':tag' => $data['tag'] ?? '',
                ':icon' => $data['icon'] ?? 'Briefcase',
                ':description' => $data['description'] ?? '',
                ':image_url' => $data['image_url'] ?? '',
                ':sort_order' => $data['sortOrder'] ?? 0
            ]);
            echo json_encode(['status' => 'success', 'id' => $pdo->lastInsertId()]);
        }
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
