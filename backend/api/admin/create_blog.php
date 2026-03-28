<?php
/**
 * create_blog.php
 * Adds a new blog post to the database.
 */

require_once '../config.php';

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['title']) || !isset($data['content'])) {
    echo json_encode(["status" => "error", "message" => "Title and Content are required"]);
    exit();
}

try {
    $stmt = $pdo->prepare("INSERT INTO blogs (title, description, tag, image, time_to_read, content) VALUES (:title, :description, :tag, :image, :time_to_read, :content)");
    
    $stmt->execute([
        'title' => $data['title'],
        'description' => $data['description'] ?? '',
        'tag' => $data['tag'] ?? 'Uncategorized',
        'image' => $data['image'] ?? '/blog-assets/placeholder.png', // Default image or path
        'time_to_read' => $data['time_to_read'] ?? '5 min read',
        'content' => $data['content']
    ]);

    echo json_encode(["status" => "success", "message" => "Blog post created successfully"]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
