<?php
include 'config.php';

try {
    // 1. Create home_highlights table (for the vertical scrolling cards)
    $pdo->exec("CREATE TABLE IF NOT EXISTS home_highlights (
        id INT AUTO_INCREMENT PRIMARY KEY,
        column_side ENUM('left', 'right') DEFAULT 'left',
        title VARCHAR(255) NOT NULL,
        image_url TEXT NOT NULL,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    // 2. Fresh Migration for Highlights
    $pdo->exec("DELETE FROM home_highlights");

    $leftItems = [
        ['IT Services', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80'],
        ['Video Production', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80'],
        ['Digital Marketing', 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&q=80'],
        ['Smart Classroom', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80']
    ];

    $rightItems = [
        ['E-Commerce', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80'],
        ['Surveillance', 'https://images.unsplash.com/photo-1557992260-ec58e38d363c?w=500&q=80'],
        ['Healthcare', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&q=80'],
        ['EduQuiz', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&q=80']
    ];

    $stmt = $pdo->prepare("INSERT INTO home_highlights (title, image_url, column_side) VALUES (?, ?, ?)");
    foreach ($leftItems as $item) $stmt->execute([$item[0], $item[1], 'left']);
    foreach ($rightItems as $item) $stmt->execute([$item[0], $item[1], 'right']);

    echo "Table 'home_highlights' created and populated successfully.<br>";

} catch (PDOException $e) {
    die("Setup failed: " . $e->getMessage());
}
?>
