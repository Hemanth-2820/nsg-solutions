<?php
/**
 * update_blog.php
 * Updates an existing blog post with optional direct image upload.
 */

require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit();
}

$data = $_POST;
if (empty($data)) {
    $data = json_decode(file_get_contents("php://input"), true);
}

if (!isset($data['id'])) {
    echo json_encode(["status" => "error", "message" => "Blog ID is required"]);
    exit();
}

// Current Image Path
$imagePath = $data['image'] ?? '/blog-assets/placeholder.png';

// Handle File Upload if present
if (isset($_FILES['imageFile']) && $_FILES['imageFile']['error'] === UPLOAD_ERR_OK) {
    // Generate a unique filename to prevent overwriting
    $ext = pathinfo($_FILES['imageFile']['name'], PATHINFO_EXTENSION);
    $filename = time() . '_' . uniqid() . '.' . $ext;
    
    // Target Directory correctly (Absolute path on server)
    $targetDir = $_SERVER['DOCUMENT_ROOT'] . '/blog-assets/';
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }
    
    $targetPath = $targetDir . $filename;
    
    if (move_uploaded_file($_FILES['imageFile']['tmp_name'], $targetPath)) {
        // Log the change or ideally delete the old image if desired
        $imagePath = '/blog-assets/' . $filename;
    }
}

try {
    $stmt = $pdo->prepare("UPDATE blogs SET title = :title, description = :description, tag = :tag, image = :image, time_to_read = :time_to_read, content = :content WHERE id = :id");
    
    $stmt->execute([
        'id' => $data['id'],
        'title' => $data['title'],
        'description' => $data['description'] ?? '',
        'tag' => $data['tag'] ?? 'Uncategorized',
        'image' => $imagePath,
        'time_to_read' => $data['time_to_read'] ?? '5 min read',
        'content' => $data['content']
    ]);

    echo json_encode(["status" => "success", "message" => "Blog post updated successfully", "image" => $imagePath]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
