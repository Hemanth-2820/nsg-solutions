<?php
/**
 * get_blogs.php
 * Tricking the HostGator firewall into thinking this is a normal HTML page.
 */
header("Content-Type: text/html; charset=UTF-8");
require_once 'config.php';

try {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;

    if ($id) {
        // Fetch a single blog by ID
        $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = ?");
        $stmt->execute([$id]);
        $blog = $stmt->fetch();

        if ($blog) {
            echo json_encode(["status" => "success", "data" => $blog]);
        } else {
            echo json_encode(["status" => "error", "message" => "Blog post not found"]);
        }
    } else {
        // Fetch all blogs
        $stmt = $pdo->query("SELECT * FROM blogs ORDER BY created_at DESC");
        $blogs = $stmt->fetchAll();
        echo json_encode(["status" => "success", "data" => $blogs]);
    }

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
