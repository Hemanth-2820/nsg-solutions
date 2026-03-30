<?php
/**
 * update_testimonials_db.php
 * DATABASE REPAIR SCRIPT: Adds missing columns to the testimonials table.
 */

require_once 'config.php';

try {
    echo "<h1>Testimonial Intelligence Upgrade</h1>";
    echo "<p>Synchronizing 'testimonials' registry...</p>";

    // Columns to add
    $columns = [
        'service_name' => "VARCHAR(255) DEFAULT NULL",
        'rating' => "INT DEFAULT 5",
        'status' => "ENUM('pending', 'approved', 'rejected') DEFAULT 'pending'",
        'feedback' => "TEXT DEFAULT NULL"
    ];

    foreach ($columns as $name => $type) {
        $check = $pdo->query("SHOW COLUMNS FROM testimonials LIKE '$name'");
        if ($check->rowCount() == 0) {
            echo "<p style='color: #007cc3;'>+ Adding missing column: <strong>$name</strong>...</p>";
            $pdo->exec("ALTER TABLE testimonials ADD COLUMN $name $type");
        } else {
            echo "<p style='color: #666;'>$name column already synchronized.</p>";
        }
    }

    echo "<h2 style='color: green;'>Testimonial Database Synchronized Successfully.</h2>";

} catch (PDOException $e) {
    echo "<h2 style='color: red;'>Database Update Failed:</h2>";
    echo "<p>" . $e->getMessage() . "</p>";
}
?>
