<?php
require_once 'config.php';
header("Content-Type: text/html");

echo "<h2>🔧 NSG Solutions - Final Deep Clean 🧹</h2>";

try {
    // ⚔️ 1. Simple search and destroy (No complex subqueries)
    // This will delete any card with "AI" or "Multimedia" in the title
    $pdo->exec("DELETE FROM services WHERE title LIKE '%AI%' OR title LIKE '%Multimedia%' OR title = '' OR title IS NULL");
    
    echo "✅ Registry Purge Complete.<br>";

    // 🛡️ 2. Ensure columns are present
    try {
        $pdo->exec("ALTER TABLE services ADD COLUMN tag VARCHAR(50) AFTER title");
        echo "✅ Column 'tag' verified.<br>";
    } catch (PDOException $e) {}

    try {
        $pdo->exec("ALTER TABLE services ADD COLUMN image_url TEXT AFTER description");
        echo "✅ Column 'image_url' verified.<br>";
    } catch (PDOException $e) {}

    echo "<h3>🏆 REGISTRY CLEANED.</h3> Refresh your dashboard now. They will finally be gone!";

} catch (Exception $e) {
    echo "❌ ERROR: " . $e->getMessage();
}
?>
