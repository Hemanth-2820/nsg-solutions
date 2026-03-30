<?php
/**
 * setup_applications_table.php
 */
require_once 'config.php';

try {
    // Create job_applications table if it doesn't exist
    $sql = "CREATE TABLE IF NOT EXISTS `job_applications` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `job_id` int(11) DEFAULT NULL,
        `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        `resume_path` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        `portfolio_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        `message` text COLLATE utf8mb4_unicode_ci,
        `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    $pdo->exec($sql);
    echo "<h3>System Ready: job_applications table synchronized.</h3>";
    
    // Check/Create uploads directory
    $target_dir = __DIR__ . '/../uploads/resumes/';
    if (!file_exists($target_dir)) {
        if (mkdir($target_dir, 0777, true)) {
            echo "Success: Resume repository directory created.<br>";
        } else {
            echo "Error: Directory creation failed. Check parent permissions.<br>";
        }
    } else {
        echo "Success: Repository directory verified.";
    }

} catch (PDOException $e) {
    echo "Sync Failed: " . $e->getMessage();
}
?>
