<?php
require_once 'config.php';

try {
    // Check if table exists and its structure
    $stmt = $pdo->query("DESCRIBE job_applications");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<h3>Table Structure: job_applications</h3><pre>";
    print_r($columns);
    echo "</pre>";

    // Check directory permissions
    $upload_dir = __DIR__ . '/../uploads/resumes/';
    echo "<h3>Upload Directory Check</h3>";
    echo "Path: " . $upload_dir . "<br>";
    if (file_exists($upload_dir)) {
        echo "Status: EXISTS<br>";
        echo "Permissions: " . substr(sprintf('%o', fileperms($upload_dir)), -4) . "<br>";
        echo "Is Writable: " . (is_writable($upload_dir) ? 'YES' : 'NO') . "<br>";
    } else {
        echo "Status: MISSING<br>";
        echo "Attempting to create...<br>";
        if (mkdir($upload_dir, 0777, true)) {
            echo "Success: Created directory.<br>";
        } else {
            echo "Error: Failed to create directory.<br>";
        }
    }

} catch (PDOException $e) {
    echo "Database Error: " . $e->getMessage();
}
?>
