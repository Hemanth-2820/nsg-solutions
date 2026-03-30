<?php
/**
 * manage_applications.php
 */
require_once 'api_headers.php';
require_once 'config.php';

$action = isset($_GET['action']) ? $_GET['action'] : 'delete';

try {
    if ($action === 'delete') {
        $input = json_decode(file_get_contents("php://input"));
        $id = $input->id;
        
        // Potential enhancement: Delete the physical PDF file as well
        $stmt = $pdo->prepare("DELETE FROM job_applications WHERE id = ?");
        $stmt->execute([$id]);
        
        echo json_encode(["status" => "success", "message" => "Candidate purged from registry."]);
    }
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Purge error: " . $e->getMessage()]);
}
?>
