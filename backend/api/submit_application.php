<?php
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $job_id = (int)($_POST['job_id'] ?? 0);
    $portfolio_url = $_POST['portfolio_url'] ?? '';
    $message = $_POST['message'] ?? '';

    $resume_path = '';
    if (isset($_FILES['resume'])) {
        $file_name = time() . '_' . basename($_FILES['resume']['name']);
        $target_dir = __DIR__ . '/../uploads/resumes/';
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
        $target_file = $target_dir . $file_name;
        if (move_uploaded_file($_FILES['resume']['tmp_name'], $target_file)) {
            $resume_path = 'uploads/resumes/' . $file_name;
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to upload resume"]);
            exit();
        }
    }

    if ($name && $email && $resume_path && $job_id) {
        try {
            $stmt = $pdo->prepare("INSERT INTO job_applications (job_id, name, email, phone, resume_path, portfolio_url, message) VALUES (?, ?, ?, ?, ?, ?, ?)");
            if ($stmt->execute([$job_id, $name, $email, $phone, $resume_path, $portfolio_url, $message])) {
                echo json_encode(["status" => "success", "message" => "Application submitted"]);
            }
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    }
}
?>
