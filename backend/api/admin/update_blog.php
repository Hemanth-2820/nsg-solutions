<?php
/**
 * update_blog.php
 * Updates an existing blog post.
 */

require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode(["status" => "error", "message" => "Blog ID is required"]);
    exit();
}

try {
    $stmt = $pdo->prepare("UPDATE blogs SET title = :title, description = :description, tag = :tag, image = :image, time_to_read = :time_to_read, content = :content WHERE id = :id");
    
    $stmt->execute([
        'id' => $data['id'],
        'title' => $data['title'],
        'description' => $data['description'] ?? '',
        'tag' => $data['tag'] ?? 'Uncategorized',
        'image' => $data['image'] ?? '/blog-assets/placeholder.png',
        'time_to_read' => $data['time_to_read'] ?? '5 min read',
        'content' => $data['content']
    ]);

    echo json_encode(["status" => "success", "message" => "Blog post updated successfully"]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
