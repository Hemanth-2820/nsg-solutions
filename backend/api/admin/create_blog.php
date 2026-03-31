<?php
/**
 * create_blog.php
 * Adds a new blog post to the database with direct image upload support.
 */

require_once '../config.php';

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit();
}

// Support both JSON (if no file) and FormData (if file included)
$data = $_POST;
if (empty($data)) {
    $data = json_decode(file_get_contents("php://input"), true);
}

if (!isset($data['title']) || !isset($data['content'])) {
    echo json_encode(["status" => "error", "message" => "Title and Content are required"]);
    exit();
}

$imagePath = $data['image'] ?? '/blog-assets/placeholder.png'; // Default if no file

// Handle File Upload if present
if (isset($_FILES['imageFile']) && $_FILES['imageFile']['error'] === UPLOAD_ERR_OK) {
    // Generate a unique filename to prevent overwriting
    $ext = pathinfo($_FILES['imageFile']['name'], PATHINFO_EXTENSION);
    $filename = time() . '_' . uniqid() . '.' . $ext;
    
    // We assume the blog-assets folder is at the document root
    $targetDir = $_SERVER['DOCUMENT_ROOT'] . '/blog-assets/';
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }
    
    $targetPath = $targetDir . $filename;
    
    if (move_uploaded_file($_FILES['imageFile']['tmp_name'], $targetPath)) {
        $imagePath = '/blog-assets/' . $filename;
    }
}

try {
    $stmt = $pdo->prepare("INSERT INTO blogs (title, description, tag, image, time_to_read, content) VALUES (:title, :description, :tag, :image, :time_to_read, :content)");
    
    $stmt->execute([
        'title' => $data['title'],
        'description' => $data['description'] ?? '',
        'tag' => $data['tag'] ?? 'Uncategorized',
        'image' => $imagePath,
        'time_to_read' => $data['time_to_read'] ?? '5 min read',
        'content' => $data['content']
    ]);

    echo json_encode(["status" => "success", "message" => "Blog post created successfully", "image" => $imagePath]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
