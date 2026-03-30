<?php
/**
 * update_inquiries_db.php
 * DATABASE REPAIR SCRIPT: Adds missing columns to the inquiries table.
 */

require_once 'config.php';

try {
    echo "<h1>Database Intelligence Repair Module</h1>";
    echo "<p>Checking existing 'inquiries' registry structure...</p>";

    // Columns to add
    $columns = [
        'website' => "VARCHAR(255) DEFAULT NULL",
        'country' => "VARCHAR(100) DEFAULT NULL",
        'message' => "TEXT DEFAULT NULL",
        'role' => "VARCHAR(100) DEFAULT NULL",
        'company' => "VARCHAR(255) DEFAULT NULL",
        'service_category' => "VARCHAR(100) DEFAULT NULL",
        'request_id' => "VARCHAR(50) DEFAULT NULL"
    ];

    foreach ($columns as $name => $type) {
        $check = $pdo->query("SHOW COLUMNS FROM inquiries LIKE '$name'");
        if ($check->rowCount() == 0) {
            echo "<p style='color: #1baade;'>+ Adding missing column: <strong>$name</strong>...</p>";
            $pdo->exec("ALTER TABLE inquiries ADD COLUMN $name $type");
        } else {
            echo "<p style='color: #666;'>$name column already synchronized.</p>";
        }
    }

    echo "<h2 style='color: green;'>Database Repair Successful.</h2>";
    echo "<p>Your project inquiry form is now 100% compatible with the backend.</p>";

} catch (PDOException $e) {
    echo "<h2 style='color: red;'>Database Update Failed:</h2>";
    echo "<p>" . $e->getMessage() . "</p>";
}
?>
