<?php
/**
 * manage_solutions.php
 * Admin API to Create, Update, or Delete solution projects.
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
$input = file_get_contents('php://input');
$data = json_decode($input, true);

try {
    switch ($method) {
        case 'POST':
            // ADD NEW SOLUTION
            $sql = "INSERT INTO solutions (category, title, short_desc, description, image, features) 
                    VALUES (:category, :title, :short_desc, :description, :image, :features)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':category' => $data['category'],
                ':title' => $data['title'],
                ':short_desc' => $data['shortDesc'],
                ':description' => $data['desc'],
                ':image' => $data['img'],
                ':features' => json_encode($data['features'])
            ]);
            echo json_encode(['status' => 'success', 'id' => $pdo->lastInsertId()]);
            break;

        case 'PUT':
            // UPDATE EXISTING SOLUTION
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
                ':short_desc' => $data['shortDesc'],
                ':description' => $data['desc'],
                ':image' => $data['img'],
                ':features' => json_encode($data['features'])
            ]);
            echo json_encode(['status' => 'success']);
            break;

        case 'DELETE':
            // DELETE SOLUTION (expects id in query string)
            if (!isset($_GET['id'])) {
                throw new Exception("Missing ID parameter.");
            }
            $stmt = $pdo->prepare("DELETE FROM solutions WHERE id = :id");
            $stmt->execute([':id' => $_GET['id']]);
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
