<?php
/**
 * admin_manage_testimonials.php
 */
require_once 'api_headers.php';
require_once 'config.php';

$action = isset($_GET['action']) ? $_GET['action'] : 'list';

try {
    if ($action === 'list') {
        // Fetch ALL testimonials with all metadata
        $stmt = $pdo->query("SELECT * FROM testimonials ORDER BY created_at DESC");
        $data = $stmt->fetchAll();
        echo json_encode(["status" => "success", "all" => $data]);
    } 
    elseif ($action === 'status') {
        $input = json_decode(file_get_contents("php://input"));
        $id = $input->id;
        $status = $input->status; // approved, rejected, pending

        $stmt = $pdo->prepare("UPDATE testimonials SET status = ? WHERE id = ?");
        $stmt->execute([$status, $id]);
        echo json_encode(["status" => "success", "message" => "Status updated to $status"]);
    }
    elseif ($action === 'save') {
        $input = json_decode(file_get_contents("php://input"));
        $id = $input->id;
        $client_name = $input->client_name;
        $service_name = $input->service_name;
        $content = $input->content;
        $rating = $input->rating;

        $stmt = $pdo->prepare("UPDATE testimonials SET client_name = ?, service_name = ?, content = ?, feedback = ?, rating = ? WHERE id = ?");
        $stmt->execute([$client_name, $service_name, $content, $content, $rating, $id]);
        echo json_encode(["status" => "success", "message" => "Testimonial synchronized successfully."]);
    }
    elseif ($action === 'delete') {
        $input = json_decode(file_get_contents("php://input"));
        $id = $input->id;
        $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Testimonial purged from registry."]);
    }
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Registry error: " . $e->getMessage()]);
}
?>
