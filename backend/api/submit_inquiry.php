<?php
/**
 * submit_inquiry.php
 * Receives premium project inquiry data and stores it in the database.
 */

require_once 'api_headers.php';
require_once 'config.php';

// Suppress all non-fatal warnings to ensure clean JSON output
error_reporting(0);
ob_start();

// Enable CORS for frontend submissions
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit();
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON input.']);
    exit();
}

try {
    // Basic validation
    $required = ['firstName', 'lastName', 'email', 'phone', 'projectName'];
    foreach ($required as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => "Missing required field: $field"]);
            exit();
        }
    }

    $stmt = $pdo->prepare("INSERT INTO inquiries (
        first_name, 
        last_name, 
        email, 
        phone, 
        role, 
        company, 
        website, 
        country, 
        message, 
        project_name, 
        service_category, 
        request_id
    ) VALUES (
        :firstName, 
        :lastName, 
        :email, 
        :phone, 
        :role, 
        :company, 
        :website, 
        :country, 
        :message, 
        :projectName, 
        :serviceCategory, 
        :requestId
    )");

    $stmt->execute([
        ':firstName' => $data['firstName'],
        ':lastName' => $data['lastName'],
        ':email' => $data['email'],
        ':phone' => $data['phone'],
        ':role' => isset($data['role']) ? $data['role'] : null,
        ':company' => isset($data['company']) ? $data['company'] : null,
        ':website' => isset($data['website']) ? $data['website'] : null,
        ':country' => isset($data['country']) ? $data['country'] : null,
        ':message' => isset($data['message']) ? $data['message'] : null,
        ':projectName' => $data['projectName'],
        ':serviceCategory' => isset($data['serviceCategory']) ? $data['serviceCategory'] : null,
        ':requestId' => isset($data['requestId']) ? $data['requestId'] : null
    ]);

    // Clean the output buffer to remove any warnings/notices
    ob_end_clean();
    echo json_encode(['status' => 'success', 'message' => 'Your inquiry has been successfully registered.']);

} catch (PDOException $e) {
    ob_end_clean();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database storage error: ' . $e->getMessage()]);
}
?>
